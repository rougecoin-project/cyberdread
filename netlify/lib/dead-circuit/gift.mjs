/**
 * Gift codes for Dead Circuit: DC-XXXX-XXXX-XXXX-XXXX.
 *
 * A code is an 8-character random id and an 8-character signature of that id
 * (HMAC-SHA256 under a key derived from DC_PDF_KEY), in Crockford base32. The
 * server keeps no list of codes: any code whose signature checks out is real,
 * and nobody without the key can make one. Each code's claims are counted in
 * the claims store like a payment's, so a shared code runs dry.
 *
 * Make codes with tools/gift-codes.mjs.
 */
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford: no I, L, O, U
const PART = 8;

function encode(bytes, length) {
    let bits = 0;
    let value = 0;
    let out = '';
    for (const byte of bytes) {
        value = (value << 8) | byte;
        bits += 8;
        while (bits >= 5 && out.length < length) {
            bits -= 5;
            out += ALPHABET[(value >>> bits) & 31];
        }
        value &= (1 << bits) - 1;
        if (out.length === length) break;
    }
    return out;
}

/** The signing key, derived so gift codes never use DC_PDF_KEY directly. */
export function giftKey(pdfKeyHex = process.env.DC_PDF_KEY) {
    const hex = pdfKeyHex?.trim();
    if (!hex || !/^[0-9a-f]{64}$/i.test(hex)) return null;
    return createHmac('sha256', Buffer.from(hex, 'hex')).update('dead-circuit gift codes v1').digest();
}

const sign = (key, id) => encode(createHmac('sha256', key).update(`dc-gift:${id}`).digest(), PART);

/** Upper-cases, drops dashes and spaces, and fixes look-alikes (O→0, I/L→1). */
export function normalize(input) {
    const s = String(input ?? '').toUpperCase().replace(/[^0-9A-Z]/g, '').replace(/O/g, '0').replace(/[IL]/g, '1');
    return s.startsWith('DC') && s.length === 2 + 2 * PART ? s.slice(2) : s;
}

const format = (body) => `DC-${body.match(/.{4}/g).join('-')}`;

/** A new gift code. */
export function makeCode(key) {
    const id = encode(randomBytes(8), PART);
    return format(id + sign(key, id));
}

/** The code's id if its signature is right, else null. */
export function checkCode(input, key) {
    const body = normalize(input);
    if (body.length !== 2 * PART || /[^0-9A-HJKMNP-TV-Z]/.test(body)) return null;
    const id = body.slice(0, PART);
    const given = Buffer.from(body.slice(PART));
    const want = Buffer.from(sign(key, id));
    return timingSafeEqual(given, want) ? id : null;
}
