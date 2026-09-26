/**
 * Payment verification for Dead Circuit. Every verifier resolves to either
 *   { ok: true, ref, usd, paidAt }        -- paid, and enough
 *   { ok: false, pending?, message }      -- not (yet) acceptable
 * `ref` uniquely names the payment; the claim function counts downloads by it.
 *
 * Crypto amounts are valued at today's price with a 10% tolerance, so a buyer
 * who sent the right amount at the time is not rejected over a small move.
 */
import { DEADLINE, FULL_PRICE_USD, PRICE_USD, SALE_START, WALLETS } from '../../../dead-circuit/js/offer.js';

export const TOLERANCE = 0.9;

const XRGE_TOKEN = '0x147120faec9277ec02d957584cfcd92b56a24317';
const XRGE_DECIMALS = 18;
const XRGE_POOL = '0x059e10d26c64a63d04e1814f46305210eddc447d';
const TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

const rpc = {
    base: () => process.env.BASE_RPC_URL || 'https://mainnet.base.org',
    sol: () => process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
    btc: () => process.env.BTC_API_URL || 'https://mempool.space/api'
};

const walletFor = (chain) => WALLETS.find((w) => w.chain === chain)?.address;

/** Price owed for a payment made at `paidAt`, before tolerance. */
export const owed = (paidAt) => (paidAt < DEADLINE ? PRICE_USD : FULL_PRICE_USD);

const fail = (message, pending = false) => ({ ok: false, pending, message });

/** Shared checks once a payment's value and time are known. */
function judge({ ref, usd, paidAt }) {
    if (paidAt < SALE_START) return fail('That payment is older than this sale.');
    const need = owed(paidAt);
    if (usd < need * TOLERANCE) {
        return fail(`That payment is worth about $${usd.toFixed(2)} today. The issue is $${need}.`);
    }
    return { ok: true, ref, usd, paidAt };
}

async function getJson(fetchImpl, url, init) {
    const response = await fetchImpl(url, { ...init, signal: AbortSignal.timeout(10000) });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`${url} answered ${response.status}`);
    return response.json();
}

async function jsonRpc(fetchImpl, url, method, params) {
    const body = await getJson(fetchImpl, url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params })
    });
    if (body?.error) throw new Error(`${method}: ${body.error.message}`);
    return body?.result ?? null;
}

// ---------------------------------------------------------------- prices

let priceCache = { at: 0, value: null };

/** USD prices for eth, btc, sol and xrge; cached for a minute per container. */
export async function prices(fetchImpl = fetch) {
    if (priceCache.value && Date.now() - priceCache.at < 60000) return priceCache.value;
    const [gecko, pool] = await Promise.all([
        getJson(fetchImpl, 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,solana&vs_currencies=usd'),
        getJson(fetchImpl, `https://api.geckoterminal.com/api/v2/networks/base/pools/${XRGE_POOL}`)
    ]);
    const attrs = pool?.data?.attributes ?? {};
    const xrgeIsBase = pool?.data?.relationships?.base_token?.data?.id === `base_${XRGE_TOKEN}`;
    const value = {
        eth: Number(gecko?.ethereum?.usd),
        btc: Number(gecko?.bitcoin?.usd),
        sol: Number(gecko?.solana?.usd),
        xrge: Number(xrgeIsBase ? attrs.base_token_price_usd : attrs.quote_token_price_usd)
    };
    for (const [coin, price] of Object.entries(value)) {
        if (!(price > 0)) throw new Error(`no ${coin} price`);
    }
    priceCache = { at: Date.now(), value };
    return value;
}

// ---------------------------------------------------------------- stripe

/**
 * A Checkout Session id from the Payment Link's redirect. Needs
 * STRIPE_SECRET_KEY (a restricted key with Checkout Sessions: read is enough).
 * If STRIPE_PAYMENT_LINK_ID (plink_...) is set, the session must come from it.
 */
export async function verifyStripe(sessionId, fetchImpl = fetch) {
    if (!/^cs_(live|test)_[A-Za-z0-9]{10,200}$/.test(sessionId ?? '')) return fail('That is not a Stripe checkout id.');
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY is not set');

    const session = await getJson(fetchImpl, `https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
        headers: { authorization: `Bearer ${key}` }
    });
    if (!session) return fail('Stripe does not know that checkout.');
    if (session.payment_status !== 'paid') return fail('Stripe has not marked that checkout paid yet.', true);

    const link = process.env.STRIPE_PAYMENT_LINK_ID;
    if (link && session.payment_link !== link) return fail('That checkout was not for Dead Circuit.');
    if (session.currency !== 'usd' || session.amount_total < PRICE_USD * 100) {
        return fail('That checkout was not for Dead Circuit.');
    }
    // Stripe already charged the price the link asked for; no tolerance needed.
    return { ok: true, ref: `stripe:${session.id}`, usd: session.amount_total / 100, paidAt: session.created * 1000 };
}

// ---------------------------------------------------------------- base

async function baseReceipt(hash, fetchImpl) {
    if (!/^0x[0-9a-fA-F]{64}$/.test(hash ?? '')) return { error: fail('A Base transaction hash is 0x plus 64 hex characters.') };
    const url = rpc.base();
    const [tx, receipt] = await Promise.all([
        jsonRpc(fetchImpl, url, 'eth_getTransactionByHash', [hash]),
        jsonRpc(fetchImpl, url, 'eth_getTransactionReceipt', [hash])
    ]);
    if (!tx) return { error: fail('Base has no transaction with that hash. Check it, or wait a minute.', true) };
    if (!receipt) return { error: fail('That transaction is still pending. Try again in a minute.', true) };
    if (receipt.status !== '0x1') return { error: fail('That transaction failed on chain.') };
    const block = await jsonRpc(fetchImpl, url, 'eth_getBlockByNumber', [receipt.blockNumber, false]);
    return { tx, receipt, paidAt: Number(BigInt(block.timestamp)) * 1000 };
}

export async function verifyBaseEth(hash, fetchImpl = fetch) {
    const got = await baseReceipt(hash, fetchImpl);
    if (got.error) return got.error;
    const wallet = walletFor('base-eth').toLowerCase();
    if (got.tx.to?.toLowerCase() !== wallet) {
        return fail('That transaction did not send ETH straight to the Dead Circuit wallet.');
    }
    const eth = Number(BigInt(got.tx.value)) / 1e18;
    const { eth: price } = await prices(fetchImpl);
    return judge({ ref: `base:${hash.toLowerCase()}`, usd: eth * price, paidAt: got.paidAt });
}

export async function verifyBaseXrge(hash, fetchImpl = fetch) {
    const got = await baseReceipt(hash, fetchImpl);
    if (got.error) return got.error;
    const wallet = walletFor('base-xrge').toLowerCase().slice(2);
    let units = 0n;
    for (const log of got.receipt.logs ?? []) {
        if (log.address?.toLowerCase() !== XRGE_TOKEN) continue;
        if (log.topics?.[0] !== TRANSFER_TOPIC) continue;
        if (!log.topics[2]?.toLowerCase().endsWith(wallet)) continue;
        units += BigInt(log.data);
    }
    if (units === 0n) return fail('That transaction sent no XRGE to the Dead Circuit wallet.');
    const xrge = Number(units) / 10 ** XRGE_DECIMALS;
    const { xrge: price } = await prices(fetchImpl);
    return judge({ ref: `base:${hash.toLowerCase()}`, usd: xrge * price, paidAt: got.paidAt });
}

// ---------------------------------------------------------------- bitcoin

export async function verifyBtc(txid, fetchImpl = fetch) {
    if (!/^[0-9a-fA-F]{64}$/.test(txid ?? '')) return fail('A Bitcoin transaction id is 64 hex characters.');
    const tx = await getJson(fetchImpl, `${rpc.btc()}/tx/${txid.toLowerCase()}`);
    if (!tx) return fail('Bitcoin has no transaction with that id yet. Check it, or wait a few minutes.', true);
    const wallet = walletFor('btc');
    const sats = (tx.vout ?? [])
        .filter((out) => out.scriptpubkey_address === wallet)
        .reduce((sum, out) => sum + out.value, 0);
    if (sats === 0) return fail('That transaction sent nothing to the Dead Circuit wallet.');
    if (!tx.status?.confirmed) return fail('Seen it. Bitcoin needs one confirmation, usually ten minutes. Try again then.', true);
    const { btc: price } = await prices(fetchImpl);
    return judge({ ref: `btc:${txid.toLowerCase()}`, usd: (sats / 1e8) * price, paidAt: tx.status.block_time * 1000 });
}

// ---------------------------------------------------------------- solana

export async function verifySol(signature, fetchImpl = fetch) {
    if (!/^[1-9A-HJ-NP-Za-km-z]{64,90}$/.test(signature ?? '')) return fail('That does not look like a Solana signature.');
    const tx = await jsonRpc(fetchImpl, rpc.sol(), 'getTransaction', [
        signature,
        { encoding: 'json', maxSupportedTransactionVersion: 0, commitment: 'confirmed' }
    ]);
    if (!tx) return fail('Solana has no confirmed transaction with that signature yet. Try again in a minute.', true);
    if (tx.meta?.err) return fail('That transaction failed on chain.');
    const keys = [
        ...(tx.transaction?.message?.accountKeys ?? []),
        ...(tx.meta?.loadedAddresses?.writable ?? []),
        ...(tx.meta?.loadedAddresses?.readonly ?? [])
    ];
    const index = keys.indexOf(walletFor('sol'));
    const lamports = index < 0 ? 0 : tx.meta.postBalances[index] - tx.meta.preBalances[index];
    if (lamports <= 0) return fail('That transaction sent no SOL to the Dead Circuit wallet.');
    const { sol: price } = await prices(fetchImpl);
    return judge({ ref: `sol:${signature}`, usd: (lamports / 1e9) * price, paidAt: tx.blockTime * 1000 });
}

export const CRYPTO = {
    'base-eth': verifyBaseEth,
    'base-xrge': verifyBaseXrge,
    btc: verifyBtc,
    sol: verifySol
};
