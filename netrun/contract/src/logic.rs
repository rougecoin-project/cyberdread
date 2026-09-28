//! NETRUN game rules, shared by the contract and its tests (and mirrored exactly by
//! `js/modules/games/netrun-rules.js` for the browser).
//!
//! Everything here is pure: the caller passes a SHA-256 function, so the chain uses the
//! `host_sha256` host call and the tests use a plain Rust implementation.

/// A SHA-256 function: 32-byte digest of `data`.
pub type Sha = fn(&[u8]) -> [u8; 32];

pub const GRID: usize = 5;
pub const CELLS: usize = GRID * GRID;
/// Moves a player may make in one breach.
pub const BUFFER: usize = 6;
/// Code symbols, by index.
pub const SYMBOLS: [&[u8]; 5] = [b"1C", b"55", b"BD", b"E9", b"7A"];
/// Daemon lengths (the targets to upload).
pub const DAEMON_LENS: [usize; 3] = [2, 3, 3];
/// SCRAP paid per daemon uploaded.
pub const DAEMON_REWARD: [i64; 3] = [10, 25, 50];
/// Implant names; a full breach mints one, chosen by the board seed.
pub const IMPLANTS: [&[u8]; 6] = [
    b"Ghost Lens", b"Synapse Booster", b"Neural Spike", b"ICE Pick", b"Chrome Spine", b"Dread Link",
];

/// Board seed: sha256("netrun/v1" ‖ hash of block H+1 ‖ sha256(lower-case caller) ‖ H as 8 bytes
/// big-endian). Block H+1 did not exist when the player paid at block H, so nobody can know the
/// board first.
pub fn seed(sha: Sha, block_hash: &[u8; 32], caller_hash: &[u8; 32], height: u64) -> [u8; 32] {
    let mut buf = [0u8; 9 + 32 + 32 + 8];
    buf[..9].copy_from_slice(b"netrun/v1");
    buf[9..41].copy_from_slice(block_hash);
    buf[41..73].copy_from_slice(caller_hash);
    buf[73..].copy_from_slice(&height.to_be_bytes());
    sha(&buf)
}

/// Deterministic stream of small numbers: block i = sha256(seed ‖ i as 4 bytes big-endian),
/// one byte per draw, `byte % n`.
pub struct Rng {
    sha: Sha,
    seed: [u8; 32],
    block: [u8; 32],
    counter: u32,
    pos: usize,
}

impl Rng {
    pub fn new(sha: Sha, seed: [u8; 32]) -> Self {
        Rng { sha, seed, block: [0; 32], counter: 0, pos: 32 }
    }

    /// A number in `0..n` (`n` from 1 to 255).
    pub fn next(&mut self, n: usize) -> usize {
        if self.pos == 32 {
            let mut input = [0u8; 36];
            input[..32].copy_from_slice(&self.seed);
            input[32..].copy_from_slice(&self.counter.to_be_bytes());
            self.block = (self.sha)(&input);
            self.counter += 1;
            self.pos = 0;
        }
        let b = self.block[self.pos] as usize;
        self.pos += 1;
        b % n
    }
}

/// A generated board: 25 symbol indices and three daemons (symbol index sequences).
pub struct Board {
    pub grid: [u8; CELLS],
    pub daemons: [[u8; 3]; 3],
    pub daemon_lens: [usize; 3],
    pub implant: usize,
}

/// A random legal path: start in row 0, then alternate column, row, column…
fn random_path(rng: &mut Rng, out: &mut [u8; BUFFER]) -> usize {
    let mut used = [false; CELLS];
    let mut r = 0usize;
    let mut c = rng.next(GRID);
    out[0] = (r * GRID + c) as u8;
    used[r * GRID + c] = true;
    let mut len = 1;
    while len < BUFFER {
        let mut cand = [0u8; GRID];
        let mut k = 0;
        for i in 0..GRID {
            // Odd moves stay in the column, even moves stay in the row.
            let (rr, cc) = if len % 2 == 1 { (i, c) } else { (r, i) };
            if !used[rr * GRID + cc] { cand[k] = (rr * GRID + cc) as u8; k += 1; }
        }
        if k == 0 { break; }
        let cell = cand[rng.next(k)] as usize;
        used[cell] = true;
        r = cell / GRID;
        c = cell % GRID;
        out[len] = cell as u8;
        len += 1;
    }
    len
}

pub fn board(sha: Sha, seed: [u8; 32]) -> Board {
    let mut rng = Rng::new(sha, seed);
    let mut grid = [0u8; CELLS];
    for cell in grid.iter_mut() { *cell = rng.next(SYMBOLS.len()) as u8; }

    let mut a = [0u8; BUFFER];
    let la = random_path(&mut rng, &mut a);
    let mut b = [0u8; BUFFER];
    let lb = random_path(&mut rng, &mut b);

    // Daemons 1 and 2 come from path A (so they can be uploaded together); daemon 3 from path B.
    let mut daemons = [[0u8; 3]; 3];
    for (d, &len) in DAEMON_LENS.iter().enumerate() {
        let (path, plen) = if d < 2 { (&a, la) } else { (&b, lb) };
        // Daemon 3 redraws (up to 3 times) if it came out the same as daemon 2.
        for _ in 0..3 {
            let off = rng.next(plen - len + 1);
            for j in 0..len { daemons[d][j] = grid[path[off + j] as usize]; }
            if d < 2 || daemons[2] != daemons[1] { break; }
        }
    }
    let implant = seed[31] as usize % IMPLANTS.len();
    Board { grid, daemons, daemon_lens: DAEMON_LENS, implant }
}

/// Why a submitted path is not a legal breach.
#[derive(Debug, PartialEq)]
pub enum PathError { Empty, TooLong, OutOfBounds, NotRowZero, BadMove, Reused }

/// Checks `path` (cell indices 0..25) against the rules and returns which daemons it uploads.
pub fn score(board: &Board, path: &[u8]) -> Result<[bool; 3], PathError> {
    if path.is_empty() { return Err(PathError::Empty); }
    if path.len() > BUFFER { return Err(PathError::TooLong); }
    let mut used = [false; CELLS];
    for (i, &cell) in path.iter().enumerate() {
        let cell = cell as usize;
        if cell >= CELLS { return Err(PathError::OutOfBounds); }
        if used[cell] { return Err(PathError::Reused); }
        used[cell] = true;
        let (r, c) = (cell / GRID, cell % GRID);
        if i == 0 {
            if r != 0 { return Err(PathError::NotRowZero); }
        } else {
            let prev = path[i - 1] as usize;
            let (pr, pc) = (prev / GRID, prev % GRID);
            let ok = if i % 2 == 1 { c == pc && r != pr } else { r == pr && c != pc };
            if !ok { return Err(PathError::BadMove); }
        }
    }
    let mut seq = [0u8; BUFFER];
    for (i, &cell) in path.iter().enumerate() { seq[i] = board.grid[cell as usize]; }
    let seq = &seq[..path.len()];
    let mut up = [false; 3];
    for d in 0..3 {
        let want = &board.daemons[d][..board.daemon_lens[d]];
        up[d] = seq.windows(want.len()).any(|w| w == want);
    }
    Ok(up)
}
