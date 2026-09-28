/**
 * NETRUN on RougeChain: talks to the NETRUN contract through the public node API (free queries,
 * balances, receipts) and the RougeChain Wallet extension (signing).
 */
import { NETRUN } from '../../data/site-config.js';

const QUANTA_PER_XRGE = 1_000_000_000;

/** The injected `window.rougechain` provider: RougeChain Wallet extension or Qwalla's dApp browser. */
export function wallet() {
    const w = window.rougechain;
    return w && w.isRougeChain ? w : null;
}

/**
 * Which wallet injected the provider. Qwalla (iOS, Android and desktop) runs pages in a WebView
 * that exposes `window.ReactNativeWebView`; the extension doesn't.
 * @returns {'qwalla' | 'extension' | null}
 */
export function walletKind() {
    if (!wallet()) return null;
    return window.ReactNativeWebView ? 'qwalla' : 'extension';
}

export const walletName = () => (walletKind() === 'qwalla' ? 'Qwalla' : 'RougeChain Wallet');

/** Opens this page inside Qwalla's dApp browser (for phones that land here in Safari/Chrome). */
export const qwallaLink = () => `qwalla://browser?url=${encodeURIComponent(location.href)}`;

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

/** Network the wallet reports (Qwalla does; the extension doesn't say), e.g. 'testnet'. */
let walletNetwork = null;
let walletKey = null;
export const connectedNetwork = () => walletNetwork;

export async function connect() {
    const w = await whenWalletReady();
    if (!w) throw new Error('no-wallet');
    const result = await w.connect();
    walletKey = result.publicKey;
    walletNetwork = result.network || null;
    if (!walletNetwork && typeof w.getNetwork === 'function') {
        walletNetwork = await w.getNetwork().then((n) => n?.network || null).catch(() => null);
    }
    return result.publicKey;
}

/** True when the wallet says it is on a different network than the NETRUN contract. */
export const wrongNetwork = () => Boolean(walletNetwork && NETRUN.networkId && walletNetwork !== NETRUN.networkId);

/* Qwalla's sendTransaction only makes transfers, so contract calls are built here, signed with
   its signTransaction (ML-DSA-65 over the key-sorted JSON, as the SDK does) and submitted to the
   node directly. */

const sortKeysDeep = (v) => (Array.isArray(v) ? v.map(sortKeysDeep)
    : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, sortKeysDeep(v[k])])) : v);

async function qwallaCall(w, payload) {
    const full = {
        ...payload,
        from: walletKey || await w.connect().then((r) => r.publicKey),
        args: payload.args ?? {},
        timestamp: Date.now(),
        nonce: Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, '0')).join('')
    };
    const json = JSON.stringify(sortKeysDeep(full));
    const { signature } = await w.signTransaction({ payload: full });
    if (!signature) throw new Error('Qwalla did not return a signature');
    const bytesHex = Array.from(new TextEncoder().encode(json), (b) => b.toString(16).padStart(2, '0')).join('');
    const response = await fetch(`${NETRUN.api}/v2/contract/execute`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ payload: full, signature, public_key: full.from, payload_bytes_hex: bytesHex }),
        signal: AbortSignal.timeout(20_000)
    });
    const r = await response.json().catch(() => ({}));
    if (!response.ok || r.success === false || !r.txId) throw new Error(r.error || `contract call answered ${response.status}`);
    return { txId: r.txId, fee: r.fee, preview: r.preview };
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
    if (walletKind() === 'qwalla') return qwallaCall(w, payload);
    return w.sendTransaction(payload);
}

export const jackIn = () => call('jack_in', {}, NETRUN.gas.jackIn, {
    symbol: 'XRGE',
    amount: Math.round(NETRUN.entryXrge * QUANTA_PER_XRGE)
});
export const breach = (path) => call('breach', { path }, NETRUN.gas.breach);
export const abandon = () => call('abandon', {}, NETRUN.gas.small);
/** Owner-only, once: switches the contract on and creates the Implant collection. */
export const setup = () => call('setup', {}, 60_000);
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
            // 404 = not mined yet. Network hiccups are retried too: the tx is already submitted.
            if (error.status && error.status !== 404) throw error;
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
        scrap: bal ? (bal.token_balances?.SCRAP ?? 0) : null,
        // null when the lookup failed, so the page doesn't claim "0 Implants".
        implants: nfts ? (nfts.nfts || []).filter((n) => n.collection_id === prefix) : null
    };
}

export const explorerTx = (txId) => (NETRUN.explorer ? `${NETRUN.explorer}/tx/${txId}` : `${NETRUN.api}/tx/${txId}/receipt`);
export const explorerContract = () => (NETRUN.explorer ? `${NETRUN.explorer}/contract/${NETRUN.contract}` : `${NETRUN.api}/contract/${NETRUN.contract}`);
