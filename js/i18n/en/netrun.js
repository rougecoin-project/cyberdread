/** Dread_OS strings, area "netrun" (en). Mirrors en/netrun.js key for key. */
export default {
    tabs: {
        label: 'Mode',
        practice: 'Practice',
        live: 'Live run',
        top: 'Leaderboard'
    },
    // Network names as wallets report them ('testnet' | 'mainnet').
    net: {
        testnet: 'testnet',
        mainnet: 'mainnet'
    },
    // Shown on the board; the contract does not know these names.
    daemons: ['SIPHON', 'BLACKOUT', 'GHOST KEY'],
    runs: { one: '{n} run', other: '{n} runs' },
    fullBreaches: { one: '{n} full breach', other: '{n} full breaches' },
    runners: { one: '{n} runner', other: '{n} runners' },
    wallet: {
        connect: 'Connect wallet',
        implants: { one: '{n} Implant', other: '{n} Implants' },
        error: 'Wallet: {message}'
    },
    game: {
        matrix: 'CODE MATRIX',
        trace: 'TRACE',
        traceLabel: 'Seconds until the trace completes',
        cell: 'Row {row}, column {col}: {code}',
        cellUsed: ', used',
        uploaded: 'UPLOADED',
        buffer: 'BUFFER',
        daemons: 'DAEMONS',
        paidByContract: 'paid by the contract',
        practice: 'practice',
        implant: 'Upload all three: <b>{implant}</b> Implant NFT',
        undo: 'Undo',
        upload: 'Upload',
        uploadLive: 'Upload to chain',
        abandon: 'Abandon run',
        traceComplete: 'Trace complete. Upload at least one code, or abandon the run.'
    },
    result: {
        verified: 'Verified on RougeChain',
        practiceRun: 'Practice run',
        full: 'FULL BREACH',
        partial: 'PARTIAL BREACH',
        fail: 'TRACE COMPLETE',
        summaryLive: '{n} of 3 daemons uploaded · <b>{scrap} SCRAP</b>',
        summaryPractice: '{n} of 3 daemons uploaded · would pay <b>{scrap} SCRAP</b>',
        implantLive: ' · <b>{implant}</b> Implant',
        implantPractice: ' · would mint <b>{implant}</b> Implant',
        again: 'Jack in again',
        viewTx: 'View transaction',
        newBoard: 'New board'
    },
    top: {
        title: 'LEADERBOARD',
        titleScrap: 'SCRAP LEADERBOARD',
        notLive: 'The leaderboard goes live with the NETRUN contract.',
        reading: 'Reading the chain…',
        you: 'you',
        fullTitle: 'Full breaches',
        empty: 'No SCRAP paid out yet. Be the first on the board.',
        connect: 'Connect a wallet to see your own totals.',
        mine: 'You: <b>{scrap} SCRAP</b> earned · {runs} · {full} · {rank}',
        rank: 'rank <b>#{rank}</b>',
        outside: 'not in the top {top}',
        intro: 'Top runners by SCRAP the NETRUN contract has paid them, kept on-chain by the contract itself. {players} so far.',
        refresh: 'Refresh'
    },
    live: {
        soonTitle: 'LIVE RUNS COMING ONLINE',
        soon: 'Live runs pay out on RougeChain: <b>SCRAP</b> for every daemon you upload and an <b>Implant NFT</b> for a full breach, with every move checked by the NETRUN contract.',
        notDeployed: 'The contract is not deployed yet. Train in practice mode meanwhile.',
        practice: 'Practice',
        walletTitle: 'WALLET REQUIRED',
        walletText: 'Live runs are signed with post-quantum keys. Play in the <b>Qwalla</b> app\'s browser, or on desktop with the <b>RougeChain Wallet</b> extension.',
        openQwalla: 'Open in Qwalla',
        getQwalla: 'Get Qwalla',
        qwallaApp: 'Qwalla app',
        extension: 'RougeChain Wallet extension',
        haveOne: 'I have one, connect',
        jackInTitle: 'JACK IN',
        connectText: 'Connect {wallet} to run live boards.',
        connectQwalla: 'Connect Qwalla',
        connectWallet: 'Connect wallet',
        wrongTitle: 'WRONG NETWORK',
        wrongText: '{wallet} is on <b>{have}</b>, but NETRUN runs on <b>{want}</b>.',
        switchText: 'Switch the network in {wallet}{faucet}, then reconnect.',
        faucet: ' (the testnet faucet gives free XRGE)',
        reconnect: 'Reconnect',
        openingTitle: 'OPENING RUN',
        uploadingTitle: 'UPLOADING',
        transaction: 'Transaction {id}…',
        sealingTitle: 'SEALING THE ICE',
        sealing: 'Run opened at block <b>{height}</b>. Your board is cut from the hash of block <b>{next}</b>, which does not exist yet, so nobody (not even us) can know it in advance.',
        quiet: 'RougeChain makes blocks when there is traffic. Quiet right now?',
        nudge: 'Seal a block (tiny gas fee)',
        expiredTitle: 'RUN EXPIRED',
        expired: 'Your run from block {height} expired unplayed. Open a new one.',
        linkDown: 'LINK DOWN',
        retry: 'Retry',
        ownerTitle: 'AWAITING THE OWNER',
        owner: 'This NETRUN contract is deployed but not switched on yet. Its owner runs setup once, which also creates the Implant NFT collection. The contract only accepts setup from the owner\'s wallet.',
        runSetup: 'I\'m the owner: run setup',
        jackInText: 'Pay <b>{fee} XRGE</b> to open a run. The board comes from the next block\'s hash, you get <b>{seconds}s</b> on the clock, and the contract re-checks every move before it pays.',
        allThree: 'All three',
        implantNft: '+ Implant NFT',
        contract: 'contract',
        fine: 'Skill game: rewards depend only on the moves you make. Not every board can be fully breached. Network fees are extra (up to {gas} XRGE per run).',
        jackIn: 'Jack in · {fee} XRGE'
    },
    // Status lines while a run is opened, uploaded or set up.
    status: {
        unreachable: 'Could not reach RougeChain: {message}',
        approveFee: 'Approve the entry fee in {wallet}…',
        paymentSent: 'Payment sent. Waiting for the block…',
        refused: 'The contract refused the run.',
        sealing: 'Sealing a block…',
        approveUpload: 'Approve the upload in {wallet}…',
        checking: 'Uploading. The contract is checking your moves…',
        rejected: 'The contract rejected the path.',
        switchingTitle: 'SWITCHING ON',
        approveSetup: 'Approve setup in {wallet}…',
        switching: 'Switching the contract on…',
        setupFailed: 'setup failed',
        isLive: 'NETRUN is live. Jack in.',
        notOwner: 'Setup is locked to the owner\'s wallet, and this one is not it.',
        abandoned: 'Run abandoned.'
    },
    // Wallet and node errors, reworded for the player.
    errors: {
        cancelled: 'Cancelled in the wallet.',
        funds: 'Not enough XRGE on {network} for the entry fee plus gas (about {need} XRGE)',
        fundsSeen: ': the node sees {seen} XRGE. If your wallet shows more, it is sending to another network: set its node to {api}.',
        fundsEnd: '.',
        timeout: 'The chain has not confirmed it yet. Reopen netrun.exe in a minute to resume.',
        noWallet: 'Open this page in Qwalla, or install the RougeChain Wallet extension, to play live runs.',
        otherNetwork: 'Your wallet is on a different network. Switch {wallet} to {network} and try again.'
    },
    // Errors raised by netrun-chain.js (node and wallet replies).
    chain: {
        answered: '{path} answered {status}',
        failed: '{method} failed',
        noSignature: 'Qwalla did not return a signature',
        callAnswered: 'contract call answered {status}'
    }
};
