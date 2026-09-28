// Checks the browser's netrun-rules.js against vectors from the Rust contract.
//   node netrun/contract/tests/rules.test.mjs
// Update the vectors with `cargo test -- --nocapture` (VECTOR lines) and the VM harness.
import assert from 'node:assert/strict';
import * as R from '../../../js/modules/games/netrun-rules.js';

const hex = R.bytesToHex;
assert.equal(hex(R.sha256(new TextEncoder().encode('abc'))), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
assert.equal(hex(R.sha256(new Uint8Array(1000).fill(97))), '41edece42d63e8d9bf515a9ba6932e1c20cbc9f5a5d134645adb5db1b9737ea3');

// logic.rs `print_js_vectors`: seeds and the boards they give.
const vectors = [
    ['0bac3218664dd62104660c8763260ec7e84e0e77e7c5d3806b6191fae695429f', [2,3,2,2,1,2,2,3,2,3,2,3,1,1,4,2,4,3,1,4,1,3,4,2,4], [[4,1],[4,1,2],[3,2,1]], 3],
    ['c52cf179bc60dfcec92e4b2fe173dc56492495dc37da4ce2d67121568c9a3b17', [4,4,1,4,2,4,0,4,4,0,3,4,4,4,4,0,0,2,0,4,0,1,3,3,2], [[3,0],[3,0,0],[4,3,4]], 5],
    ['30d74e667be5571f7ef91656bc9392fb7caf565c4c46d25f15351a9ab203d371', [2,0,0,0,0,3,0,3,3,1,1,4,1,4,3,1,1,1,0,4,0,4,4,0,3], [[2,0],[0,1,2],[3,0,1]], 5]
];
for (const [seed, grid, daemons, implant] of vectors) {
    const b = R.makeBoard(R.hexToBytes(seed));
    assert.deepEqual(b.grid, grid, `grid for ${seed.slice(0, 8)}`);
    assert.deepEqual(b.daemons, daemons, `daemons for ${seed.slice(0, 8)}`);
    assert.equal(b.implant, implant);
}

// The VM harness: the real netrun.wasm served this board for an upper-case caller at H = 300.
const caller = Array.from({ length: 1952 }, (_, i) => ((i * 37 + 11) % 256).toString(16).padStart(2, '0').toUpperCase()).join('');
const seed = R.liveSeed('6f3c8257eed1b79c3426d280e414a134831d0be0e4a32fe1cd7ffd2dc8fc8aab', caller, 300);
assert.equal(hex(seed), '15e4855af3ab228d61baf173d17f410e8112b4b89f6640cc7de939e188e90db9');
const live = R.makeBoard(seed);
assert.deepEqual(live.grid.map((i) => R.SYMBOLS[i]),
    ['BD','7A','BD','1C','E9','55','BD','7A','55','1C','7A','E9','BD','E9','E9','1C','55','55','55','1C','7A','1C','BD','55','1C']);
assert.deepEqual(live.daemons.map((d) => d.map((i) => R.SYMBOLS[i])), [['BD','7A'],['E9','1C','55'],['7A','BD','1C']]);
assert.equal(R.IMPLANTS[live.implant], 'Dread Link');
// The contract uploaded daemons 1 and 2 for path [0,10,11,21,23].
assert.deepEqual(R.score(live, [0, 10, 11, 21, 23]), [true, true, false]);
assert.equal(R.rewardFor([true, true, false]), 35);

// Move rules.
assert.deepEqual(R.allowedCells([]), [0, 1, 2, 3, 4]);
assert.deepEqual(R.allowedCells([2]), [7, 12, 17, 22]);        // same column, not the used cell
assert.deepEqual(R.allowedCells([2, 12]), [10, 11, 13, 14]);   // same row
assert.deepEqual(R.allowedCells([0, 5, 6, 1, 2, 7]), []);      // buffer full
console.log('netrun-rules.js matches the contract ✓');
