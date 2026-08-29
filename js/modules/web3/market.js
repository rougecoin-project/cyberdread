/**
 * Market module - live token data.
 *
 * DEXScreener is the primary source. It does not currently index the
 * XRGE/USDC pool on Base (thin liquidity, no recent volume), so when it
 * returns nothing we ask GeckoTerminal, which addresses pools directly and
 * does carry it. Whichever answered is reported back to the UI.
 *
 * Deliberately has no "simulated" fallback: if neither source has data we
 * say so rather than inventing a price, because a made-up number on a token
 * page is worse than no number at all.
 */
import { TOKENS, CHAIN, XRGE_POOL } from '../../data/site-config.js';

const DEXSCREENER_TOKENS = 'https://api.dexscreener.com/latest/dex/tokens/';
const GECKOTERMINAL_POOL = 'https://api.geckoterminal.com/api/v2/networks';

// DEXScreener's chain slug for the network we operate on.
const CHAIN_SLUG = 'base';

const CACHE_TTL_MS = 30_000;
const REQUEST_TIMEOUT_MS = 8000;
const cache = new Map();

/**
 * Why market data is missing, so the UI can say something useful instead of
 * a generic error.
 * @enum {string}
 */
export const MarketStatus = {
    OK: 'ok',
    NO_PAIR: 'no-pair',        // both sources answered, nothing trades this token
    UNREACHABLE: 'unreachable' // network or API failure
};

/**
 * Fetches JSON with a timeout, so a hung request cannot leave the panel
 * sitting on "Loading..." forever.
 * @param {string} url
 * @returns {Promise<Object>}
 */
async function getJson(url) {
    const response = await fetch(url, {
        headers: { accept: 'application/json' },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
    });
    if (!response.ok) throw new Error(`${new URL(url).host} responded ${response.status}`);
    return response.json();
}

/**
 * Picks the pair with the deepest liquidity, which is the one whose price
 * actually means something. The old code just took pairs[0].
 * @param {Array} pairs
 * @returns {Object|null}
 */
function bestPair(pairs) {
    if (!Array.isArray(pairs) || pairs.length === 0) return null;
    return pairs.reduce((best, pair) => {
        const liquidity = Number(pair?.liquidity?.usd) || 0;
        const bestLiquidity = Number(best?.liquidity?.usd) || 0;
        return liquidity > bestLiquidity ? pair : best;
    });
}

/**
 * Normalizes a DEXScreener pair.
 * @param {Object} pair
 * @returns {Object}
 */
function fromDexScreener(pair) {
    return {
        priceUsd: parseFloat(pair.priceUsd),
        change24h: Number(pair.priceChange?.h24 ?? 0),
        marketCap: Number(pair.marketCap ?? pair.fdv ?? 0),
        liquidityUsd: Number(pair.liquidity?.usd ?? 0),
        volume24h: Number(pair.volume?.h24 ?? 0),
        dex: pair.dexId || 'unknown',
        pairLabel: pair.baseToken?.symbol && pair.quoteToken?.symbol
            ? `${pair.baseToken.symbol}/${pair.quoteToken.symbol}`
            : null,
        pairUrl: pair.url || null,
        source: 'DEXScreener',
        updatedAt: Date.now()
    };
}

/**
 * Normalizes a GeckoTerminal pool.
 * @param {Object} pool - the `data` object from the pools endpoint
 * @returns {Object}
 */
function fromGeckoTerminal(pool) {
    const attributes = pool.attributes || {};
    return {
        priceUsd: parseFloat(attributes.base_token_price_usd),
        change24h: Number(attributes.price_change_percentage?.h24 ?? 0),
        // market_cap_usd is null until the token is listed on CoinGecko;
        // FDV is the meaningful figure for a token this young.
        marketCap: Number(attributes.market_cap_usd ?? attributes.fdv_usd ?? 0),
        liquidityUsd: Number(attributes.reserve_in_usd ?? 0),
        volume24h: Number(attributes.volume_usd?.h24 ?? 0),
        dex: pool.relationships?.dex?.data?.id || 'base',
        pairLabel: attributes.name || null,
        pairUrl: `https://www.geckoterminal.com/${XRGE_POOL.network}/pools/${attributes.address}`,
        source: 'GeckoTerminal',
        updatedAt: Date.now()
    };
}

/**
 * Fetches normalized market data for a token address.
 *
 * Never throws and never invents numbers: callers get a status they can
 * render honestly.
 * @param {string} address - ERC-20 contract address
 * @param {{poolAddress?: string}} [options] - a known pool to fall back to
 * @returns {Promise<{status: string, data: Object|null}>}
 */
export async function fetchTokenMarket(address, options = {}) {
    const key = address.toLowerCase();
    const cached = cache.get(key);
    if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.result;

    const remember = result => {
        cache.set(key, { at: Date.now(), result });
        return result;
    };

    let reachedASource = false;

    // 1. DEXScreener.
    try {
        const payload = await getJson(DEXSCREENER_TOKENS + address);
        reachedASource = true;
        const pair = bestPair(payload.pairs);
        if (pair?.priceUsd) {
            return remember({ status: MarketStatus.OK, data: fromDexScreener(pair) });
        }
    } catch (error) {
        console.warn(`DEXScreener unavailable for ${address}:`, error.message);
    }

    // 2. GeckoTerminal, for pools DEXScreener has not indexed.
    if (options.poolAddress) {
        try {
            const payload = await getJson(
                `${GECKOTERMINAL_POOL}/${XRGE_POOL.network}/pools/${options.poolAddress}`
            );
            reachedASource = true;
            const pool = payload.data;
            if (pool?.attributes?.base_token_price_usd) {
                return remember({ status: MarketStatus.OK, data: fromGeckoTerminal(pool) });
            }
        } catch (error) {
            console.warn(`GeckoTerminal unavailable for ${address}:`, error.message);
        }
    }

    // A source answered but had nothing: that is a real answer, not an outage.
    return remember({
        status: reachedASource ? MarketStatus.NO_PAIR : MarketStatus.UNREACHABLE,
        data: null
    });
}

/** Convenience wrapper for the site's own token. */
export function fetchXrgeMarket() {
    return fetchTokenMarket(TOKENS.XRGE.address, { poolAddress: XRGE_POOL.address });
}

/**
 * Live ETH price in USD, read off the deepest WETH pair on Base.
 * Replaces the old hardcoded $3000 assumption.
 * @returns {Promise<number|null>}
 */
export async function fetchEthPrice() {
    const { data } = await fetchTokenMarket(TOKENS.WETH.address);
    return data ? data.priceUsd : null;
}

/** @returns {string} the block explorer URL for the XRGE contract */
export function xrgeExplorerUrl() {
    return `${CHAIN.explorer}/token/${TOKENS.XRGE.address}`;
}

/** @returns {string} DEXScreener's page for the token, once it is indexed */
export function xrgeDexScreenerUrl() {
    return `https://dexscreener.com/${CHAIN_SLUG}/${TOKENS.XRGE.address}`;
}

/**
 * Formats a USD price with a sensible number of decimals for its magnitude,
 * so sub-cent tokens and four-figure tokens both read correctly.
 * @param {number} value
 * @returns {string}
 */
export function formatUsd(value) {
    if (!Number.isFinite(value)) return '--';
    if (value === 0) return '$0';
    if (value < 0.000001) return `$${value.toExponential(4)}`;
    if (value < 1) return `$${value.toFixed(8)}`;
    if (value < 1000) return `$${value.toFixed(4)}`;
    return `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
}

/**
 * Formats a large USD figure compactly (e.g. $1.2M).
 *
 * Zero is a real answer -- a pool genuinely can do no volume in 24h -- so it
 * renders as $0. Only a missing or nonsensical figure becomes '--'.
 * @param {number} value
 * @returns {string}
 */
export function formatCompactUsd(value) {
    if (!Number.isFinite(value) || value < 0) return '--';
    if (value === 0) return '$0';
    return `$${value.toLocaleString('en-US', {
        notation: 'compact',
        maximumFractionDigits: 2
    })}`;
}

/**
 * Formats a percentage change with an explicit sign.
 * @param {number} value
 * @returns {string}
 */
export function formatChange(value) {
    if (!Number.isFinite(value)) return '--';
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}
