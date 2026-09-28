/**
 * Site configuration - the single source of truth for everything that changes.
 *
 * If information on the site is out of date, edit THIS file. The terminal,
 * explorer, RougeCoin panel and taskbar all read from here, so one edit
 * updates every surface at once.
 */

export const SITE = {
    handle: 'cyberdread',
    os: '{Dread_OS}',
    // Bumped by hand on meaningful releases; shown on the boot screen.
    version: '6.0',
    tagline: 'netrunner // builder // signal in the noise',
    bio: [
        "I see you made it -- welcome to the liminal surface of dust that falls",
        "from the inner workings of my ICE server, {Dread_OS}.",
        "I'm a netrunner, and other things: a post-quantum L1 (RougeChain,",
        "mainnet live), its encrypted wallet/messenger (Qwalla, on the App",
        "Store), a forum that doesn't shadowban",
        "(AntiReddit), a gen-AI studio (GltchRunner), browser games, and music",
        "somewhere between synthwave and trap.",
        "",
        "Six languages across 33 public repos. This desktop is one of them.",
        "The stuff that pays the bills lives at brandonmenard.dev."
    ]
};

/**
 * Links surfaced in the explorer, the terminal (`links`) and the RougeCoin panel.
 */
export const LINKS = [
    { id: 'youtube',   label: 'YouTube',      url: 'https://www.youtube.com/@cyberdread', img: 'assets/img/youtube-icon.png' },
    { id: 'telegram',  label: 'Telegram',     url: 'https://t.me/rougecoinv3',            img: 'assets/img/telegram-icon.png' },
    { id: 'rougechain', label: 'rougechain.io', url: 'https://rougechain.io',             img: 'assets/img/rougechain-icon.png' },
    { id: 'rougecoin', label: 'rougecoin.io',  url: 'https://rougecoin.io',               img: 'assets/img/rougecoin-icon.png' },
    { id: 'qwalla',    label: 'Qwalla (iOS)', url: 'https://apps.apple.com/us/app/qwalla/id6794071016', img: 'assets/img/qwalla-icon.png' },
    { id: 'rougee',    label: 'rougee.app',   url: 'https://rougee.app',                  img: 'assets/img/rougee-icon.png' },
    { id: 'x',         label: 'X / @rougecoin', url: 'https://x.com/rougecoin',           img: 'assets/img/web-icon.png' },
    { id: 'itch',      label: 'itch.io',      url: 'https://cyberdreadx.itch.io',         img: 'assets/img/web-icon.png' },
    { id: 'github',    label: 'GitHub',       url: 'https://github.com/cyberdreadx',      img: 'assets/img/file-icon.png' },
    { id: 'lab',       label: 'The Lab',      url: 'https://brandonmenard.dev/lab',       img: 'assets/img/web-icon.png' }
];

/**
 * RougeChain -- the post-quantum L1, and the centre of everything here.
 * XRGE is its native token; the same token also trades on Base as an
 * ERC-20. The RougeChain panel, the terminal's `chain` command and the
 * explorer all read this.
 *
 * Wording and links follow rougechain.io itself so the site does not drift
 * from the chain. Check there when something changes.
 */
const RC = 'https://rougechain.io';

export const ROUGECHAIN = {
    name: 'RougeChain',
    url: RC,
    tagline: 'Post-quantum from genesis',
    status: 'Mainnet live',
    chainId: 'rougechain-mainnet-1',
    // Public node API; CORS is open, so the browser reads it directly.
    api: 'https://api.rougechain.io/api',
    explorer: `${RC}/blockchain`,
    summary: 'A Layer 1 blockchain built around post-quantum cryptography. Every block and transaction is signed with ML-DSA-65; messages and mail use ML-KEM-768 key exchange. Quantum-safe from genesis, not patched in later.',
    crypto: ['ML-DSA-65 signatures', 'ML-KEM-768 key exchange'],
    xrge: {
        native: 'Native XRGE on RougeChain pays fees and gas, is staked to run validators, and powers the on-chain apps.',
        base: 'XRGE on Base (ERC-20) is where it trades today: on Aerodrome, and in the Coinbase app through its DEX trading. Bridge it to RougeChain to stake or use the apps.'
    },
    // The chain's apps, grouped the way rougechain.io groups them.
    ecosystem: [
        {
            group: 'Use',
            items: [
                { name: 'Web Wallet', desc: 'Post-quantum wallet in the browser', url: `${RC}/wallet` },
                { name: 'Qwalla', desc: 'Mobile wallet, on the App Store', url: 'https://apps.apple.com/us/app/qwalla/id6794071016' },
                { name: 'Browser extension', desc: 'Chrome, Edge, Brave, Firefox, Arc, Opera', url: 'https://chromewebstore.google.com/detail/rougechain-wallet/ilkbgjgphhaolfdjkfefdfiifipmhakj' },
                { name: 'Messenger', desc: 'End-to-end encrypted chat', url: `${RC}/messenger` },
                { name: 'Mail', desc: 'On-chain encrypted mail', url: `${RC}/mail` }
            ]
        },
        {
            group: 'Trade',
            items: [
                { name: 'Swap', desc: 'On-chain token swaps', url: `${RC}/swap` },
                { name: 'Pools', desc: 'Provide liquidity', url: `${RC}/pools` },
                { name: 'Bridge', desc: 'ETH, USDC, XRGE from Base; BTC in as qBTC', url: `${RC}/bridge` }
            ]
        },
        {
            group: 'Build',
            items: [
                { name: 'Smart contracts', desc: 'Deploy WASM contracts', url: `${RC}/contracts` },
                { name: 'Tokens', desc: 'Launch custom tokens', url: `${RC}/tokens` },
                { name: 'NFTs', desc: 'RC-721 collections', url: `${RC}/nfts` },
                { name: 'SDK & docs', desc: '@rougechain/sdk', url: 'https://docs.rougechain.io' },
                { name: 'MCP agents', desc: 'AI-native integration', url: `${RC}/agents` }
            ]
        },
        {
            group: 'Participate',
            items: [
                { name: 'Explorer', desc: 'Blocks and transactions', url: `${RC}/blockchain` },
                { name: 'Validators', desc: 'Stake XRGE, secure the chain', url: `${RC}/validators` },
                { name: 'Genesis validators', desc: 'The founding ten operators', url: `${RC}/genesis-validators` },
                { name: 'Run a node', desc: 'Node setup guide', url: 'https://docs.rougechain.io/running-a-node/' },
                { name: 'Source', desc: 'Apache 2.0 on GitHub', url: 'https://github.com/cyberdreadx/rougechain-node' }
            ]
        }
    ],
    // Where to buy and chart XRGE on Base.
    // Coinbase lists it for DEX trading on Base (the -4317 is the contract's tail).
    coinbaseUrl: 'https://www.coinbase.com/price/base-rougecoin-4317',
    buyUrl: 'https://aerodrome.finance/swap?from=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913&to=0x147120faec9277ec02d957584cfcd92b56a24317&chain0=8453&chain1=8453',
    community: [
        { label: 'rougecoin.io / XRGE home', url: 'https://rougecoin.io', icon: 'i-globe' },
        { label: 'Telegram', url: 'https://t.me/rougecoinv3', icon: 'i-telegram' },
        { label: 'YouTube / @rougecoin', url: 'https://www.youtube.com/@rougecoin', icon: 'i-youtube' },
        { label: 'X / @rougecoin', url: 'https://x.com/rougecoin', icon: 'i-globe' },
        { label: 'Docs', url: 'https://docs.rougechain.io', icon: 'i-globe' },
        { label: 'GitHub', url: 'https://github.com/cyberdreadx/rougechain-node', icon: 'i-globe' }
    ]
};

/**
 * Projects listed in the explorer and by the terminal's `projects` command.
 * Add new work here -- `status` renders as a badge: live | wip | archived | game.
 */
export const PROJECTS = [
    {
        name: 'Dead Circuit',
        url: '/dead-circuit/',
        icon: 'dead-circuit/og.jpg',
        status: 'live',
        blurb: 'Field magazine, issue 01: how to survive a robot apocalypse. Read it, or take the PDF.'
    },
    {
        name: 'Dead Harvest',
        url: 'https://cyberdreadx.itch.io/dead-harvest-beta-v01',
        icon: 'assets/img/game-dead-harvest.jpg',
        status: 'game',
        blurb: 'Post-quantum horror survival. Playable in browser. (beta v0.1)'
    },
    {
        name: 'Neon Dead',
        url: 'https://cyberdreadx.itch.io/neon-dead',
        icon: 'assets/img/game-neon-dead.jpg',
        status: 'game',
        blurb: 'Pixel zombie cyber waves. Playable in browser.'
    },
    {
        name: 'Dragon Brawler Z',
        url: 'https://cyberdreadx.itch.io/dragon-brawler-z',
        icon: 'assets/img/game-dragon-brawler-z.png',
        status: 'game',
        blurb: 'LITE DBZ in ~700 lines of code. Playable in browser.'
    },
    {
        name: 'RougeChain',
        url: 'https://rougechain.io',
        icon: 'assets/img/rougechain-icon.png',
        status: 'live',
        blurb: 'Post-quantum Layer 1, mainnet live. ML-DSA-65 signatures, ML-KEM-768 encryption. Wallet, DEX, bridge, contracts, NFTs, encrypted mail.'
    },
    {
        name: 'Qwalla',
        url: 'https://qwalla.io',
        icon: 'assets/img/qwalla-icon.png',
        status: 'live',
        blurb: 'Post-quantum wallet, messenger and mail for RougeChain. Free on the App Store; APK for Android.'
    },
    {
        name: 'AntiReddit',
        url: 'https://antireddit.com',
        icon: 'assets/img/antireddit-icon.png',
        status: 'live',
        blurb: 'The forum the internet forgot how to be. No shadowbans, public mod logs, self-promo allowed.'
    },
    {
        name: 'GltchRunner',
        url: 'https://gltchrunner.com',
        icon: 'assets/img/gltchrunner-icon.png',
        status: 'live',
        blurb: 'AI image and video generation with model personas, plus a creator earnings program.'
    },
    {
        name: 'XRGE',
        url: 'https://rougecoin.io',
        icon: 'assets/img/rougecoin-icon.png',
        status: 'live',
        blurb: 'RougeChain\'s native token. Trades on Base (Aerodrome, Coinbase); bridge it over to stake or use the apps.'
    },
    {
        name: 'RouGee',
        url: 'https://rougee.app',
        icon: 'assets/img/rougee-icon.png',
        status: 'wip',
        blurb: 'A photo network where the account is a key you hold, posts are signed on-chain and images live on IPFS. Testnet.'
    },
    {
        name: 'qRougee',
        url: 'https://music.rougee.app',
        icon: 'assets/img/music-icon.png',
        status: 'live',
        blurb: 'Streaming where tracks are minted as NFTs. Artists keep their keys; the contract handles royalties.'
    },
    {
        name: 'Dread_OS',
        url: 'https://github.com/rougecoin-project/cyberdread',
        icon: 'assets/img/folder-icon.png',
        status: 'live',
        blurb: 'This desktop. Vanilla JS, no build step, no framework.'
    }
];

/**
 * Source repos, shown in the explorer's Repos folder and by the terminal's
 * `repos` command.
 *
 * `desc` is GitHub's own repository description, copied verbatim. Repos
 * that have no description on GitHub leave it out rather than inventing
 * one -- the row still shows language, licence and stars.
 */
export const GITHUB_USER = 'cyberdreadx';

export const REPOS = [
    {
        name: 'rougechain-node',
        desc: 'RougeChain full node.',
        lang: 'TypeScript',
        license: 'Apache-2.0'
    },
    {
        name: 'xrge-node',
        desc: 'Run your own post-quantum blockchain node on the RougeChain network.',
        lang: 'Rust',
        license: 'MIT'
    },
    {
        name: 'rougechain-wallet',
        desc: 'Post-quantum cryptographic wallet - browser extension.',
        lang: 'TypeScript',
        license: 'MIT'
    },
    {
        name: 'Qwalla',
        desc: 'Qwalla - RougeChain mobile wallet (Expo / React Native).',
        lang: 'TypeScript'
    },
    {
        name: 'cyberpunk-grok-api',
        desc: 'Cyberpunk neural interface for AI image, video and character generation - multi-engine, multi-payment, creator-friendly.',
        lang: 'TypeScript',
        stars: 3,
        homepage: 'https://grokrunner.gltch.app'
    },
    {
        name: 'gltchtrade',
        desc: 'Paper-trading DEX bot: live on-chain prices via GeckoTerminal, realistic fee + slippage simulation, pluggable strategies.',
        lang: 'Python',
        license: 'MIT'
    },
    {
        name: 'divine_emergence',
        desc: 'Marketing site for Divine Emergence - breathwork, coaching and retreats in South Florida.',
        lang: 'TypeScript'
    }
];

/**
 * Music player playlist. `src` is relative to the site root.
 */
export const PLAYLIST = [
    { title: 'Cyberpunk Nights', artist: 'CyberDread', src: 'assets/music/track1.mp3' },
    { title: 'Neon Streets',     artist: 'CyberDread', src: 'assets/music/track2.mp3' },
    { title: 'Digital Dreams',   artist: 'CyberDread', src: 'assets/music/track3.mp3' },
    { title: 'AI Trappin',       artist: 'CyberDread', src: 'assets/music/track4.mp3' }
];

/**
 * Base network token addresses used by the wallet and swap modules.
 *
 * XRGE lives on Base, not Ethereum mainnet. The site previously pointed at
 * 0xA1c7D450130bb77c6a23DdFAeCbC4a060215384b on mainnet, which is a real
 * XRGE contract but not the one with the live pool.
 *
 * All addresses below were verified on-chain against Base
 * (symbol() and decimals() via https://mainnet.base.org).
 */
export const TOKENS = {
    ETH:  { symbol: 'ETH',  address: 'ETH', decimals: 18 },
    WETH: { symbol: 'WETH', address: '0x4200000000000000000000000000000000000006', decimals: 18 },
    USDC: { symbol: 'USDC', address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', decimals: 6 },
    USDT: { symbol: 'USDT', address: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2', decimals: 6 },
    XRGE: { symbol: 'XRGE', address: '0x147120faEC9277ec02d957584CFCD92B56A24317', decimals: 18 }
};

/**
 * The XRGE/USDC pool on Aerodrome (Base), created 2025-10-22.
 *
 * Named explicitly so market.js can fall back to GeckoTerminal, which
 * addresses pools directly, whenever DEXScreener has no data for it.
 */
export const XRGE_POOL = {
    network: 'base',
    address: '0x059e10d26c64a63d04e1814f46305210eddc447d',
    pair: 'XRGE/USDC'
};

export const CHAIN = {
    id: 8453,
    hexId: '0x2105',
    name: 'Base',
    explorer: 'https://basescan.org',
    // Used when a wallet does not have Base configured yet.
    rpcUrls: ['https://mainnet.base.org'],
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 }
};

/**
 * NETRUN — the breach-protocol game in netrun.exe (contract source: netrun/contract).
 *
 * Paste the contract address here after deploying it (see netrun/README.md). Until then the game
 * runs practice boards only. The page talks to `api` for free queries and to the RougeChain Wallet
 * extension for signing; set both to the testnet to try a testnet deployment.
 */
export const NETRUN = {
    // Testnet deployment (switch RougeChain Wallet to Testnet to play). For mainnet, set the
    // mainnet contract, network 'RougeChain mainnet', api https://api.rougechain.io/api and
    // explorer https://rougechain.io.
    contract: 'ec10bc50a955d1165a5903a6ab4d0601cf93233c',
    network: 'RougeChain testnet',
    api: 'https://testnet.rougechain.io/api',
    // Block explorer for tx/contract links; empty links to the node's raw JSON instead.
    explorer: '',
    entryXrge: 0.1,
    // Gas limits (fee = gas limit × 0.000001 XRGE). Measured: jack_in ~22k, breach ~42k.
    gas: { jackIn: 40_000, breach: 80_000, small: 30_000 },
    // How long a board is on screen before the trace completes. The chain does not enforce it.
    traceSeconds: 90
};
