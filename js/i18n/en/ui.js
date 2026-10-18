/** Dread_OS strings, area "ui" (en): index.html and the desktop shell. Mirrors en/ui.js key for key. */
export default {
    meta: {
        title: 'CyberDread — {Dread_OS}',
        description: '{Dread_OS} — a cyberpunk desktop in your browser. Games, music, a working terminal, and RougeChain, the post-quantum Layer 1 (mainnet live), with live network stats and XRGE market data.'
    },

    // Boot screen (index.html, js/modules/system.js)
    boot: {
        title: 'INITIALIZING {Dread_OS}...',
        start: 'Start System',
        reconnect: 'Reconnect',
        buildDate: 'Build date: {date}',
        hardware: 'Cores: {cores}    Viewport: {viewport}',
        coresUnknown: 'unknown',
        systemCheck: 'System check: OK',
        memoryTest: 'Memory test: PASSED',
        // {os} is the stylised OS name
        steps: [
            'Initializing neural interface...',
            'Connecting to cyberspace...',
            'Loading ICE protocols...',
            'Bypassing security...',
            'Accessing {os}...'
        ]
    },

    // App names: desktop icons, Start menu, taskbar buttons
    apps: {
        files: 'Files',
        music: 'Music',
        settings: 'Settings',
        store: 'Store',
        power: 'Power'
    },

    // Taskbar / dock and the Start menu
    taskbar: {
        start: 'Start',
        startMenu: 'Start menu',
        user: 'netrunner · {Dread_OS}',
        tickerNoPair: 'No indexed liquidity pool for XRGE yet.',
        tickerOffline: 'Market data source unreachable.',
        tickerLive: 'XRGE, RougeChain\'s token, live. Click to open the RougeChain panel.'
    },

    // Status widget (desktop card, phone home screen) and the icon grid
    home: {
        status: 'Status',
        desktop: 'Desktop',
        block: 'Block {height}',
        mainnet: 'RougeChain mainnet',
        // Edit mode (js/modules/ui/touch.js)
        reset: 'Reset',
        done: 'Done',
        editing: 'Editing the home screen. Drag an icon to move it. Done to finish.',
        saved: 'Home screen saved.',
        homeButton: 'Home'
    },

    // First-run tour (js/modules/ui/tooltips.js)
    tour: {
        start: 'Welcome, netrunner! Click "Start" to access the main menu.',
        files: 'Open the "Files" to explore your data.',
        music: 'Check out the "Music" player for some tunes.',
        terminal: 'Open "term.exe" and type help -- the whole site is reachable from the shell.',
        access: 'Use "access.exe" to connect with other chooms.'
    },

    // Shared window chrome
    window: {
        maximize: 'Maximize',
        close: 'Close',
        terminal: 'Terminal',
        terminalInput: 'Terminal input',
        netrun: 'netrun.exe — breach protocol'
    },

    access: {
        label: 'Encrypted access',
        text: 'Encrypted network access detected. Proceed with decryption sequence?',
        decrypt: 'DECRYPT',
        abort: 'ABORT'
    },

    shutdown: {
        label: 'Shut down',
        question: 'Ready to shut down?',
        yes: 'Yes',
        no: 'No',
        screen: 'SHUTTING DOWN...'
    },

    settings: {
        title: 'Settings',
        language: 'Language',
        accent: 'Accent',
        display: 'Display',
        crt: 'CRT scanlines & flicker',
        motion: 'Animations & glitch effects',
        tilt: 'Tilt depth (wallpaper moves as you tilt your phone)',
        tiltChecking: 'Checking the motion sensor…',
        audio: 'Audio',
        sounds: 'Interface sounds',
        note: 'Preferences are stored in this browser only.',
        themes: {
            ice: 'ICE Cyan',
            acid: 'Acid Green',
            magenta: 'Hot Pink',
            amber: 'Amber CRT'
        }
    },

    // GYRO.SYS tilt card, chips and Settings > Tilt depth (js/modules/ui/tilt.js)
    tilt: {
        kickerAsk: '// motion link',
        kickerRefused: '// link refused',
        kickerCalibrating: '// calibrating',
        kickerOnline: '// online',
        askTitle: 'Sync your tilt',
        askText: 'Let the grid follow your hands.',
        sync: 'Sync',
        later: 'Later',
        pausedTitle: 'Tilt paused',
        pausedSetting: 'Tilt depth is off in Settings.',
        pausedReduceMotion: 'Reduce Motion is on in your phone’s settings.',
        pausedAnimations: 'Animations are off in Settings.',
        blockedTitle: 'Motion blocked',
        blockedReopen: 'Reopen the app, then tap Sync in Settings › Tilt depth.',
        blockedIos: 'iOS said no. Reopen the app and try Sync again.',
        calibratingTitle: 'Link up',
        calibratingText: 'Tilt to look around the grid.',
        onlineTitle: 'Depth online ✦',
        onlineText: 'The grid moves with you now.',
        // Chips: the <b> part is lit in the accent colour
        chipRelink: 'TAP TO <b>RELINK GYRO</b>',
        chipOnline: 'GYRO LINK <b>ONLINE</b>',
        chipRefused: 'GYRO LINK <b>REFUSED</b>',
        // Settings > Tilt depth
        statusPaused: 'Paused: {reason}',
        statusDesktop: 'Desktop: the wallpaper follows your mouse.',
        statusNotLinked: 'Not linked. Tap Sync to link your tilt.',
        statusLinked: 'Linked ✦ The grid moves with you.',
        statusWaiting: 'Waiting for the motion sensor…',
        buttonSync: '◉ Sync',
        buttonRecalibrate: '◉ Recalibrate'
    },

    explorer: {
        title: 'Explorer',
        window: 'File explorer',
        back: '← Back',
        folders: {
            about: 'About Me',
            projects: 'Projects',
            repos: 'Repos',
            links: 'Links',
            chat: 'Chat',
            pictures: 'Pictures',
            bin: 'Bin'
        },
        about: {
            title: 'About Me',
            intro: 'I see you made it — welcome to the liminal surface of dust that falls from the inner workings of my ICE server, {Dread_OS}.',
            work: 'I\'m a netrunner, and other things: a post-quantum Layer 1 with mainnet live (<a href="https://rougechain.io" target="_blank" rel="noopener noreferrer">RougeChain</a>), its encrypted wallet and messenger, now on the App Store (<a href="https://qwalla.io" target="_blank" rel="noopener noreferrer">Qwalla</a>), a forum that doesn\'t shadowban (<a href="https://antireddit.com" target="_blank" rel="noopener noreferrer">AntiReddit</a>), a gen-AI studio (<a href="https://gltchrunner.com" target="_blank" rel="noopener noreferrer">GltchRunner</a>), browser games, and music somewhere between synthwave and trap.',
            code: 'Six languages across 33 public repos — the source is on <a href="https://github.com/cyberdreadx" target="_blank" rel="noopener noreferrer">GitHub</a>. The stuff that pays the bills lives at <a href="https://brandonmenard.dev" target="_blank" rel="noopener noreferrer">brandonmenard.dev</a>.',
            tip: 'Tip: open <strong>term.exe</strong> and type <code>help</code> — everything here is reachable from the shell too.'
        },
        projects: {
            title: 'Projects',
            // Badges on the project tiles
            status: {
                live: 'live',
                game: 'game',
                wip: 'wip'
            }
        },
        repos: {
            title: 'Repos',
            intro: 'Six languages across 33 public repos. Selected work:',
            all: 'All repos on GitHub →',
            stars: { one: '{n} star', other: '{n} stars' },
            demo: 'live demo'
        },
        links: {
            title: 'Links'
        },
        chat: {
            title: 'Secret Chat',
            handle: 'Handle',
            handleLabel: 'Your handle',
            message: 'Type a message...',
            messageLabel: 'Message',
            send: 'Send',
            // js/modules/ui/chat.js
            empty: 'No transmissions yet. Say something.',
            offline: 'Channel offline -- could not reach the relay.',
            missing: 'Enter a handle and a message.',
            sending: 'Sending...',
            failed: 'Could not send message.',
            serverStatus: 'Server responded {status}'
        },
        pictures: {
            title: 'Images',
            neon: 'Neon wallpaper',
            desktop: 'Desktop background',
            desktopCaption: 'Previous desktop background',
            cybergirl: 'Cybergirl',
            alternate: 'Alternate background',
            closeViewer: 'Close image'
        },
        bin: {
            text: 'nothing to hack here...',
            hint: '(try <code>sudo</code> in term.exe)'
        }
    },

    music: {
        window: 'Music player',
        title: 'CyberDread Playlist',
        noTrack: 'No track playing',
        blocked: 'Playback blocked -- press play',
        unavailable: 'Track unavailable',
        previous: 'Previous track',
        play: 'Play',
        pause: 'Pause',
        next: 'Next track',
        volume: 'Volume'
    },

    // Static labels of the RougeChain window (runtime text is area "chain")
    rougechain: {
        tagline: 'Post-quantum from genesis · <strong>mainnet live</strong> · native token <strong>XRGE</strong>',
        buy: 'Buy XRGE',
        network: 'Network — live',
        height: 'Block height',
        finalized: 'Finalized',
        validators: 'Validators',
        peers: 'Peers',
        burned: 'Fees burned',
        explorer: 'Open the explorer →',
        layer1: 'Post-quantum Layer 1',
        token: 'XRGE — one token, two networks',
        contract: 'Base contract',
        market: 'Market — XRGE on Base',
        price: 'Price',
        change: '24h',
        cap: 'Market cap',
        liquidity: 'Liquidity',
        volume: '24h volume',
        buyAerodrome: 'Buy XRGE on Aerodrome',
        buyCoinbase: 'Buy XRGE on Coinbase',
        poolChart: 'View the pool chart →',
        basescan: 'View contract on BaseScan →',
        community: 'Community',
        swap: 'Swap',
        walletNone: 'Wallet not connected',
        connect: 'Connect Wallet',
        from: 'From',
        fromToken: 'Input token',
        to: 'To (estimated)',
        toAmount: 'Estimated XRGE received',
        rate: 'Rate',
        impact: 'Est. price impact',
        fee: 'Network fee',
        connectToSwap: 'Connect Wallet to Swap',
        disclaimer: 'Estimates are indicative. XRGE trades on <strong>Base</strong>. The swap opens on Aerodrome with the pair selected; enter the amount there for the final quote.'
    }
};
