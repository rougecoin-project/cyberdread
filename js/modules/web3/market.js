/**
 * Market module - live token data from DEXScreener.
 *
 * Deliberately has no "simulated" fallback: if the API is unreachable we say
 * so rather than inventing a price, because a made-up number on a token page
 * is worse than no number at all.
 */
import { TOKENS } from '../../data/site-config.js';

const DEXSCREENER_TOKENS = 'https://api.dexscreener.com/latest/dex/tokens/';

// Short-lived cache so the panel, the taskbar ticker and the swap estimator
// don't each hit the API on every interaction.
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
    NO_PAIR: 'no-pair',       // the API answered, but nothing trades this token
    UNREACHABLE: 'unreachable' // network or API failure
};

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
 * Fetches normalized market data for a token address.
 *
 * Never throws and never invents numbers: callers get a status they can
 * render honestly.
 * @param {string} address - ERC-20 contract address
 * @returns {Promise<{status: string, data: Object|null}>}
 */
export async function fetchTokenMarket(address) {
    const key = address.toLowerCase();
    const cached = cache.get(key);
    if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.result;

    const remember = result => {
        cache.set(key, { at: Date.now(), result });
        return result;
    };

    try {
        const response = await fetch(DEXSCREENER_TOKENS + address, {
            headers: { accept: 'application/json' },
            // Without this the panel can sit on "Loading..." indefinitely.
            signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
        });
        if (!response.ok) throw new Error(`DEXScreener responded ${response.status}`);

        const payload = await response.json();
        const pair = bestPair(payload.pairs);

        // The API answers with pairs: null for a token nothing trades. That
        // is a real, reportable answer -- not an outage.
        if (!pair || !pair.priceUsd) {
            return remember({ status: MarketStatus.NO_PAIR, data: null });
        }

        const data = {
            priceUsd: parseFloat(pair.priceUsd),
            change24h: Number(pair.priceChange?.h24 ?? 0),
            marketCap: Number(pair.marketCap ?? pair.fdv ?? 0),
            liquidityUsd: Number(pair.liquidity?.usd ?? 0),
            volume24h: Number(pair.volume?.h24 ?? 0),
            dex: pair.dexId || 'unknown',
            pairUrl: pair.url || null,
            updatedAt: Date.now()
        };

        return remember({ status: MarketStatus.OK, data });
    } catch (error) {
        console.warn(`Market data unreachable for ${address}:`, error.message);
        return remember({ status: MarketStatus.UNREACHABLE, data: null });
    }
}

/** Convenience wrapper for the site's own token. */
export function fetchXrgeMarket() {
    return fetchTokenMarket(TOKENS.XRGE.address);
}

/**
 * Live ETH price in USD, read off the deepest WETH pair.
 * Replaces the old hardcoded $3000 assumption.
 * @returns {Promise<number|null>}
 */
export async function fetchEthPrice() {
    const { data } = await fetchTokenMarket(TOKENS.WETH.address);
    return data ? data.priceUsd : null;
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
 * @param {number} value
 * @returns {string}
 */
export function formatCompactUsd(value) {
    if (!Number.isFinite(value) || value <= 0) return '--';
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
