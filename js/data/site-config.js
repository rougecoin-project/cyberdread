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
        "I'm a netrunner, and other things: I build on-chain tools, ship weird",
        "web experiments, make browser games, and make music somewhere between",
        "synthwave and trap."
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
    { id: 'itch',      label: 'itch.io',      url: 'https://cyberdreadx.itch.io',         img: 'assets/img/web-icon.png' }
];

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
        name: 'ZionAI',
        url: 'https://zionai.one',
        icon: 'assets/img/zionai-icon.jfif',
        status: 'live',
        blurb: 'AI tooling experiment.'
    },
    {
        name: 'RougeCoin (XRGE)',
        url: 'https://rougecoin.xyz',
        icon: 'assets/img/rougecoin-icon.png',
        status: 'live',
        blurb: 'Community ERC-20 on Base.'
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
