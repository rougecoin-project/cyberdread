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
        "web experiments, and make music somewhere between synthwave and trap."
    ]
};

/**
 * Links surfaced in the explorer, the terminal (`links`) and the RougeCoin panel.
 */
export const LINKS = [
    { id: 'youtube',   label: 'YouTube',      url: 'https://www.youtube.com/@cyberdread', img: 'assets/img/youtube-icon.png' },
    { id: 'telegram',  label: 'Telegram',     url: 'https://t.me/rougecoinv3',            img: 'assets/img/telegram-icon.png' },
    { id: 'rougecoin', label: 'rougecoin.xyz', url: 'https://rougecoin.xyz',              img: 'assets/img/web-icon.png' },
    { id: 'rougee',    label: 'rougee.io',    url: 'https://rougee.io',                   img: 'assets/img/signup-icon.png' }
];

/**
 * Projects listed in the explorer and by the terminal's `projects` command.
 * Add new work here -- `status` renders as a badge: live | wip | archived.
 */
export const PROJECTS = [
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
        blurb: 'Community ERC-20 on Ethereum mainnet.'
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
 * Ethereum mainnet token addresses used by the wallet and swap modules.
 */
export const TOKENS = {
    ETH:  { symbol: 'ETH',  address: 'ETH', decimals: 18 },
    WETH: { symbol: 'WETH', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', decimals: 18 },
    USDT: { symbol: 'USDT', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6 },
    USDC: { symbol: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6 },
    XRGE: { symbol: 'XRGE', address: '0xA1c7D450130bb77c6a23DdFAeCbC4a060215384b', decimals: 18 }
};

export const CHAIN = {
    id: 1,
    hexId: '0x1',
    name: 'Ethereum Mainnet'
};
