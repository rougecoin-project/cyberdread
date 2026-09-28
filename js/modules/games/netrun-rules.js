/**
 * NETRUN rules — an exact mirror of netrun/contract/src/logic.rs.
 *
 * The contract is the authority for live runs (the page asks it for the board and it checks every
 * move on-chain). This copy runs practice boards and previews what a path will upload, so it must
 * produce the same boards from the same seed: the contract's test vectors are checked in
 * netrun/contract/tests/rules.test.mjs.
 */

export const GRID = 5;
export const CELLS = GRID * GRID;
export const BUFFER = 6;
export const SYMBOLS = ['1C', '55', 'BD', 'E9', '7A'];
export const DAEMON_LENS = [2, 3, 3];
export const DAEMON_REWARD = [10, 25, 50];
export const DAEMON_NAMES = ['SIPHON', 'BLACKOUT', 'GHOST KEY'];
export const IMPLANTS = ['Ghost Lens', 'Synapse Booster', 'Neural Spike', 'ICE Pick', 'Chrome Spine', 'Dread Link'];

/* --------------------------------------------------------------- SHA-256 */

const K = new Uint32Array([
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
]);

/** SHA-256 of a byte array, synchronously (Web Crypto is async-only). */
export function sha256(data) {
    const h = new Uint32Array([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]);
    const len = data.length;
    const total = Math.ceil((len + 9) / 64) * 64;
    const msg = new Uint8Array(total);
    msg.set(data);
    msg[len] = 0x80;
    const view = new DataView(msg.buffer);
    view.setUint32(total - 4, (len * 8) >>> 0);
    view.setUint32(total - 8, Math.floor(len / 0x20000000));
    const w = new Uint32Array(64);
    for (let off = 0; off < total; off += 64) {
        for (let i = 0; i < 16; i++) w[i] = view.getUint32(off + 4 * i);
        for (let i = 16; i < 64; i++) {
            const a = w[i - 15], b = w[i - 2];
            const s0 = ((a >>> 7) | (a << 25)) ^ ((a >>> 18) | (a << 14)) ^ (a >>> 3);
            const s1 = ((b >>> 17) | (b << 15)) ^ ((b >>> 19) | (b << 13)) ^ (b >>> 10);
            w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
        }
        let [a, b, c, d, e, f, g, hh] = h;
        for (let i = 0; i < 64; i++) {
            const S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
            const ch = (e & f) ^ (~e & g);
            const t1 = (hh + S1 + ch + K[i] + w[i]) >>> 0;
            const S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
            const maj = (a & b) ^ (a & c) ^ (b & c);
            const t2 = (S0 + maj) >>> 0;
            hh = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0;
        }
        h[0] += a; h[1] += b; h[2] += c; h[3] += d; h[4] += e; h[5] += f; h[6] += g; h[7] += hh;
    }
    const out = new Uint8Array(32);
    const ov = new DataView(out.buffer);
    for (let i = 0; i < 8; i++) ov.setUint32(4 * i, h[i]);
    return out;
}

export const hexToBytes = (hex) => Uint8Array.from(hex.match(/../g) || [], (b) => parseInt(b, 16));
export const bytesToHex = (bytes) => Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
const utf8 = (s) => new TextEncoder().encode(s);

/* ------------------------------------------------------------------ seed */

/**
 * Board seed for a live run, exactly as the contract computes it:
 * sha256("netrun/v1" ‖ hash of block H+1 ‖ sha256(lower-case caller) ‖ H as 8 bytes big-endian).
 */
export function liveSeed(blockHashHex, caller, height) {
    const buf = new Uint8Array(9 + 32 + 32 + 8);
    buf.set(utf8('netrun/v1'), 0);
    buf.set(hexToBytes(blockHashHex), 9);
    buf.set(sha256(utf8(caller.toLowerCase())), 41);
    new DataView(buf.buffer).setBigUint64(73, BigInt(height));
    return sha256(buf);
}

/** A random seed for practice boards. */
export function practiceSeed() {
    return crypto.getRandomValues(new Uint8Array(32));
}

/* ------------------------------------------------------------------ board */

class Rng {
    constructor(seed) {
        this.seed = seed;
        this.block = null;
        this.counter = 0;
        this.pos = 32;
    }

    next(n) {
        if (this.pos === 32) {
            const input = new Uint8Array(36);
            input.set(this.seed, 0);
            new DataView(input.buffer).setUint32(32, this.counter);
            this.block = sha256(input);
            this.counter += 1;
            this.pos = 0;
        }
        return this.block[this.pos++] % n;
    }
}

function randomPath(rng) {
    const used = new Array(CELLS).fill(false);
    let r = 0;
    let c = rng.next(GRID);
    const path = [r * GRID + c];
    used[path[0]] = true;
    while (path.length < BUFFER) {
        const cand = [];
        for (let i = 0; i < GRID; i++) {
            const [rr, cc] = path.length % 2 === 1 ? [i, c] : [r, i];
            if (!used[rr * GRID + cc]) cand.push(rr * GRID + cc);
        }
        if (cand.length === 0) break;
        const cell = cand[rng.next(cand.length)];
        used[cell] = true;
        r = Math.floor(cell / GRID);
        c = cell % GRID;
        path.push(cell);
    }
    return path;
}

/** Board from a 32-byte seed: grid of symbol indices, three daemons, and the Implant a full breach mints. */
export function makeBoard(seed) {
    const rng = new Rng(seed);
    const grid = [];
    for (let i = 0; i < CELLS; i++) grid.push(rng.next(SYMBOLS.length));
    const a = randomPath(rng);
    const b = randomPath(rng);
    const daemons = [[], [], []];
    DAEMON_LENS.forEach((len, d) => {
        const path = d < 2 ? a : b;
        for (let attempt = 0; attempt < 3; attempt++) {
            const off = rng.next(path.length - len + 1);
            daemons[d] = path.slice(off, off + len).map((cell) => grid[cell]);
            if (d < 2 || daemons[2].join() !== daemons[1].join()) break;
        }
    });
    return { grid, daemons, implant: seed[31] % IMPLANTS.length };
}

/** Board as the contract's `board` query returns it (symbol strings), converted to indices. */
export function boardFromChain(json) {
    const idx = (s) => SYMBOLS.indexOf(s);
    return {
        grid: json.grid.map(idx),
        daemons: json.daemons.map((d) => d.map(idx)),
        implant: Math.max(0, IMPLANTS.indexOf(json.implant))
    };
}

/* ------------------------------------------------------------------ rules */

/** Cells a player may pick next after `path` (row 0 first, then column, row, column…). */
export function allowedCells(path) {
    const used = new Set(path);
    const out = [];
    if (path.length >= BUFFER) return out;
    if (path.length === 0) {
        for (let c = 0; c < GRID; c++) out.push(c);
        return out;
    }
    const last = path[path.length - 1];
    const r = Math.floor(last / GRID);
    const c = last % GRID;
    for (let i = 0; i < GRID; i++) {
        const cell = path.length % 2 === 1 ? i * GRID + c : r * GRID + i;
        if (!used.has(cell)) out.push(cell);
    }
    return out;
}

/** Which daemons a (legal) path uploads, and how far each is matched at the end of the buffer. */
export function score(board, path) {
    const seq = path.map((cell) => board.grid[cell]);
    return board.daemons.map((want) => {
        for (let i = 0; i + want.length <= seq.length; i++) {
            if (want.every((s, j) => seq[i + j] === s)) return true;
        }
        return false;
    });
}

/** Longest prefix of `want` that the buffer currently ends with (for progress highlighting). */
export function progress(board, path, d) {
    const seq = path.map((cell) => board.grid[cell]);
    const want = board.daemons[d];
    for (let k = Math.min(want.length, seq.length); k > 0; k--) {
        if (want.slice(0, k).every((s, j) => seq[seq.length - k + j] === s)) return k;
    }
    return 0;
}

export const rewardFor = (up) => up.reduce((sum, u, d) => sum + (u ? DAEMON_REWARD[d] : 0), 0);
