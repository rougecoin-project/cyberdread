# {Dread_OS}

A cyberpunk desktop environment that runs in the browser — the personal site
for [cyberdread](https://www.youtube.com/@cyberdread).

Vanilla HTML, CSS and ES modules. No framework, no build step, no bundler.
Open `index.html` and it runs.

## Running locally

Because the site uses ES modules, it needs to be served over HTTP rather than
opened as a `file://` URL:

```bash
npm run serve        # static only — everything except the chat
```

The chat is backed by Netlify Functions, so to exercise it locally you need
the Netlify CLI:

```bash
npm install
npm run dev          # netlify dev, serves the site + functions on :8888
```

## Updating the content

**Everything that goes stale lives in [`js/data/site-config.js`](js/data/site-config.js).**
Edit that one file and the whole desktop follows — the explorer, the terminal,
the music player and the RougeChain panel all read from it.

| What | Where |
| --- | --- |
| Bio, handle, tagline, OS version | `SITE` |
| Social / external links | `LINKS` |
| RougeChain copy, ecosystem apps, community links, buy link | `ROUGECHAIN` |
| Project tiles (`status`: `live`, `wip`, `archived`) | `PROJECTS` |
| Music player tracks | `PLAYLIST` |
| Token contract addresses | `TOKENS` |

Adding a project is one entry in `PROJECTS`; it appears in the Projects folder
and in the terminal's `projects` command automatically.

## Layout

```
index.html                    markup + inline SVG icon sprite
styles.css                    design tokens (:root) + components
js/
  main.js                     entry point, wires modules to the DOM
  data/site-config.js         ← content lives here
  modules/
    sound.js                  interface sounds (mutable via Settings)
    system.js                 boot / shutdown sequences
    ui/
      common.js               window dragging, Start menu, glitch effects
      window-manager.js       focus stacking, placement, fullscreen
      taskbar.js              clock, window buttons, XRGE ticker
      explorer.js             file explorer, renders from site-config
      terminal.js             term.exe — the dsh shell
      settings.js             themes and display/audio preferences
      music-player.js         playback + spectrum visualizer
      rouge-coin.js           RougeChain panel: live network, ecosystem, XRGE
      chat.js                 message board client
      tooltips.js             first-run tour
    web3/
      rougechain.js           RougeChain node API (height, validators, fees)
      market.js               DEXScreener client
      wallet.js               EIP-1193 wallet (no dependencies)
      swap.js                 estimates + Aerodrome hand-off
netlify/functions/            chat backend + Dead Circuit claim/download
netlify/lib/                  shared code for the functions
dead-circuit/                 Dead Circuit zine: store, reader, gate, PDF
```

## Dead Circuit

`/dead-circuit/` is the storefront for the Dead Circuit zine, issue 01, and
it's also plain HTML and ES modules. Its pages are `/dead-circuit/` (the offer and
countdown), `read/` (a page-flipping reader on desktop and a scrolling zine
on mobile), `thanks/` (Take the file) and `gate/` (the dc@gate puzzle).

Price, deadline, the Stripe Payment Link and the crypto wallets live in
[`dead-circuit/js/offer.js`](dead-circuit/js/offer.js), which the claim
function reads too. Fonts are self-hosted in `dead-circuit/fonts/` (SIL OFL).

### Languages

Every word on the Dead Circuit pages lives in one file per language in
[`dead-circuit/js/i18n/`](dead-circuit/js/i18n/): English (`en.js`, the
source), Spanish, French, Italian, Portuguese (Brazil), Japanese,
Chinese (Simplified) and Arabic (right-to-left). Each page has a language
picker; `?lang=es` links straight to a language, and otherwise the
reader's browser language is used.

- **Editing copy:** change `en.js`, then the same key in the other files.
- **Checking a translation:** `node dead-circuit/js/i18n/check.mjs` confirms
  every file has the same keys, placeholders and fixed values as English.
- **Adding a language:** copy `en.js` to `xx.js`, translate the strings, and
  add it to `LANGS` in `dead-circuit/js/i18n.js`.
- Payment errors from the server are sent as codes (`errors` in each file),
  so they show up in the reader's language too.

### How buyers get the PDF

The PDF comes in **all eight languages**, and buyers get the edition for the
language they are reading the site in. The repo is public, so it holds only
**encrypted** copies (`dead-circuit/sealed/issue-01.<lang>.pdf.enc`,
AES-256-GCM), served as ordinary static files: without the key they are
noise. `dc-download` fetches the buyer's edition, decrypts it with the
`DC_PDF_KEY` environment variable, and streams it, only for a 15-minute
signed link that `dc-claim` issues after it verifies a payment.

All eight editions are rendered from the same spreads by
[`tools/build-dead-circuit-pdfs.mjs`](tools/build-dead-circuit-pdfs.mjs)
through `/dead-circuit/print/?lang=xx`, with their fonts embedded.

| Paid with | Verified by |
| --- | --- |
| Card | Stripe redirects to `thanks/?session_id=…`; the function asks Stripe whether that checkout is paid. |
| ETH / XRGE on Base | Base RPC: the transfer must land in the wallet, succeed, and be worth ~$24. |
| BTC | mempool.space: an output to the wallet, one confirmation. |
| SOL | Solana RPC: the wallet's balance went up by ~$24. |
| dc@gate | The puzzle answer, checked by hash on the server. |

Crypto is valued at today's price with 10% tolerance, must be newer than
`SALE_START`, and every payment is good for 5 downloads.

### One-time setup

1. **Environment variables** (Site configuration → Environment variables),
   then redeploy so they take effect:

   | Name | Value |
   | --- | --- |
   | `DC_PDF_KEY` | The 64-hex-character key the sealed PDF was encrypted with. Keep it out of the repo. |
   | `DC_DOWNLOAD_SECRET` | Any random string of 32+ characters, e.g. `openssl rand -hex 32`. |
   | `STRIPE_SECRET_KEY` | A Stripe restricted key with **Checkout Sessions: Read**. |
   | `STRIPE_PAYMENT_LINK_ID` | Optional. The link's `plink_…` id, so only this link's checkouts count. |
   | `BASE_RPC_URL`, `SOLANA_RPC_URL`, `BTC_API_URL` | Optional. Swap in a paid RPC if the public ones rate-limit. |

2. **Stripe Payment Link** → Edit → *After payment* → *Don't show
   confirmation page* → redirect to
   `https://cyberdreadx.dev/dead-circuit/thanks/?session_id={CHECKOUT_SESSION_ID}`.

### Free preview vs the paid issue

The issue is 39 pages. Only the first six (cover, letter, contents, the
first dispatch, *Ten minutes*, *Seventy-two hours*) are on the site; the
reader ends on a locked page listing the rest, and the mobile zine ends the
same way. `dead-circuit/js/issue.js` holds the page order and the `PREVIEW`
list.

The public language files (`dead-circuit/js/i18n/<lang>.js`) hold only the
site UI and the preview. The paid chapters are **not on the site at all**:
they are committed only as ciphertext, `content/issue-01/<lang>.json.enc`,
sealed with the same `DC_PDF_KEY`. The plain `.json` beside them is
git-ignored.

**Editing the paid chapters, then rebuilding the PDFs:**

```bash
DC_PDF_KEY=<key> node tools/issue-content.mjs open     # .enc -> editable .json
# edit content/issue-01/en.json (and the same keys in the other languages)
node dead-circuit/js/i18n/check.mjs                    # every language mirrors English
DC_PDF_KEY=<key> node tools/issue-content.mjs seal     # .json -> .enc
npx serve . -l 8765 &                                  # any static server on the repo root
DC_PDF_KEY=<key> node tools/build-dead-circuit-pdfs.mjs            # all 8 editions
```

The build needs Playwright, plus Japanese, Chinese and Arabic fonts on the
machine (Noto Sans/Serif JP and SC, Noto Kufi/Naskh Arabic). It serves
print-sized copies of the photos to keep each PDF near 3 MB (Japanese and
Chinese are larger because of their fonts). Plain PDFs land in `dist-pdf/`,
which is git-ignored; commit only `dead-circuit/sealed/` and
`content/issue-01/*.enc`.

## term.exe

The terminal is a real shell over the site's own content. `help` lists
everything; notable commands:

| Command | Does |
| --- | --- |
| `about`, `whoami` | bio and handle |
| `projects`, `links` | the same data the explorer shows |
| `chain` | RougeChain live: height, validators, peers, fees burned, apps |
| `xrge` | live XRGE market data on Base |
| `neofetch` | system summary |
| `theme <name>` | `ice`, `acid`, `magenta`, `amber` |
| `matrix` | digital rain |

Tab completes, Up/Down walks history, Ctrl+L clears.

## Notes on the Web3 parts

- **RougeChain is the centre.** The panel reads live network stats from the
  public node API (`api.rougechain.io/api/stats` and `/validators`, CORS
  open). If the node does not answer, the panel says so and points to the
  explorer rather than showing stale or invented numbers.
- The site **does not execute swaps**. It shows an indicative estimate and
  hands off to Aerodrome (where the XRGE/USDC pool lives) with the pair
  selected. Aerodrome's URL takes no amount, so the visitor enters it there.
- Market data comes from DEXScreener, falling back to GeckoTerminal (see
  below). When neither has data the UI says so — it never falls back to
  generated numbers.
- Wallet support is plain EIP-1193 against the injected provider. There is no
  web3.js or WalletConnect dependency.

### XRGE market data

XRGE lives on **Base** (chain 8453), not Ethereum mainnet:

| | |
| --- | --- |
| Contract | `0x147120faEC9277ec02d957584CFCD92B56A24317` |
| Pool | XRGE/USDC on Aerodrome, `0x059e10d2…c447d` |

DEXScreener is the primary price source; whenever it has no data for the
pool, `market.js` falls back to [GeckoTerminal](https://www.geckoterminal.com/base/pools/0x059e10d26c64a63d04e1814f46305210eddc447d),
which addresses pools directly. The panel labels which source answered.

## Deployment

Netlify, configured by `netlify.toml`. There is no build command — the repo
root is published as-is and `netlify/functions/` is deployed alongside it.

Chat messages are stored in **Netlify Blobs** (store `dreados-chat`), which
requires no configuration on Netlify. The previous implementation wrote to a
JSON file next to the function; lambda filesystems are read-only, so those
writes were silently discarded and the board never persisted in production.

## Browser support

Modern evergreen browsers. The site uses ES modules, `AbortSignal.timeout`,
Pointer Events, `ResizeObserver` and CSS custom properties.
