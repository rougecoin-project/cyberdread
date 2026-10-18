/** Dread_OS strings, area "term" (en). Mirrors en/term.js key for key. */
export default {
    banner: {
        title: '{os} {version} -- dsh shell',
        connected: 'Connected as {handle}. Type `help` to get started.'
    },
    shell: {
        notFound: 'dsh: command not found: {name}',
        notFoundHint: 'type `help` for the list.',
        failed: 'dsh: {name} failed: {error}'
    },
    // What `help` says about each command. The command names stay English.
    commands: {
        help: 'list available commands',
        about: 'who runs this box',
        whoami: 'print the current user',
        projects: 'list current projects',
        repos: 'selected source repositories',
        links: 'where else to find me',
        chain: 'RougeChain, the post-quantum L1 -- live',
        xrge: 'live XRGE market data (Base)',
        neofetch: 'system summary',
        theme: 'switch accent theme (theme <name>)',
        matrix: 'toggle the digital rain',
        netrun: 'jack in: breach-protocol game, live runs on RougeChain',
        date: 'current system time',
        echo: 'print arguments',
        sudo: 'elevate privileges',
        clear: 'clear the screen',
        exit: 'close the terminal',
        lang: 'show or switch the language (lang <code>)'
    },
    help: {
        heading: 'Available commands:',
        hint: 'Tab completes. Up/Down walks history.'
    },
    projects: {
        // Badges in `projects`; site-config's status ids.
        status: {
            live: 'live',
            wip: 'wip',
            archived: 'archived',
            game: 'game'
        }
    },
    repos: {
        stars: { one: '{n} star', other: '{n} stars' },
        footer: 'Six languages across 33 public repos.'
    },
    chain: {
        querying: 'querying the RougeChain node...',
        chain: 'chain',
        height: 'height',
        heightValue: '{height}  (finalized {finalized})',
        validators: 'validators',
        peers: 'peers',
        burned: 'burned',
        unreachable: 'node unreachable -- the chain may be fine; try the explorer.',
        site: 'site',
        explorer: 'explorer',
        buy: 'buy XRGE',
        coinbase: 'coinbase'
    },
    xrge: {
        querying: 'querying DEXScreener...',
        noPair: 'no indexed liquidity pool for XRGE yet.',
        contract: 'contract: {address}',
        unreachable: 'market data source unreachable.',
        heading: 'XRGE on Base -- RougeChain\'s token',
        price: 'price',
        change: '24h',
        marketCap: 'market cap',
        liquidity: 'liquidity',
        volume: '24h volume',
        venue: 'venue'
    },
    neofetch: {
        os: 'OS',
        shell: 'Shell',
        theme: 'Theme',
        engine: 'Engine',
        screen: 'Screen',
        uptime: 'Uptime',
        uptimeValue: '{n}s'
    },
    theme: {
        current: 'current: {theme}',
        available: 'available: {list}',
        unknown: 'unknown theme "{name}". try: {list}',
        set: 'theme set to {name}'
    },
    matrix: {
        stopped: 'rain stopped.',
        started: 'follow the white rabbit. run `matrix` again to stop.'
    },
    netrun: {
        launching: 'launching netrun.exe…'
    },
    sudo: {
        denied: '{user} is not in the sudoers file. This incident has been reported.'
    },
    lang: {
        current: 'language: {code}  {name}',
        available: 'available:',
        usage: 'switch with `lang <code>`, e.g. `lang {example}`.',
        already: '{name} is already on.',
        switching: 'switching to {name}…',
        unknown: 'unknown language "{code}". try: {list}'
    }
};
