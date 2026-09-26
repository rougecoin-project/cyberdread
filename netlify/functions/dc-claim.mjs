/**
 * POST /.netlify/functions/dc-claim
 *
 * Trades proof of payment for a 15-minute Dead Circuit download link.
 * Body is one of:
 *   { method: 'stripe', sessionId }      -- from the Payment Link redirect
 *   { method: 'crypto', chain, tx }      -- chain is a WALLETS[].chain id
 *   { method: 'gate', token }            -- the dc@gate puzzle answer
 * Answers { ok: true, url } or { ok: false, pending?, message }.
 *
 * Each payment can be claimed MAX_CLAIMS times, so a buyer can re-download
 * but a shared receipt link runs dry.
 */
import { createHash } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import { issueToken } from '../lib/dead-circuit/tokens.mjs';
import { CRYPTO, verifyStripe } from '../lib/dead-circuit/verify.mjs';

const CLAIMS = 'dead-circuit-claims';
const MAX_CLAIMS = 5;

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
        if (!check) return { ok: false, message: 'Pick the chain you paid on.' };
        return check(String(body.tx ?? '').trim());
    }
    if (body?.method === 'gate') {
        const token = String(body.token ?? '').trim().slice(0, 200);
        return sha256(token) === CLEARANCE_SHA256
            ? { ok: true, ref: 'gate', unlimited: true }
            : { ok: false, message: 'rejected.' };
    }
    return { ok: false, message: 'Unknown claim.' };
}

/** Counts this claim against the payment; false once it has run out. */
async function spend(ref) {
    const store = getStore(CLAIMS);
    const key = sha256(ref);
    const record = (await store.get(key, { type: 'json' })) ?? { ref, count: 0, first: Date.now() };
    if (record.count >= MAX_CLAIMS) return false;
    record.count += 1;
    record.last = Date.now();
    await store.setJSON(key, record);
    return true;
}

export default async (request) => {
    if (request.method !== 'POST') return reply({ ok: false, message: 'Method not allowed' }, 405);
    if (throttled(request.headers.get('x-nf-client-connection-ip') || 'unknown')) {
        return reply({ ok: false, message: 'Too many tries. Wait a minute.' }, 429);
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return reply({ ok: false, message: 'Bad request.' }, 400);
    }

    try {
        const result = await verify(body);
        if (!result.ok) return reply(result);
        if (!result.unlimited && !(await spend(result.ref))) {
            return reply({ ok: false, message: 'That payment has already been used for its downloads. Ask for help if this is yours.' });
        }
        const token = issueToken(result.ref);
        return reply({ ok: true, url: `/.netlify/functions/dc-download?t=${encodeURIComponent(token)}` });
    } catch (error) {
        console.error('dc-claim failed:', error);
        return reply({ ok: false, pending: true, message: 'Could not check that payment right now. Try again in a minute.' }, 502);
    }
};

export const config = { path: '/.netlify/functions/dc-claim' };
