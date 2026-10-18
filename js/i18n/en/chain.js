/** Dread_OS strings, area "chain" (en). Mirrors en/chain.js key for key. */
// What the RougeChain window, wallet and swap write at runtime.
export default {
    network: {
        updated: '{chain} - updated {time}',
        unreachable: 'The public node did not answer. That does not mean the chain is down; try the explorer.'
    },
    market: {
        loading: 'Loading...',
        noPair: 'No price data for the {pair} pool on {chain} yet.',
        unreachable: 'Market data sources unreachable. Retrying shortly.',
        updated: '{pair} - on {dex} - via {source} - updated {time}'
    },
    contract: {
        copied: 'copied'
    },
    wallet: {
        notConnected: 'Wallet not connected',
        connect: 'Connect Wallet',
        connected: 'Connected',
        noWallet: 'No wallet detected. Install MetaMask, Rabby or another EIP-1193 wallet.',
        rejected: 'Connection rejected.',
        addChainFailed: 'Could not add {chain} to your wallet.',
        failed: 'Failed to connect wallet. Please try again.',
        loadingBalances: 'Loading balances...',
        unavailable: 'unavailable'
    },
    swap: {
        connectToSwap: 'Connect Wallet to Swap',
        onAerodrome: 'Swap on Aerodrome',
        fetchingRate: 'Fetching rate...',
        noPool: 'No liquidity pool indexed',
        rateUnavailable: 'Rate unavailable',
        rate: '1 {symbol} ~ {amount} XRGE',
        impactUnknown: 'unknown',
        fee: 'quoted by Aerodrome'
    }
};
