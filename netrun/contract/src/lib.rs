//! NETRUN — a breach-protocol hacking game on RougeChain.
//!
//! * `setup` (once, by the deployer): records the owner and creates the `IMPL` Implant collection.
//! * `jack_in` (payable, exactly [`ENTRY_FEE`] XRGE): opens a run at block H. Nothing is decided.
//! * `board` (free query): from block H+2 on, the run's board, generated from the hash of block
//!   H+1 — which did not exist when the player paid — mixed with the player and H.
//! * `breach` `{"path":[cells…]}`: the contract regenerates the same board, checks every move
//!   against the rules, and pays for what the moves actually upload: SCRAP per daemon, and an
//!   Implant NFT for all three. An illegal path reverts (the run stays open to try again).
//! * `abandon`: closes an open run (the fee is not returned).
//! * `withdraw` `{"amount":quanta}` (owner): moves collected entry fees to the owner.
//! * `info` (free query): fee, run counters, whether setup ran.
//!
//! Runs expire [`EXPIRY_BLOCKS`] after H+1; an expired run can simply be replaced by a new one.
//! Methods that take no payment revert if anything is attached, so nothing can get stuck here.

#![cfg_attr(target_arch = "wasm32", no_std)]

pub mod logic;

#[cfg(target_arch = "wasm32")]
mod chain {
    use crate::logic::{self, BUFFER, CELLS, DAEMON_REWARD, IMPLANTS, SYMBOLS};
    use core::panic::PanicInfo;

    extern "C" {
        fn host_get_caller(buf_ptr: *mut u8, buf_len: u32) -> i32;
        fn host_get_self_addr(buf_ptr: *mut u8, buf_len: u32) -> i32;
        fn host_get_args_len() -> i32;
        fn host_read_args(buf_ptr: *mut u8, buf_len: u32) -> i32;
        fn host_block_hash(height: i64, out_ptr: *mut u8) -> i32;
        fn host_get_block_height() -> i64;
        fn host_get_attached_amount() -> i64;
        fn host_get_attached_symbol(out_ptr: *mut u8, out_cap: u32) -> i32;
        fn host_sha256(data_ptr: *const u8, data_len: u32, out_ptr: *mut u8) -> i32;
        fn host_storage_read(key_ptr: *const u8, key_len: u32, val_ptr: *mut u8, val_len: u32) -> i32;
        fn host_storage_write(key_ptr: *const u8, key_len: u32, val_ptr: *const u8, val_len: u32);
        fn host_storage_delete(key_ptr: *const u8, key_len: u32);
        fn host_transfer(to_ptr: *const u8, to_len: u32, amount: i64) -> i32;
        fn host_token_transfer(sym_ptr: *const u8, sym_len: u32, to_ptr: *const u8, to_len: u32, amount: i64) -> i32;
        fn host_nft_create_collection(sym_ptr: *const u8, sym_len: u32, name_ptr: *const u8, name_len: u32,
                                      max_supply: i64, out_ptr: *mut u8, out_cap: u32) -> i32;
        fn host_nft_mint(col_ptr: *const u8, col_len: u32, to_ptr: *const u8, to_len: u32,
                         name_ptr: *const u8, name_len: u32, meta_ptr: *const u8, meta_len: u32) -> i64;
        fn host_emit_event(topic_ptr: *const u8, topic_len: u32, data_ptr: *const u8, data_len: u32);
        fn host_set_return(data_ptr: *const u8, data_len: u32);
    }

    /// Entry fee per run: 0.1 XRGE, in quanta. Must be attached exactly.
    const ENTRY_FEE: i64 = 100_000_000;
    const EXPIRY_BLOCKS: i64 = 250;
    const COLLECTION: &[u8] = b"IMPL";
    const TOKEN: &[u8] = b"SCRAP";
    const CALLER_CAP: usize = 8192;

    static mut CALLER: [u8; CALLER_CAP] = [0; CALLER_CAP];
    static mut CALLER_LOWER: [u8; CALLER_CAP] = [0; CALLER_CAP];
    static mut ARGS: [u8; 1024] = [0; 1024];
    static mut OUT: [u8; 1024] = [0; 1024];
    static mut SELF_ADDR: [u8; 64] = [0; 64];

    /// Fail the call: every effect is discarded and any attached payment stays with the player.
    fn revert() -> ! { core::arch::wasm32::unreachable() }

    #[panic_handler]
    fn panic(_: &PanicInfo) -> ! { core::arch::wasm32::unreachable() }

    fn sha(data: &[u8]) -> [u8; 32] {
        let mut out = [0u8; 32];
        unsafe { host_sha256(data.as_ptr(), data.len() as u32, out.as_mut_ptr()) };
        out
    }

    /// The caller as the host reports it (used to pay them), and sha256 of it lower-cased (used
    /// for storage keys and the board seed, so a key's letter case never changes a player's board).
    fn caller() -> (&'static [u8], [u8; 32]) {
        let n = unsafe { host_get_caller(core::ptr::addr_of_mut!(CALLER) as *mut u8, CALLER_CAP as u32) };
        if n <= 0 { revert(); }
        let n = n as usize;
        let raw = unsafe { &(&*core::ptr::addr_of!(CALLER))[..n] };
        let low = unsafe { &mut (&mut *core::ptr::addr_of_mut!(CALLER_LOWER))[..n] };
        lower_ascii(raw, low);
        (raw, sha(low))
    }

    /// ASCII lower-case, 8 bytes at a time. A post-quantum public key is ~3.9 KB of hex, and a
    /// byte-at-a-time loop costs ~110k fuel; this costs a small fraction of that.
    fn lower_ascii(src: &[u8], dst: &mut [u8]) {
        const HI: u64 = 0x8080_8080_8080_8080;
        let mut i = 0;
        while i + 8 <= src.len() {
            let mut w = [0u8; 8];
            w.copy_from_slice(&src[i..i + 8]);
            let x = u64::from_le_bytes(w);
            let low7 = x & !HI;
            let ge_a = low7.wrapping_add(0x3f3f_3f3f_3f3f_3f3f); // byte >= 'A' sets bit 7
            let gt_z = low7.wrapping_add(0x2525_2525_2525_2525); // byte >  'Z' sets bit 7
            let upper = (ge_a & !gt_z) & !x & HI;                // ASCII upper-case letters
            dst[i..i + 8].copy_from_slice(&(x | (upper >> 2)).to_le_bytes());
            i += 8;
        }
        while i < src.len() { dst[i] = src[i].to_ascii_lowercase(); i += 1; }
    }

    fn attached() -> (i64, [u8; 16], usize) {
        let mut sym = [0u8; 16];
        let n = unsafe { host_get_attached_symbol(sym.as_mut_ptr(), 16) };
        let amount = unsafe { host_get_attached_amount() };
        (amount, sym, if n > 0 { n as usize } else { 0 })
    }

    /// Methods that take no payment refuse one, so nothing can be sent here by mistake.
    fn refuse_payment() {
        if attached().0 != 0 { revert(); }
    }

    fn run_key(caller_hash: &[u8; 32]) -> [u8; 33] {
        let mut k = [0u8; 33];
        k[0] = b'r';
        k[1..].copy_from_slice(caller_hash);
        k
    }

    fn read_u64(key: &[u8]) -> Option<u64> {
        let mut v = [0u8; 8];
        let n = unsafe { host_storage_read(key.as_ptr(), key.len() as u32, v.as_mut_ptr(), 8) };
        if n == 8 { Some(u64::from_be_bytes(v)) } else { None }
    }

    fn write_u64(key: &[u8], v: u64) {
        let b = v.to_be_bytes();
        unsafe { host_storage_write(key.as_ptr(), key.len() as u32, b.as_ptr(), 8) };
    }

    fn bump(key: &[u8]) -> u64 {
        let v = read_u64(key).unwrap_or(0) + 1;
        write_u64(key, v);
        v
    }

    fn height() -> i64 { unsafe { host_get_block_height() } }

    /// Whether `setup` has run. `host_storage_read` returns -1 for a missing key and -2 when the
    /// value is larger than the buffer, so a 1-byte probe of the owner key answers -2 if it exists.
    fn has_owner() -> bool {
        let mut probe = [0u8; 1];
        unsafe { host_storage_read(b"owner".as_ptr(), 5, probe.as_mut_ptr(), 1) != -1 }
    }

    // ------------------------------------------------------------ JSON out

    struct Out { i: usize }
    impl Out {
        fn new() -> Self { Out { i: 0 } }
        fn s(&mut self, s: &[u8]) -> &mut Self {
            let buf = unsafe { &mut *core::ptr::addr_of_mut!(OUT) };
            for &b in s { if self.i < buf.len() { buf[self.i] = b; self.i += 1; } }
            self
        }
        fn n(&mut self, mut v: u64) -> &mut Self {
            let mut d = [0u8; 20];
            let mut k = 0;
            loop { d[k] = b'0' + (v % 10) as u8; k += 1; v /= 10; if v == 0 { break; } }
            while k > 0 { k -= 1; self.s(&[d[k]]); }
            self
        }
        fn bytes(&self) -> &'static [u8] { unsafe { &(&*core::ptr::addr_of!(OUT))[..self.i] } }
    }

    fn reply(topic: &[u8], out: &Out) {
        let msg = out.bytes();
        unsafe {
            host_emit_event(topic.as_ptr(), topic.len() as u32, msg.as_ptr(), msg.len() as u32);
            host_set_return(msg.as_ptr(), msg.len() as u32);
        }
    }

    fn answer(out: &Out) {
        let msg = out.bytes();
        unsafe { host_set_return(msg.as_ptr(), msg.len() as u32) };
    }

    // ------------------------------------------------------------ args in

    fn args() -> &'static [u8] {
        let len = unsafe { host_get_args_len() };
        if len <= 0 { return &[]; }
        let buf = unsafe { &mut *core::ptr::addr_of_mut!(ARGS) };
        if len as usize > buf.len() { revert(); }
        let n = unsafe { host_read_args(buf.as_mut_ptr(), buf.len() as u32) };
        if n <= 0 { return &[]; }
        &buf[..n as usize]
    }

    /// The unsigned integers inside `"key": [ … ]` (or the single integer after `"key":`).
    fn ints_after(json: &[u8], key: &[u8], out: &mut [u64]) -> usize {
        let mut i = 0;
        let mut at = None;
        while i + key.len() + 2 <= json.len() {
            if json[i] == b'"' && &json[i + 1..i + 1 + key.len()] == key && json[i + 1 + key.len()] == b'"' {
                at = Some(i + key.len() + 2);
                break;
            }
            i += 1;
        }
        let Some(mut i) = at else { return 0 };
        let mut n = 0;
        let mut in_array = false;
        while i < json.len() {
            let b = json[i];
            if b == b'[' { in_array = true; }
            else if b == b']' || (!in_array && (b == b',' || b == b'}')) && n > 0 { break; }
            else if b.is_ascii_digit() {
                let mut v: u64 = 0;
                while i < json.len() && json[i].is_ascii_digit() {
                    v = v.saturating_mul(10).saturating_add((json[i] - b'0') as u64);
                    i += 1;
                }
                if n == out.len() { revert(); }
                out[n] = v;
                n += 1;
                if !in_array { break; }
                continue;
            } else if b == b'-' { revert(); }
            i += 1;
        }
        n
    }

    // ------------------------------------------------------------ the board

    /// Board for a run opened at `h`, if block h+1 exists yet.
    fn board_for(h: i64, caller_hash: &[u8; 32]) -> Option<logic::Board> {
        let mut bh = [0u8; 32];
        if unsafe { host_block_hash(h + 1, bh.as_mut_ptr()) } != 32 { return None; }
        Some(logic::board(sha, logic::seed(sha, &bh, caller_hash, h as u64)))
    }

    fn collection_id(buf: &mut [u8; 64]) -> usize {
        let n = unsafe { host_get_self_addr(core::ptr::addr_of_mut!(SELF_ADDR) as *mut u8, 64) };
        if n < 16 { revert(); }
        let addr = unsafe { &*core::ptr::addr_of!(SELF_ADDR) };
        let mut i = 0;
        for &b in b"col:".iter().chain(addr[..16].iter()).chain(b":".iter()).chain(COLLECTION.iter()) {
            buf[i] = b;
            i += 1;
        }
        i
    }

    // ------------------------------------------------------------ methods

    /// Optional build-time lock on who may run `setup`: sha256 of the owner's lower-case public
    /// key, in hex (`NETRUN_OWNER=<hex> cargo build …`). Without it, the first caller of `setup`
    /// becomes the owner, so call it right after deploying.
    const OWNER_HASH: Option<&str> = option_env!("NETRUN_OWNER");

    fn hex_nibble(c: u8) -> u8 {
        match c { b'0'..=b'9' => c - b'0', b'a'..=b'f' => c - b'a' + 10, b'A'..=b'F' => c - b'A' + 10, _ => revert() }
    }

    #[no_mangle]
    pub extern "C" fn setup() {
        refuse_payment();
        let (raw, who) = caller();
        if has_owner() { revert(); }
        if let Some(hex) = OWNER_HASH {
            let h = hex.as_bytes();
            if h.len() != 64 { revert(); }
            for i in 0..32 {
                if (hex_nibble(h[2 * i]) << 4 | hex_nibble(h[2 * i + 1])) != who[i] { revert(); }
            }
        }
        unsafe { host_storage_write(b"owner".as_ptr(), 5, raw.as_ptr(), raw.len() as u32) };
        let name = b"NETRUN Implants";
        let mut out = [0u8; 128];
        let n = unsafe {
            host_nft_create_collection(COLLECTION.as_ptr(), COLLECTION.len() as u32, name.as_ptr(), name.len() as u32,
                                       100_000, out.as_mut_ptr(), 128)
        };
        if n <= 0 { revert(); }
        let mut o = Out::new();
        o.s(b"{\"setup\":true}");
        reply(b"setup", &o);
    }

    #[no_mangle]
    pub extern "C" fn jack_in() {
        let (amount, sym, sl) = attached();
        if &sym[..sl] != b"XRGE" || amount != ENTRY_FEE { revert(); }
        let (_, low) = caller();
        let key = run_key(&low);
        let now = height();
        if let Some(h) = read_u64(&key) {
            // One open run per player, unless the old one has expired.
            if now - (h as i64 + 1) <= EXPIRY_BLOCKS { revert(); }
        }
        write_u64(&key, now as u64);
        let runs = bump(b"s_runs");
        let mut o = Out::new();
        o.s(b"{\"height\":").n(now as u64).s(b",\"ready\":").n(now as u64 + 2).s(b",\"run\":").n(runs).s(b"}");
        reply(b"jack_in", &o);
    }

    /// Free query: the caller's open run and, once block H+1 exists, its board.
    #[no_mangle]
    pub extern "C" fn board() {
        let (_, low) = caller();
        let mut o = Out::new();
        let Some(h) = read_u64(&run_key(&low)) else {
            o.s(b"{\"open\":false}");
            return answer(&o);
        };
        let now = height();
        let h = h as i64;
        o.s(b"{\"open\":true,\"height\":").n(h as u64).s(b",\"expires\":").n((h + 1 + EXPIRY_BLOCKS) as u64);
        if now - (h + 1) > EXPIRY_BLOCKS {
            o.s(b",\"expired\":true}");
            return answer(&o);
        }
        let Some(b) = (if now >= h + 2 { board_for(h, &low) } else { None }) else {
            o.s(b",\"ready\":false}");
            return answer(&o);
        };
        o.s(b",\"ready\":true,\"buffer\":").n(BUFFER as u64).s(b",\"grid\":[");
        for (i, &cell) in b.grid.iter().enumerate() {
            if i > 0 { o.s(b","); }
            o.s(b"\"").s(SYMBOLS[cell as usize]).s(b"\"");
        }
        o.s(b"],\"daemons\":[");
        for d in 0..3 {
            if d > 0 { o.s(b","); }
            o.s(b"[");
            for j in 0..b.daemon_lens[d] {
                if j > 0 { o.s(b","); }
                o.s(b"\"").s(SYMBOLS[b.daemons[d][j] as usize]).s(b"\"");
            }
            o.s(b"]");
        }
        o.s(b"],\"rewards\":[").n(DAEMON_REWARD[0] as u64).s(b",").n(DAEMON_REWARD[1] as u64).s(b",").n(DAEMON_REWARD[2] as u64);
        o.s(b"],\"implant\":\"").s(IMPLANTS[b.implant]).s(b"\"}");
        answer(&o);
    }

    #[no_mangle]
    pub extern "C" fn breach() {
        refuse_payment();
        let (raw, low) = caller();
        let key = run_key(&low);
        let Some(h) = read_u64(&key) else { revert() };
        let h = h as i64;
        let now = height();
        if now < h + 2 { revert(); }
        let mut o = Out::new();
        if now - (h + 1) > EXPIRY_BLOCKS {
            unsafe { host_storage_delete(key.as_ptr(), key.len() as u32) };
            o.s(b"{\"expired\":true}");
            return reply(b"breach", &o);
        }
        let Some(b) = board_for(h, &low) else { revert() };

        let mut cells = [0u64; BUFFER + 1];
        let n = ints_after(args(), b"path", &mut cells);
        if n == 0 || n > BUFFER { revert(); }
        let mut path = [0u8; BUFFER];
        for i in 0..n {
            if cells[i] >= CELLS as u64 { revert(); }
            path[i] = cells[i] as u8;
        }
        // An illegal path fails the call: the run stays open to try again.
        let Ok(up) = logic::score(&b, &path[..n]) else { revert() };

        unsafe { host_storage_delete(key.as_ptr(), key.len() as u32) };
        let mut scrap: i64 = 0;
        for d in 0..3 { if up[d] { scrap += DAEMON_REWARD[d]; } }
        let paid = scrap > 0 && unsafe {
            host_token_transfer(TOKEN.as_ptr(), TOKEN.len() as u32, raw.as_ptr(), raw.len() as u32, scrap)
        } == 0;

        let full = up[0] && up[1] && up[2];
        let mut implant_id: i64 = 0;
        if full {
            bump(b"s_full");
            let mut col = [0u8; 64];
            let cl = collection_id(&mut col);
            let name = IMPLANTS[b.implant];
            let mut meta = [0u8; 96];
            let mut m = 0;
            for &c in b"{\"grade\":\"full breach\",\"run\":".iter() { meta[m] = c; m += 1; }
            let mut hv = h as u64;
            let mut d = [0u8; 20];
            let mut k = 0;
            loop { d[k] = b'0' + (hv % 10) as u8; k += 1; hv /= 10; if hv == 0 { break; } }
            while k > 0 { k -= 1; meta[m] = d[k]; m += 1; }
            meta[m] = b'}'; m += 1;
            implant_id = unsafe {
                host_nft_mint(col.as_ptr(), cl as u32, raw.as_ptr(), raw.len() as u32,
                              name.as_ptr(), name.len() as u32, meta.as_ptr(), m as u32)
            };
        }

        o.s(b"{\"daemons\":[");
        for d in 0..3 { if d > 0 { o.s(b","); } o.s(if up[d] { b"true" } else { b"false" }); }
        o.s(b"],\"scrap\":").n(scrap as u64).s(b",\"scrap_paid\":").s(if paid || scrap == 0 { b"true" } else { b"false" });
        o.s(b",\"full\":").s(if full { b"true" } else { b"false" });
        if full {
            o.s(b",\"implant\":\"").s(IMPLANTS[b.implant]).s(b"\",\"implant_id\":");
            if implant_id > 0 { o.n(implant_id as u64); } else { o.s(b"null"); }
        }
        o.s(b"}");
        reply(b"breach", &o);
    }

    #[no_mangle]
    pub extern "C" fn abandon() {
        refuse_payment();
        let (_, low) = caller();
        let key = run_key(&low);
        if read_u64(&key).is_none() { revert(); }
        unsafe { host_storage_delete(key.as_ptr(), key.len() as u32) };
        let mut o = Out::new();
        o.s(b"{\"abandoned\":true}");
        reply(b"abandon", &o);
    }

    #[no_mangle]
    pub extern "C" fn withdraw() {
        refuse_payment();
        let (raw, _) = caller();
        let mut owner = [0u8; CALLER_CAP];
        let n = unsafe { host_storage_read(b"owner".as_ptr(), 5, owner.as_mut_ptr(), CALLER_CAP as u32) };
        if n <= 0 || &owner[..n as usize] != raw { revert(); }
        let mut amt = [0u64; 1];
        if ints_after(args(), b"amount", &mut amt) != 1 || amt[0] == 0 || amt[0] > i64::MAX as u64 { revert(); }
        if unsafe { host_transfer(raw.as_ptr(), raw.len() as u32, amt[0] as i64) } != 0 { revert(); }
        let mut o = Out::new();
        o.s(b"{\"withdrawn\":").n(amt[0]).s(b"}");
        reply(b"withdraw", &o);
    }

    /// Free query: game constants and counters.
    #[no_mangle]
    pub extern "C" fn info() {
        let ready = has_owner();
        let mut o = Out::new();
        o.s(b"{\"fee\":").n(ENTRY_FEE as u64).s(b",\"expiry\":").n(EXPIRY_BLOCKS as u64)
            .s(b",\"runs\":").n(read_u64(b"s_runs").unwrap_or(0))
            .s(b",\"full_breaches\":").n(read_u64(b"s_full").unwrap_or(0))
            .s(b",\"setup\":").s(if ready { b"true" } else { b"false" }).s(b"}");
        answer(&o);
    }
}

#[cfg(test)]
mod tests;
