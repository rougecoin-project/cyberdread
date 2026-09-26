/**
 * Short-lived, HMAC-signed download tokens. A token is `payload.signature`,
 * both base64url; the payload is `{ ref, exp }`. The signing key is the
 * DC_DOWNLOAD_SECRET environment variable.
 */
import { createHmac, timingSafeEqual } from 'node:crypto';

export const TOKEN_TTL_MS = 15 * 60 * 1000;

function secret() {
    const value = process.env.DC_DOWNLOAD_SECRET;
    if (!value || value.length < 32) {
        throw new Error('DC_DOWNLOAD_SECRET is missing or shorter than 32 characters');
    }
    return value;
}

const sign = (payload) => createHmac('sha256', secret()).update(payload).digest('base64url');

/** @param {string} ref what was paid, e.g. `stripe:cs_...` or `btc:<txid>` */
export function issueToken(ref, now = Date.now()) {
    const payload = Buffer.from(JSON.stringify({ ref, exp: now + TOKEN_TTL_MS })).toString('base64url');
    return `${payload}.${sign(payload)}`;
}

/** @returns {{ref: string, exp: number} | null} */
export function readToken(token, now = Date.now()) {
    if (typeof token !== 'string' || token.length > 2048) return null;
    const [payload, signature] = token.split('.');
    if (!payload || !signature) return null;
    const expected = Buffer.from(sign(payload));
    const given = Buffer.from(signature);
    if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
    try {
        const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
        if (typeof data.ref !== 'string' || typeof data.exp !== 'number' || data.exp < now) return null;
        return data;
    } catch {
        return null;
    }
}
