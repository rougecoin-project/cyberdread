//! Native tests for the game rules (`cargo test`). The chain runs the same `logic` module with
//! `host_sha256`; here a plain SHA-256 stands in for it.

use crate::logic::*;

/// Minimal SHA-256 (FIPS 180-4), for tests only.
fn sha256(data: &[u8]) -> [u8; 32] {
    const K: [u32; 64] = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
    ];
    let mut h: [u32; 8] = [
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
    ];
    let mut msg = data.to_vec();
    let bits = (data.len() as u64) * 8;
    msg.push(0x80);
    while msg.len() % 64 != 56 { msg.push(0); }
    msg.extend_from_slice(&bits.to_be_bytes());
    for chunk in msg.chunks(64) {
        let mut w = [0u32; 64];
        for i in 0..16 { w[i] = u32::from_be_bytes([chunk[4 * i], chunk[4 * i + 1], chunk[4 * i + 2], chunk[4 * i + 3]]); }
        for i in 16..64 {
            let s0 = w[i - 15].rotate_right(7) ^ w[i - 15].rotate_right(18) ^ (w[i - 15] >> 3);
            let s1 = w[i - 2].rotate_right(17) ^ w[i - 2].rotate_right(19) ^ (w[i - 2] >> 10);
            w[i] = w[i - 16].wrapping_add(s0).wrapping_add(w[i - 7]).wrapping_add(s1);
        }
        let mut v = h;
        for i in 0..64 {
            let s1 = v[4].rotate_right(6) ^ v[4].rotate_right(11) ^ v[4].rotate_right(25);
            let ch = (v[4] & v[5]) ^ (!v[4] & v[6]);
            let t1 = v[7].wrapping_add(s1).wrapping_add(ch).wrapping_add(K[i]).wrapping_add(w[i]);
            let s0 = v[0].rotate_right(2) ^ v[0].rotate_right(13) ^ v[0].rotate_right(22);
            let maj = (v[0] & v[1]) ^ (v[0] & v[2]) ^ (v[1] & v[2]);
            let t2 = s0.wrapping_add(maj);
            v = [t1.wrapping_add(t2), v[0], v[1], v[2], v[3].wrapping_add(t1), v[4], v[5], v[6]];
        }
        for i in 0..8 { h[i] = h[i].wrapping_add(v[i]); }
    }
    let mut out = [0u8; 32];
    for i in 0..8 { out[4 * i..4 * i + 4].copy_from_slice(&h[i].to_be_bytes()); }
    out
}

fn hex(b: &[u8]) -> String { b.iter().map(|x| format!("{:02x}", x)).collect() }

fn test_seed(n: u8) -> [u8; 32] {
    let bh = sha256(&[n]);
    seed(sha256, &bh, &sha256(b"abc123"), 42 + n as u64)
}

#[test]
fn sha256_matches_known_vector() {
    assert_eq!(hex(&sha256(b"abc")), "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
}

#[test]
fn boards_are_deterministic_and_differ_by_seed() {
    let a = board(sha256, test_seed(1));
    let b = board(sha256, test_seed(1));
    let c = board(sha256, test_seed(2));
    assert_eq!(a.grid, b.grid);
    assert_eq!(a.daemons, b.daemons);
    assert_ne!(a.grid, c.grid);
}

/// Daemons 1 and 2 come from one legal path, so some legal path always uploads both.
#[test]
fn daemons_one_and_two_are_always_uploadable_together() {
    for n in 0..200u8 {
        let b = board(sha256, test_seed(n));
        let mut found = false;
        search(&b, &mut Vec::new(), &mut |up| { if up[0] && up[1] { found = true; } });
        assert!(found, "board {} has no path for daemons 1+2", n);
    }
}

/// Every legal path of every length (exhaustive; small board).
fn search(b: &Board, path: &mut Vec<u8>, f: &mut dyn FnMut([bool; 3])) {
    if !path.is_empty() {
        if let Ok(up) = score(b, path) { f(up); } else { return; }
    }
    if path.len() == BUFFER { return; }
    for cell in 0..CELLS as u8 {
        path.push(cell);
        if score(b, path).is_ok() { search(b, path, f); }
        path.pop();
    }
}

#[test]
fn rules_reject_illegal_paths() {
    let b = board(sha256, test_seed(7));
    assert_eq!(score(&b, &[]), Err(PathError::Empty));
    assert_eq!(score(&b, &[5]), Err(PathError::NotRowZero));        // row 1
    assert_eq!(score(&b, &[0, 1]), Err(PathError::BadMove));         // move 1 must stay in the column
    assert_eq!(score(&b, &[0, 5, 10]), Err(PathError::BadMove));     // move 2 must stay in the row
    assert_eq!(score(&b, &[0, 5, 5]), Err(PathError::Reused));
    assert_eq!(score(&b, &[0, 5, 6, 1, 0]), Err(PathError::Reused)); // back to the start cell
    assert_eq!(score(&b, &[0, 5, 6, 1, 2, 7, 8]), Err(PathError::TooLong));
    assert_eq!(score(&b, &[25]), Err(PathError::OutOfBounds));
    assert!(score(&b, &[0, 5, 6, 1, 2, 7]).is_ok());
}

#[test]
fn uploads_follow_contiguous_matches() {
    let mut b = board(sha256, test_seed(3));
    // A hand-made board: row 0 = 1C 55 BD E9 7A, everything else 1C.
    b.grid = [0; CELLS];
    b.grid[..5].copy_from_slice(&[0, 1, 2, 3, 4]);
    b.daemons = [[0, 0, 0], [1, 0, 0], [3, 0, 2]];
    // Path 1 (55) -> 6 (1C) -> 5 (1C): sequence 55 1C 1C.
    let up = score(&b, &[1, 6, 5]).unwrap();
    assert_eq!(up, [true, true, false]);
}

/// Vectors the browser's `netrun-rules.js` must reproduce exactly.
#[test]
fn print_js_vectors() {
    for n in [1u8, 2, 3] {
        let s = test_seed(n);
        let b = board(sha256, s);
        println!("VECTOR seed={} grid={:?} daemons={:?} implant={}", hex(&s), b.grid, b.daemons, b.implant);
    }
}
