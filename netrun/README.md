# NETRUN — breach protocol on RougeChain

NETRUN is a code-matrix hacking game that runs in Dread_OS (`netrun.exe`, or `netrun` in
term.exe). Practice boards are free and run in the browser. Live runs are played against the
NETRUN smart contract on RougeChain mainnet: you pay 0.1 XRGE to jack in, the contract deals you
a board nobody could know in advance, checks your moves on-chain and pays out.

## Wallets

The page detects which wallet injected `window.rougechain`:

- **Qwalla** (the app's dApp browser on iOS, Android and desktop, recognised by its
  `ReactNativeWebView` bridge). Qwalla's `sendTransaction` only makes transfers, so NETRUN
  builds each contract call itself, has Qwalla sign it with `signTransaction` (ML-DSA-65 over
  the key-sorted JSON, the same bytes the SDK signs) and submits it to
  `/api/v2/contract/execute`. Qwalla reports its network, so a wallet on the wrong network gets
  a "switch network" screen instead of a failed payment.
- **RougeChain Wallet extension** on desktop: `sendTransaction` with a `contract_call`
  payload, which the extension signs and submits.

With neither, the Live tab offers both; on phones it leads with "Open in Qwalla"
(`qwalla://browser?url=<this page>`).

## How a live run works

1. **Jack in.** `jack_in` is a payable call carrying exactly 0.1 XRGE. The contract records the
   block height `H` it landed in. One open run per wallet.
2. **The ICE seals.** Your board is cut from
   `sha256("netrun/v1" ‖ hash(block H+1) ‖ sha256(lower-case wallet key) ‖ H)`.
   Block H+1 doesn't exist when you pay, so neither you, the site nor a validator acting alone
   can steer the board. RougeChain only makes blocks when there is traffic, so the window
   offers a "seal a block" button (a harmless `info` call) if the chain is quiet.
3. **Breach.** From block H+2 the `board` query returns your matrix. Pick up to 6 cells
   (row 0 first, then alternate column / row, no cell twice). `breach` rebuilds the board
   on-chain, rejects an illegal path, and scores it.
4. **Loot.** SIPHON pays 10 SCRAP, BLACKOUT 25, GHOST KEY 50. Upload all three for a full
   breach and the contract also mints you an **Implant** NFT (NETRUN Implants collection).
5. A run left untouched for 250 blocks after H+1 expires; `abandon` closes one early. The entry
   fee isn't refunded either way.

## Contract

| Method | Kind | Does |
| --- | --- | --- |
| `setup` | tx, once | Makes the caller the owner and creates the Implant collection |
| `jack_in` | tx, payable 0.1 XRGE | Opens a run; returns `{height, ready, run}` |
| `board` | query | `{open:false}`, still sealing, `expired`, or the full board |
| `breach` | tx | `{"path":[cells]}` → daemons uploaded, SCRAP paid, Implant id |
| `abandon` | tx | Closes your open run |
| `withdraw` | tx, owner | `{"amount": quanta}` sends collected fees to the owner |
| `info` | query | Fee, expiry, runs played, full breaches, whether setup ran |

Gas measured in the RougeChain VM: `jack_in` ≈ 22k, `board` ≈ 39k (free query), `breach`
≈ 40k. The fee is gas limit × 0.000001 XRGE and the site sets limits of 40k / 80k, so a run
costs the 0.1 XRGE entry plus at most 0.12 XRGE in fees.

`src/logic.rs` holds the pure rules; `js/modules/games/netrun-rules.js` is an exact mirror
used for practice boards and path previews. `src/tests.rs` prints the vectors the JS is
checked against.

## Build and test

```bash
rustup target add wasm32-unknown-unknown
cd netrun/contract
cargo test                                             # rules, determinism, JS vectors
node tests/rules.test.mjs                              # JS rules == contract rules
cargo build --release --target wasm32-unknown-unknown  # → target/wasm32-unknown-unknown/release/netrun.wasm (~18 KB)
```

### Locking the owner (recommended)

Without a lock, whoever calls `setup` first becomes the owner. Build the owner in instead:

```bash
OWNER=$(printf '%s' "<your RougeChain public key hex>" | tr 'A-F' 'a-f' | sha256sum | cut -d' ' -f1)
NETRUN_OWNER=$OWNER cargo build --release --target wasm32-unknown-unknown
```

`setup` then reverts for anyone but you.

## Deploying to mainnet

You need a wallet with roughly 115 XRGE plus whatever SCRAP float you want to fund.

1. **Deploy** `netrun.wasm` as a `contract_deploy` transaction (10 XRGE) from the wallet or
   SDK. Note the 40-hex contract address.
2. **Call `setup`** straight away from the owner wallet (gas limit 60k). It creates the
   collection `col:<first 16 chars of the address>:IMPL`.
3. **Create the SCRAP token** (100 XRGE token-creation fee) and **send SCRAP to the contract
   address**. The contract pays rewards from its own balance. If it runs dry the run still
   settles (and the Implant still mints) but no SCRAP moves and the result says
   `scrap_paid:false`, so keep it topped up (the best possible run pays 85 SCRAP).
4. **Point the site at it:** set `NETRUN.contract` in `js/data/site-config.js` to the address
   and deploy the site. Until then the Live tab shows "not deployed yet" and only practice
   works.
5. Collect entry fees with `withdraw` (`{"amount": <quanta>}`, 1 XRGE = 1e9 quanta).

## Testnet deployment

NETRUN is live on RougeChain testnet (`rougechain-devnet-1`) at
`ec10bc50a955d1165a5903a6ab4d0601cf93233c`, and the site's Live tab points there. Switch
Qwalla or RougeChain Wallet to **Testnet** and use the faucet to play. It was deployed from a throwaway
test key with the owner lock set, SCRAP is a testnet token funded with 500,000, and full breaches
through the site have settled on-chain (85 SCRAP + an Implant each).

For mainnet, deploy a fresh build locked to your own key and update `NETRUN` in
`js/data/site-config.js` (contract, `network: 'RougeChain mainnet'`,
`api: 'https://api.rougechain.io/api'`, `explorer: 'https://rougechain.io'`).
