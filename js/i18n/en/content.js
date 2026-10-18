/** Dread_OS strings, area "content" (en). Mirrors en/content.js key for key. */
// The site's data copy, resolved into js/data/site-config.js at load. Keys
// are stable ids (project, repo, link), never array positions.
export default {
    site: {
        tagline: 'netrunner // builder // signal in the noise',
        bio: [
            'I see you made it -- welcome to the liminal surface of dust that falls',
            'from the inner workings of my ICE server, {Dread_OS}.',
            "I'm a netrunner, and other things: a post-quantum L1 (RougeChain,",
            'mainnet live), its encrypted wallet/messenger (Qwalla, on the App',
            "Store), a forum that doesn't shadowban",
            '(AntiReddit), a gen-AI studio (GltchRunner), browser games, and music',
            'somewhere between synthwave and trap.',
            '',
            'Six languages across 33 public repos. This desktop is one of them.',
            'The stuff that pays the bills lives at brandonmenard.dev.'
        ]
    },

    links: {
        lab: 'The Lab'
    },

    chain: {
        tagline: 'Post-quantum from genesis',
        status: 'Mainnet live',
        summary: 'A Layer 1 blockchain built around post-quantum cryptography. Every block and transaction is signed with ML-DSA-65; messages and mail use ML-KEM-768 key exchange. Quantum-safe from genesis, not patched in later.',
        crypto: {
            signatures: 'ML-DSA-65 signatures',
            keyExchange: 'ML-KEM-768 key exchange'
        },
        xrge: {
            native: 'Native XRGE on RougeChain pays fees and gas, is staked to run validators, and powers the on-chain apps.',
            base: 'XRGE on Base (ERC-20) is where it trades today: on Aerodrome, and in the Coinbase app through its DEX trading. Bridge it to RougeChain to stake or use the apps.'
        },
        groups: {
            use: 'Use',
            trade: 'Trade',
            build: 'Build',
            participate: 'Participate'
        },
        eco: {
            webWallet: { name: 'Web Wallet', desc: 'Post-quantum wallet in the browser' },
            qwalla: { desc: 'Mobile wallet, on the App Store' },
            extension: { name: 'Browser extension' },
            messenger: { name: 'Messenger', desc: 'End-to-end encrypted chat' },
            mail: { name: 'Mail', desc: 'On-chain encrypted mail' },
            swap: { name: 'Swap', desc: 'On-chain token swaps' },
            pools: { name: 'Pools', desc: 'Provide liquidity' },
            bridge: { name: 'Bridge', desc: 'ETH, USDC, XRGE from Base; BTC in as qBTC' },
            contracts: { name: 'Smart contracts', desc: 'Deploy WASM contracts' },
            tokens: { name: 'Tokens', desc: 'Launch custom tokens' },
            nfts: { name: 'NFTs', desc: 'RC-721 collections' },
            sdk: { name: 'SDK & docs' },
            agents: { name: 'MCP agents', desc: 'AI-native integration' },
            explorer: { name: 'Explorer', desc: 'Blocks and transactions' },
            validators: { name: 'Validators', desc: 'Stake XRGE, secure the chain' },
            genesis: { name: 'Genesis validators', desc: 'The founding ten operators' },
            node: { name: 'Run a node', desc: 'Node setup guide' },
            source: { name: 'Source', desc: 'Apache 2.0 on GitHub' }
        },
        community: {
            home: 'rougecoin.io / XRGE home',
            docs: 'Docs'
        }
    },

    projects: {
        deadCircuit: 'Field magazine, issue 01: how to survive a robot apocalypse. Read it, or take the PDF.',
        store: 'Games, merch and apps from RougeChain Technologies. Gltch Runner is in Early Access; merch and apps are on the way.',
        jarvis: 'DreadOS AI: a local AI assistant for Windows. Voice, any AI provider or a fully offline model, creator studio and a build workspace. Free download.',
        deadHarvest: 'Post-quantum horror survival. Playable in browser. (beta v0.1)',
        neonDead: 'Pixel zombie cyber waves. Playable in browser.',
        dragonBrawlerZ: 'LITE DBZ in ~700 lines of code. Playable in browser.',
        rougechain: 'Post-quantum Layer 1, mainnet live. ML-DSA-65 signatures, ML-KEM-768 encryption. Wallet, DEX, bridge, contracts, NFTs, encrypted mail.',
        qwalla: 'Post-quantum wallet, messenger and mail for RougeChain. Free on the App Store; APK for Android.',
        antireddit: 'The forum the internet forgot how to be. No shadowbans, public mod logs, self-promo allowed.',
        gltchrunner: 'AI image and video generation with model personas, plus a creator earnings program.',
        xrge: "RougeChain's native token. Trades on Base (Aerodrome, Coinbase); bridge it over to stake or use the apps.",
        rougee: 'A photo network where the account is a key you hold, posts are signed on-chain and images live on IPFS. Testnet.',
        qrougee: 'Streaming where tracks are minted as NFTs. Artists keep their keys; the contract handles royalties.',
        dreadOs: 'This desktop. Vanilla JS, no build step, no framework.',
        netrun: 'Breach protocol on RougeChain: solve the code matrix before the trace hits, earn SCRAP and Implants. Practice is free.'
    },

    // Call-to-action buttons on the project cards and the home Spotlight.
    cta: {
        getIssue: 'Get issue 01',
        preview: 'Read a preview',
        shop: 'Shop now',
        download: 'Download free',
        play: 'Play free',
        jackIn: 'Jack in',
        openChain: 'Open RougeChain',
        wallet: 'Web wallet',
        appStore: 'Get it on iOS',
        website: 'Website',
        join: 'Join the forum',
        create: 'Start creating',
        buy: 'Buy XRGE',
        learn: 'Learn more',
        peek: 'Take a look',
        listen: 'Listen',
        source: 'View source'
    },

    // One-line pitches for the rotating Spotlight on the home screen.
    spotlight: {
        deadCircuit: 'Your field guide to the robot apocalypse. Issue 01 is out.',
        jarvis: 'A local AI assistant for Windows. Free download.',
        netrun: 'Breach the grid and earn SCRAP on RougeChain.',
        qwalla: 'Quantum-safe wallet and messenger, free on iOS.',
        xrge: 'The token that powers RougeChain.',
        store: 'Games, merch and apps from RougeChain.',
        deadHarvest: 'Post-quantum horror survival, right in your browser.',
        antireddit: 'The forum with no shadowbans.',
        gltchrunner: 'AI image and video studio with creator payouts.'
    },

    // GitHub's own repository descriptions (en verbatim).
    repos: {
        jarvisDreados: 'JARVIS / DreadOS AI: a local AI assistant for Windows. Your keys, your models, your machine.',
        rougechainNode: 'RougeChain full node.',
        xrgeNode: 'Run your own post-quantum blockchain node on the RougeChain network.',
        rougechainWallet: 'Post-quantum cryptographic wallet - browser extension.',
        qwalla: 'Qwalla - RougeChain mobile wallet (Expo / React Native).',
        cyberpunkGrokApi: 'Cyberpunk neural interface for AI image, video and character generation - multi-engine, multi-payment, creator-friendly.',
        gltchtrade: 'Paper-trading DEX bot: live on-chain prices via GeckoTerminal, realistic fee + slippage simulation, pluggable strategies.',
        divineEmergence: 'Marketing site for Divine Emergence - breathwork, coaching and retreats in South Florida.'
    },

    netrun: {
        network: 'RougeChain testnet'
    }
};
