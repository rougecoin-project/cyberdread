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
the music player and the token panel all read from it.

| What | Where |
| --- | --- |
| Bio, handle, tagline, OS version | `SITE` |
| Social / external links | `LINKS` |
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
      rouge-coin.js           token panel
      chat.js                 message board client
      tooltips.js             first-run tour
    web3/
      market.js               DEXScreener client
      wallet.js               EIP-1193 wallet (no dependencies)
      swap.js                 estimates + Uniswap hand-off
netlify/functions/            chat backend (Netlify Blobs)
```

## term.exe

The terminal is a real shell over the site's own content. `help` lists
everything; notable commands:

| Command | Does |
| --- | --- |
| `about`, `whoami` | bio and handle |
| `projects`, `links` | the same data the explorer shows |
| `xrge` | live RougeCoin market data |
| `neofetch` | system summary |
| `theme <name>` | `ice`, `acid`, `magenta`, `amber` |
| `matrix` | digital rain |

Tab completes, Up/Down walks history, Ctrl+L clears.

## Notes on the Web3 parts

- The site **does not execute swaps**. It shows an indicative estimate and
  hands off to Uniswap, which quotes and routes the real trade.
- Market data comes from DEXScreener. When it is unavailable the UI says so —
  it never falls back to generated numbers.
- Wallet support is plain EIP-1193 against the injected provider. There is no
  web3.js or WalletConnect dependency.

### XRGE market data

`TOKENS.XRGE` (`0xA1c7…384b`) is a real ERC-20 on Ethereum mainnet, but as of
the last check DEXScreener indexes **no trading pair** for it, so the market
panel correctly reports "no indexed liquidity pool" rather than a price. Once a
pool exists and is indexed, the panel, the terminal's `xrge` command and the
taskbar ticker will populate with no code change.

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
