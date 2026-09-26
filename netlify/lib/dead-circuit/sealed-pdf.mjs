/**
 * The Dead Circuit PDFs, sealed. The repo is public, so it carries only
 * AES-256-GCM encrypted copies, one per language, served as ordinary static
 * files from /dead-circuit/sealed/issue-01.<lang>.pdf.enc (without the key
 * they are noise, and a tampered file fails the tag check). The key is the
 * DC_PDF_KEY environment variable: 64 hex characters, set in Netlify.
 *
 * File layout: 12-byte IV, ciphertext, 16-byte GCM tag.
 * Build or replace them with tools/build-dead-circuit-pdfs.mjs.
 */
import { createDecipheriv } from 'node:crypto';

export const EDITIONS = ['en', 'es', 'fr', 'it', 'pt', 'ja', 'zh', 'ar'];

const IV_BYTES = 12;
const TAG_BYTES = 16;

/** Decrypted editions, kept while the function container is warm. */
const cache = new Map();

export const edition = (lang) => (EDITIONS.includes(lang) ? lang : 'en');

function key() {
    const hex = process.env.DC_PDF_KEY?.trim();
    if (!hex) return null;
    if (!/^[0-9a-f]{64}$/i.test(hex)) throw new Error('DC_PDF_KEY must be 64 hex characters');
    return Buffer.from(hex, 'hex');
}

export function unseal(sealed, secret) {
    const iv = sealed.subarray(0, IV_BYTES);
    const tag = sealed.subarray(sealed.length - TAG_BYTES);
    const body = sealed.subarray(IV_BYTES, sealed.length - TAG_BYTES);
    const decipher = createDecipheriv('aes-256-gcm', secret, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(body), decipher.final()]);
}

/**
 * @param {string} lang  edition code; unknown codes fall back to English
 * @param {string} origin  the site's origin, e.g. https://cyberdreadx.dev
 * @returns {Promise<Buffer | null>} the PDF, or null when the key or the
 *   sealed file is missing
 */
export async function openSealedPdf(lang, origin, fetchImpl = fetch) {
    const code = edition(lang);
    if (cache.has(code)) return cache.get(code);

    const secret = key();
    if (!secret) return null;

    const response = await fetchImpl(new URL(`/dead-circuit/sealed/issue-01.${code}.pdf.enc`, origin), {
        signal: AbortSignal.timeout(20000)
    });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`sealed ${code} answered ${response.status}`);

    const pdf = unseal(Buffer.from(await response.arrayBuffer()), secret);
    cache.set(code, pdf);
    return pdf;
}

/** Streams a buffer in chunks so the function response is streamed. */
export function streamBuffer(buffer, chunkSize = 256 * 1024) {
    let offset = 0;
    return new ReadableStream({
        pull(controller) {
            if (offset >= buffer.length) {
                controller.close();
                return;
            }
            controller.enqueue(buffer.subarray(offset, offset + chunkSize));
            offset += chunkSize;
        }
    });
}
