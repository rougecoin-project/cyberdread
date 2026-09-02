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
        "I'm a netrunner, and other things: a quantum-safe L1 (RougeChain), an",
        "encrypted wallet/messenger (Qwalla), a forum that doesn't shadowban",
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
    { id: 'rougecoin', label: 'rougecoin.xyz', url: 'https://rougecoin.xyz',              img: 'assets/img/web-icon.png' },
    { id: 'rougee',    label: 'rougee.io',    url: 'https://rougee.io',                   img: 'assets/img/signup-icon.png' },
    { id: 'rougechain', label: 'rougechain.io', url: 'https://rougechain.io',             img: 'assets/img/rougechain-icon.png' },
    { id: 'itch',      label: 'itch.io',      url: 'https://cyberdreadx.itch.io',         img: 'assets/img/web-icon.png' },
    { id: 'github',    label: 'GitHub',       url: 'https://github.com/cyberdreadx',      img: 'assets/img/file-icon.png' },
    { id: 'lab',       label: 'The Lab',      url: 'https://brandonmenard.dev/lab',       img: 'assets/img/web-icon.png' }
];

/**
 * RougeChain -- the post-quantum L1. XRGE is the ticker across both the
 * chain and the Base ERC-20, so the RougeCoin panel and the terminal's
 * `chain` command read this to keep the two straight.
 */
export const ROUGECHAIN = {
    name: 'RougeChain',
    url: 'https://rougechain.io',
    tagline: 'Quantum-safe Layer 1',
    // From rougechain.io's own description -- kept verbatim so the site does
    // not drift from the chain's marketing.
    summary: 'Post-quantum Layer 1 secured by NIST-approved ML-DSA-65 (CRYSTALS-Dilithium). Quantum-safe from genesis, not patched in later. XRGE is the native token; the Base ERC-20 is the same token, bridged.',
    features: [
        'Built-in DEX',
        'NFTs',
        'ETH / USDC bridge (in and out)',
        'Encrypted mail & messenger'
    ]
};

/**
 * Projects listed in the explorer and by the terminal's `projects` command.
 * Add new work here -- `status` renders as a badge: live | wip | archived | game.
 */
export const PROJECTS = [
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
        blurb: 'Quantum-safe Layer 1 secured by ML-DSA-65. DEX, NFTs, bridge, encrypted mail.'
    },
    {
        name: 'Qwalla',
        url: 'https://qwalla.io',
        icon: 'assets/img/qwalla-icon.png',
        status: 'live',
        blurb: 'Encrypted wallet, messenger and mail in one app. Value and words down the same private pipe.'
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
        name: 'RougeCoin (XRGE)',
        url: 'https://rougecoin.xyz',
        icon: 'assets/img/rougecoin-icon.png',
        status: 'live',
        blurb: 'XRGE bridged to Base as an ERC-20. Where the token trades today.'
    },
    {
        name: 'Rougee',
        url: 'https://rougee.io',
        icon: 'assets/img/rougecoin-icon.png',
        status: 'live',
        blurb: 'Social layer for the RougeCoin community.'
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
        lang: 'TypeScript',
        stars: 3,
        homepage: 'https://cyberpunk-grok-api.vercel.app'
    },
    {
        name: 'gltchtrade',
        lang: 'Python',
        license: 'MIT'
    },
    {
        name: 'divine_emergence',
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
 * The XRGE/USDC pool on Base, created 2025-10-22.
 *
 * Named explicitly because DEXScreener does not currently index it (the
 * pool is below its liquidity/volume threshold), so market.js falls back to
 * GeckoTerminal, which addresses pools directly.
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
