/**
 * RougeChain network status, read live from the public node API.
 *
 * The API sends `Access-Control-Allow-Origin: *`, so the browser queries it
 * directly. When it is unreachable the caller says so; nothing is invented.
 */
import { ROUGECHAIN } from '../../data/site-config.js';

const TIMEOUT_MS = 8000;
const CACHE_MS = 15_000;

let cache = { at: 0, value: null };

async function get(path) {
    const response = await fetch(`${ROUGECHAIN.api}${path}`, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!response.ok) throw new Error(`${path} answered ${response.status}`);
    return response.json();
}

/**
 * @returns {Promise<{height: number, finalized: number, peers: number,
 *   validators: number|null, feesBurned: number, baseFee: number,
 *   chainId: string} | null>} null when the node cannot be reached
 */
export async function fetchChainStatus() {
    if (cache.value && Date.now() - cache.at < CACHE_MS) return cache.value;
    try {
        const [stats, validators] = await Promise.all([
            get('/stats'),
            get('/validators').catch(() => null)
        ]);
        const value = {
            height: Number(stats.network_height),
            finalized: Number(stats.finalized_height),
            peers: Number(stats.connected_peers),
            validators: Array.isArray(validators?.validators) ? validators.validators.length : null,
            feesBurned: Number(stats.total_fees_burned),
            baseFee: Number(stats.base_fee),
            chainId: String(stats.chain_id || ROUGECHAIN.chainId)
        };
        cache = { at: Date.now(), value };
        return value;
    } catch (error) {
        console.warn('RougeChain status unavailable:', error);
        return null;
    }
}

export const formatInt = (n) => (Number.isFinite(n) ? n.toLocaleString('en-US') : '--');

export const formatXrge = (n) => (Number.isFinite(n)
    ? `${n.toLocaleString('en-US', { maximumFractionDigits: n < 1 ? 4 : 2 })} XRGE`
    : '--');
