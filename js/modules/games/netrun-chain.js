/**
 * NETRUN on RougeChain: talks to the NETRUN contract through the public node API (free queries,
 * balances, receipts) and the RougeChain Wallet extension (signing).
 */
import { NETRUN } from '../../data/site-config.js';

const QUANTA_PER_XRGE = 1_000_000_000;

/** The injected RougeChain Wallet, if installed. */
export function wallet() {
    const w = window.rougechain;
    return w && w.isRougeChain ? w : null;
}

/** Waits briefly for the extension, which injects itself after the page starts loading. */
export function whenWalletReady(timeoutMs = 1500) {
    if (wallet()) return Promise.resolve(wallet());
    return new Promise((resolve) => {
        const done = () => resolve(wallet());
        window.addEventListener('rougechain#initialized', done, { once: true });
        setTimeout(done, timeoutMs);
    });
}

export const isConfigured = () => /^[0-9a-f]{40}$/i.test(NETRUN.contract || '');

async function api(path, init) {
    const response = await fetch(`${NETRUN.api}${path}`, { ...init, signal: AbortSignal.timeout(12_000) });
    if (!response.ok) {
        const text = await response.text().catch(() => '');
        const error = new Error(text || `${path} answered ${response.status}`);
        error.status = response.status;
        throw error;
    }
    return response.json();
}

/** The contract's return value, which the node relays either as JSON or as a JSON string. */
function parseReturn(value) {
    if (typeof value !== 'string') return value ?? null;
    try { return JSON.parse(value); } catch { return value; }
}

export async function height() {
    const stats = await api('/stats');
    return Number(stats.network_height);
}

/** Free, read-only contract call. */
export async function query(method, caller, args = {}) {
    const body = { method, args };
    if (caller) body.caller = caller;
    const r = await api(`/contract/${NETRUN.contract}/query`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
    });
    if (!r.success) throw new Error(r.error || `${method} failed`);
    return parseReturn(r.returnData);
}

export const info = () => query('info');
export const board = (player) => query('board', player);

export async function connect() {
    const w = await whenWalletReady();
    if (!w) throw new Error('no-wallet');
    const { publicKey } = await w.connect();
    return publicKey;
}

/**
 * Signs (in the extension's approval view) and submits a contract call.
 * @returns {Promise<{txId: string, fee?: number, preview?: unknown}>}
 */
async function call(method, args, gasLimit, attach) {
    const w = wallet();
    if (!w) throw new Error('no-wallet');
    const payload = { type: 'contract_call', contractAddr: NETRUN.contract, method, args, gasLimit };
    if (attach) payload.attach = attach;
    return w.sendTransaction(payload);
}

export const jackIn = () => call('jack_in', {}, NETRUN.gas.jackIn, {
    symbol: 'XRGE',
    amount: Math.round(NETRUN.entryXrge * QUANTA_PER_XRGE)
});
export const breach = (path) => call('breach', { path }, NETRUN.gas.breach);
export const abandon = () => call('abandon', {}, NETRUN.gas.small);
/** A harmless contract call. Blocks are made only when there is a transaction, so this seals one. */
export const nudge = () => call('info', {}, NETRUN.gas.small);

/** Waits for a transaction's receipt. Resolves {ok, error, height}. */
export async function receipt(txId, { timeoutMs = 90_000 } = {}) {
    const until = Date.now() + timeoutMs;
    while (Date.now() < until) {
        try {
            const r = await api(`/tx/${txId}/receipt`);
            const status = r.receipt?.status;
            if (status === 'Success') return { ok: true, height: r.receipt.block_height };
            if (status && typeof status === 'object') {
                return { ok: false, error: status.Failed || JSON.stringify(status), height: r.receipt.block_height };
            }
        } catch (error) {
            if (error.status !== 404) throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, 1200));
    }
    throw new Error('receipt-timeout');
}

/** XRGE and SCRAP balances, and this game's Implants. */
export async function inventory(player) {
    const [bal, nfts] = await Promise.all([
        api(`/balance/${player}`).catch(() => null),
        api(`/nft/owner/${player}`).catch(() => null)
    ]);
    const prefix = `col:${NETRUN.contract.slice(0, 16)}:IMPL`;
    return {
        xrge: bal?.balance ?? null,
        scrap: bal?.token_balances?.SCRAP ?? 0,
        implants: (nfts?.nfts || []).filter((n) => n.collection_id === prefix)
    };
}

export const explorerTx = (txId) => `${NETRUN.explorer}/tx/${txId}`;
export const explorerContract = () => `${NETRUN.explorer}/contract/${NETRUN.contract}`;
