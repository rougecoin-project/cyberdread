/**
 * Site configuration - the single source of truth for everything that changes.
 *
 * If information on the site is out of date, edit THIS file. The terminal,
 * explorer, RougeCoin panel and taskbar all read from here, so one edit
 * updates every surface at once.
 *
 * Copy people read (taglines, blurbs, descriptions, labels) lives in the
 * dictionaries -- js/i18n/en/content.js and js/i18n/ru/content.js -- and is
 * resolved here with t('content.…') when this module loads, so every
 * consumer gets it in the visitor's language. Names, URLs and ids stay here.
 */
import { t, list } from '../i18n/i18n.js';

export const SITE = {
    handle: 'cyberdread',
    os: '{Dread_OS}',
    // Bumped by hand on meaningful releases; shown on the boot screen.
    version: '6.0',
    tagline: t('content.site.tagline'),
    bio: list('content.site.bio')
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
    { id: 'lab',       label: t('content.links.lab'), url: 'https://brandonmenard.dev/lab', img: 'assets/img/web-icon.png' }
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
    tagline: t('content.chain.tagline'),
    status: t('content.chain.status'),
    chainId: 'rougechain-mainnet-1',
    // Public node API; CORS is open, so the browser reads it directly.
    api: 'https://api.rougechain.io/api',
    explorer: `${RC}/blockchain`,
    summary: t('content.chain.summary'),
    crypto: [t('content.chain.crypto.signatures'), t('content.chain.crypto.keyExchange')],
    xrge: {
        native: t('content.chain.xrge.native'),
        base: t('content.chain.xrge.base')
    },
    // The chain's apps, grouped the way rougechain.io groups them.
    ecosystem: [
        {
            group: t('content.chain.groups.use'),
            items: [
                { name: t('content.chain.eco.webWallet.name'), desc: t('content.chain.eco.webWallet.desc'), url: `${RC}/wallet` },
                { name: 'Qwalla', desc: t('content.chain.eco.qwalla.desc'), url: 'https://apps.apple.com/us/app/qwalla/id6794071016' },
                { name: t('content.chain.eco.extension.name'), desc: 'Chrome, Edge, Brave, Firefox, Arc, Opera', url: 'https://chromewebstore.google.com/detail/rougechain-wallet/ilkbgjgphhaolfdjkfefdfiifipmhakj' },
                { name: t('content.chain.eco.messenger.name'), desc: t('content.chain.eco.messenger.desc'), url: `${RC}/messenger` },
                { name: t('content.chain.eco.mail.name'), desc: t('content.chain.eco.mail.desc'), url: `${RC}/mail` }
            ]
        },
        {
            group: t('content.chain.groups.trade'),
            items: [
                { name: t('content.chain.eco.swap.name'), desc: t('content.chain.eco.swap.desc'), url: `${RC}/swap` },
                { name: t('content.chain.eco.pools.name'), desc: t('content.chain.eco.pools.desc'), url: `${RC}/pools` },
                { name: t('content.chain.eco.bridge.name'), desc: t('content.chain.eco.bridge.desc'), url: `${RC}/bridge` }
            ]
        },
        {
            group: t('content.chain.groups.build'),
            items: [
                { name: t('content.chain.eco.contracts.name'), desc: t('content.chain.eco.contracts.desc'), url: `${RC}/contracts` },
                { name: t('content.chain.eco.tokens.name'), desc: t('content.chain.eco.tokens.desc'), url: `${RC}/tokens` },
                { name: t('content.chain.eco.nfts.name'), desc: t('content.chain.eco.nfts.desc'), url: `${RC}/nfts` },
                { name: t('content.chain.eco.sdk.name'), desc: '@rougechain/sdk', url: 'https://docs.rougechain.io' },
                { name: t('content.chain.eco.agents.name'), desc: t('content.chain.eco.agents.desc'), url: `${RC}/agents` }
            ]
        },
        {
            group: t('content.chain.groups.participate'),
            items: [
                { name: t('content.chain.eco.explorer.name'), desc: t('content.chain.eco.explorer.desc'), url: `${RC}/blockchain` },
                { name: t('content.chain.eco.validators.name'), desc: t('content.chain.eco.validators.desc'), url: `${RC}/validators` },
                { name: t('content.chain.eco.genesis.name'), desc: t('content.chain.eco.genesis.desc'), url: `${RC}/genesis-validators` },
                { name: t('content.chain.eco.node.name'), desc: t('content.chain.eco.node.desc'), url: 'https://docs.rougechain.io/running-a-node/' },
                { name: t('content.chain.eco.source.name'), desc: t('content.chain.eco.source.desc'), url: 'https://github.com/cyberdreadx/rougechain-node' }
            ]
        }
    ],
    // Where to buy and chart XRGE on Base.
    // Coinbase lists it for DEX trading on Base (the -4317 is the contract's tail).
    coinbaseUrl: 'https://www.coinbase.com/price/base-rougecoin-4317',
    buyUrl: 'https://aerodrome.finance/swap?from=0x833589fcd6edb6e08f4c7c32d4f71b54bda02913&to=0x147120faec9277ec02d957584cfcd92b56a24317&chain0=8453&chain1=8453',
    community: [
        { label: t('content.chain.community.home'), url: 'https://rougecoin.io', icon: 'i-globe' },
        { label: 'Telegram', url: 'https://t.me/rougecoinv3', icon: 'i-telegram' },
        { label: 'YouTube / @rougecoin', url: 'https://www.youtube.com/@rougecoin', icon: 'i-youtube' },
        { label: 'X / @rougecoin', url: 'https://x.com/rougecoin', icon: 'i-globe' },
        { label: t('content.chain.community.docs'), url: 'https://docs.rougechain.io', icon: 'i-globe' },
        { label: 'GitHub', url: 'https://github.com/cyberdreadx/rougechain-node', icon: 'i-globe' }
    ]
};

/**
 * Projects listed in the explorer and by the terminal's `projects` command.
 * Add new work here -- `status` renders as a badge: live | wip | archived | game.
 *
 * `actions` are the call-to-action buttons on the project's card; the first
 * is the main one (filled). Each is a link (`url`) or opens a Dread_OS window
 * (`open`: a window name from main.js, e.g. 'netrun'). `spotlight` puts the
 * project in the rotating Spotlight on the home screen, in that order, with
 * its one-line pitch from content.spotlight.<id>.
 */
const cta = (key, target) => ({ label: t(`content.cta.${key}`), ...target });

export const PROJECTS = [
    {
        id: 'deadCircuit',
        name: 'Dead Circuit',
        url: '/dead-circuit/',
        icon: 'dead-circuit/og.jpg',
        status: 'live',
        blurb: t('content.projects.deadCircuit'),
        actions: [cta('getIssue', { url: '/dead-circuit/' }), cta('preview', { url: '/dead-circuit/read/' })],
        spotlight: 1
    },
    {
        id: 'jarvis',
        name: 'JARVIS',
        url: 'https://cyberdreadx.github.io/jarvis-dreados/',
        icon: 'assets/img/jarvis-icon.svg',
        status: 'live',
        blurb: t('content.projects.jarvis'),
        actions: [cta('download', { url: 'https://cyberdreadx.github.io/jarvis-dreados/' })],
        spotlight: 2
    },
    {
        id: 'netrun',
        name: 'NETRUN',
        url: '/?open=netrun',
        icon: 'assets/img/netrun-icon.svg',
        status: 'game',
        blurb: t('content.projects.netrun'),
        actions: [cta('jackIn', { open: 'netrun' })],
        spotlight: 3
    },
    {
        id: 'store',
        name: 'RougeChain Store',
        url: 'https://store.rougechain.io/',
        icon: 'assets/img/store-icon.svg',
        status: 'live',
        blurb: t('content.projects.store'),
        actions: [cta('shop', { url: 'https://store.rougechain.io/' })],
        spotlight: 6
    },
    {
        id: 'deadHarvest',
        name: 'Dead Harvest',
        url: 'https://cyberdreadx.itch.io/dead-harvest-beta-v01',
        icon: 'assets/img/game-dead-harvest.jpg',
        status: 'game',
        blurb: t('content.projects.deadHarvest'),
        actions: [cta('play', { url: 'https://cyberdreadx.itch.io/dead-harvest-beta-v01' })],
        spotlight: 7
    },
    {
        id: 'neonDead',
        name: 'Neon Dead',
        url: 'https://cyberdreadx.itch.io/neon-dead',
        icon: 'assets/img/game-neon-dead.jpg',
        status: 'game',
        blurb: t('content.projects.neonDead'),
        actions: [cta('play', { url: 'https://cyberdreadx.itch.io/neon-dead' })]
    },
    {
        id: 'dragonBrawlerZ',
        name: 'Dragon Brawler Z',
        url: 'https://cyberdreadx.itch.io/dragon-brawler-z',
        icon: 'assets/img/game-dragon-brawler-z.png',
        status: 'game',
        blurb: t('content.projects.dragonBrawlerZ'),
        actions: [cta('play', { url: 'https://cyberdreadx.itch.io/dragon-brawler-z' })]
    },
    {
        id: 'rougechain',
        name: 'RougeChain',
        url: 'https://rougechain.io',
        icon: 'assets/img/rougechain-icon.png',
        status: 'live',
        blurb: t('content.projects.rougechain'),
        actions: [cta('openChain', { url: 'https://rougechain.io' }), cta('wallet', { url: 'https://rougechain.io/wallet' })]
    },
    {
        id: 'qwalla',
        name: 'Qwalla',
        url: 'https://qwalla.io',
        icon: 'assets/img/qwalla-icon.png',
        status: 'live',
        blurb: t('content.projects.qwalla'),
        actions: [cta('appStore', { url: 'https://apps.apple.com/us/app/qwalla/id6794071016' }), cta('website', { url: 'https://qwalla.io' })],
        spotlight: 4
    },
    {
        id: 'xrge',
        name: 'XRGE',
        url: 'https://rougecoin.io',
        icon: 'assets/img/rougecoin-icon.png',
        status: 'live',
        blurb: t('content.projects.xrge'),
        actions: [cta('buy', { url: 'https://rougechain.io/buy' }), cta('learn', { url: 'https://rougecoin.io' })],
        spotlight: 5
    },
    {
        id: 'antireddit',
        name: 'AntiReddit',
        url: 'https://antireddit.com',
        icon: 'assets/img/antireddit-icon.png',
        status: 'live',
        blurb: t('content.projects.antireddit'),
        actions: [cta('join', { url: 'https://antireddit.com' })],
        spotlight: 8
    },
    {
        id: 'gltchrunner',
        name: 'GltchRunner',
        url: 'https://gltchrunner.com',
        icon: 'assets/img/gltchrunner-icon.png',
        status: 'live',
        blurb: t('content.projects.gltchrunner'),
        actions: [cta('create', { url: 'https://gltchrunner.com' })],
        spotlight: 9
    },
    {
        id: 'rougee',
        name: 'RouGee',
        url: 'https://rougee.app',
        icon: 'assets/img/rougee-icon.png',
        status: 'wip',
        blurb: t('content.projects.rougee'),
        actions: [cta('peek', { url: 'https://rougee.app' })]
    },
    {
        id: 'qrougee',
        name: 'qRougee',
        url: 'https://music.rougee.app',
        icon: 'assets/img/music-icon.png',
        status: 'live',
        blurb: t('content.projects.qrougee'),
        actions: [cta('listen', { url: 'https://music.rougee.app' })]
    },
    {
        id: 'dreadOs',
        name: 'Dread_OS',
        url: 'https://github.com/rougecoin-project/cyberdread',
        icon: 'assets/img/folder-icon.png',
        status: 'live',
        blurb: t('content.projects.dreadOs'),
        actions: [cta('source', { url: 'https://github.com/rougecoin-project/cyberdread' })]
    }
];

/** Projects in the home Spotlight, in order. */
export const SPOTLIGHT = PROJECTS
    .filter((project) => project.spotlight)
    .sort((a, b) => a.spotlight - b.spotlight)
    .map((project) => ({ ...project, pitch: t(`content.spotlight.${project.id}`) }));

/**
 * Source repos, shown in the explorer's Repos folder and by the terminal's
 * `repos` command.
 *
 * `desc` is GitHub's own repository description, copied verbatim into
 * js/i18n/en/content.js (repos.*) and translated in ru/content.js. Repos
 * that have no description on GitHub leave it out rather than inventing
 * one -- the row still shows language, licence and stars.
 */
export const GITHUB_USER = 'cyberdreadx';

export const REPOS = [
    {
        name: 'jarvis-dreados',
        desc: t('content.repos.jarvisDreados'),
        lang: 'Python',
        homepage: 'https://cyberdreadx.github.io/jarvis-dreados/'
    },
    {
        name: 'rougechain-node',
        desc: t('content.repos.rougechainNode'),
        lang: 'TypeScript',
        license: 'Apache-2.0'
    },
    {
        name: 'xrge-node',
        desc: t('content.repos.xrgeNode'),
        lang: 'Rust',
        license: 'MIT'
    },
    {
        name: 'rougechain-wallet',
        desc: t('content.repos.rougechainWallet'),
        lang: 'TypeScript',
        license: 'MIT'
    },
    {
        name: 'Qwalla',
        desc: t('content.repos.qwalla'),
        lang: 'TypeScript'
    },
    {
        name: 'cyberpunk-grok-api',
        desc: t('content.repos.cyberpunkGrokApi'),
        lang: 'TypeScript',
        stars: 3,
        homepage: 'https://grokrunner.gltch.app'
    },
    {
        name: 'gltchtrade',
        desc: t('content.repos.gltchtrade'),
        lang: 'Python',
        license: 'MIT'
    },
    {
        name: 'divine_emergence',
        desc: t('content.repos.divineEmergence'),
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
    // Testnet deployment (switch Qwalla or RougeChain Wallet to Testnet to play). For mainnet, set the
    // mainnet contract, network 'RougeChain mainnet' (content.netrun.network in js/i18n/en|ru/content.js),
    // networkId 'mainnet', api https://api.rougechain.io/api and explorer https://rougechain.io.
    contract: '7c760c6c3ad9d344a6b49dc63ca6d0ea92f28a3a',
    network: t('content.netrun.network'),
    networkId: 'testnet', // as wallets name it: 'mainnet' | 'testnet'
    api: 'https://testnet.rougechain.io/api',
    // Block explorer for tx/contract links; empty links to the node's raw JSON instead.
    explorer: '',
    entryXrge: 0.1,
    // Fallback gas limits (fee = gas limit × 0.000001 XRGE). The page previews each call and signs
    // for what it needs + 25% (jack_in ~29k, breach ~56k; a player's first paying breach ~65-70k
    // because it records their address for the leaderboard).
    gas: { jackIn: 40_000, breach: 80_000, small: 30_000 },
    // How long a board is on screen before the trace completes. The chain does not enforce it.
    traceSeconds: 90
};
