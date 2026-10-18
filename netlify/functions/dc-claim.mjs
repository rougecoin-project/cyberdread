/**
 * POST /.netlify/functions/dc-claim
 *
 * Trades proof of payment for a 15-minute Dead Circuit download link.
 * Body is one of:
 *   { method: 'stripe', sessionId }      -- from the Payment Link redirect
 *   { method: 'crypto', chain, tx }      -- chain is a WALLETS[].chain id
 *   { method: 'gate', token }            -- the dc@gate puzzle answer
 *   { method: 'gift', code }             -- a gift code (DC-XXXX-…), see lib/dead-circuit/gift.mjs
 * plus an optional `lang` (en, es, fr, it, pt, ru, ja, zh, ar) choosing which
 * edition of the PDF the download link serves; English otherwise.
 * Answers { ok: true, url } or { ok: false, pending?, code, message, params? };
 * `code` keys the reader-language text in dead-circuit/js/i18n/*.js.
 *
 * Each payment can be claimed MAX_CLAIMS times (a gift code GIFT_CLAIMS times),
 * so a buyer can re-download but a shared receipt or code runs dry.
 */
import { createHash } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import { issueToken } from '../lib/dead-circuit/tokens.mjs';
import { edition } from '../lib/dead-circuit/sealed-pdf.mjs';
import { CRYPTO, verifyStripe } from '../lib/dead-circuit/verify.mjs';
import { checkCode, giftKey } from '../lib/dead-circuit/gift.mjs';

const CLAIMS = 'dead-circuit-claims';
const MAX_CLAIMS = 5;
/** A gift is one copy: the first download plus a couple of retries. */
const GIFT_CLAIMS = 3;

/** SHA-256 of the gate's clearance token; the puzzle's answer is not stored. */
const CLEARANCE_SHA256 = '79bb562c4e9a7d6eb7a7ddbac1a37e1317c69cba5b1660f60696bd5e2e9d3216';

// Per-container throttle, like the chat's: slows guessing, not a hard limit.
const WINDOW_MS = 60000;
const MAX_PER_WINDOW = 10;
const hits = new Map();

function throttled(client) {
    const now = Date.now();
    const recent = (hits.get(client) ?? []).filter((t) => now - t < WINDOW_MS);
    recent.push(now);
    hits.set(client, recent);
    return recent.length > MAX_PER_WINDOW;
}

const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const reply = (body, status = 200) => Response.json(body, { status, headers: { 'cache-control': 'no-store' } });

async function verify(body) {
    if (body?.method === 'stripe') return verifyStripe(body.sessionId);
    if (body?.method === 'crypto') {
        const check = CRYPTO[body.chain];
        if (!check) return { ok: false, code: 'bad-chain', message: 'Pick the chain you paid on.' };
        return check(String(body.tx ?? '').trim());
    }
    if (body?.method === 'gate') {
        const token = String(body.token ?? '').trim().slice(0, 200);
        return sha256(token) === CLEARANCE_SHA256
            ? { ok: true, ref: 'gate', unlimited: true }
            : { ok: false, code: 'gate-rejected', message: 'rejected.' };
    }
    if (body?.method === 'gift') {
        const key = giftKey();
        if (!key) return { ok: false, pending: true, code: 'unavailable', message: 'Gift codes are not set up.' };
        const id = checkCode(String(body.code ?? '').slice(0, 64), key);
        return id
            ? { ok: true, ref: `gift:${id}`, limit: GIFT_CLAIMS }
            : { ok: false, code: 'gift-rejected', message: 'That gift code is not valid.' };
    }
    return { ok: false, code: 'unknown', message: 'Unknown claim.' };
}

/** Counts this claim against the payment; false once it has run out. */
async function spend(ref, limit = MAX_CLAIMS) {
    const store = getStore(CLAIMS);
    const key = sha256(ref);
    const record = (await store.get(key, { type: 'json' })) ?? { ref, count: 0, first: Date.now() };
    if (record.count >= limit) return false;
    record.count += 1;
    record.last = Date.now();
    await store.setJSON(key, record);
    return true;
}

export default async (request) => {
    if (request.method !== 'POST') return reply({ ok: false, code: 'unknown', message: 'Method not allowed' }, 405);
    if (throttled(request.headers.get('x-nf-client-connection-ip') || 'unknown')) {
        return reply({ ok: false, code: 'throttled', message: 'Too many tries. Wait a minute.' }, 429);
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return reply({ ok: false, code: 'unknown', message: 'Bad request.' }, 400);
    }

    try {
        const result = await verify(body);
        if (!result.ok) return reply(result);
        if (!result.unlimited && !(await spend(result.ref, result.limit))) {
            const gift = result.ref.startsWith('gift:');
            return reply(gift
                ? { ok: false, code: 'gift-used-up', message: 'That gift code has already been used.' }
                : { ok: false, code: 'used-up', message: 'That payment has already been used for its downloads. Ask for help if this is yours.' });
        }
        // The PDF comes in the language the buyer is reading the site in.
        const token = issueToken(result.ref, edition(String(body.lang ?? '').slice(0, 5)));
        return reply({ ok: true, url: `/.netlify/functions/dc-download?t=${encodeURIComponent(token)}` });
    } catch (error) {
        console.error('dc-claim failed:', error);
        return reply({ ok: false, pending: true, code: 'unavailable', message: 'Could not check that payment right now. Try again in a minute.' }, 502);
    }
};

export const config = { path: '/.netlify/functions/dc-claim' };
