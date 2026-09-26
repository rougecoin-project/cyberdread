/**
 * The Dead Circuit PDF, sealed. The repo is public, so it carries only an
 * AES-256-GCM encrypted copy (netlify/private/issue-01.pdf.enc, bundled into
 * dc-download via `included_files` in netlify.toml). The key is the
 * DC_PDF_KEY environment variable: 64 hex characters, set in Netlify.
 *
 * File layout: 12-byte IV, ciphertext, 16-byte GCM tag. Anyone with the repo
 * and without the key has noise; a tampered file fails the tag check.
 */
import { createDecipheriv } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const RELATIVE = 'netlify/private/issue-01.pdf.enc';
const IV_BYTES = 12;
const TAG_BYTES = 16;

let cached = null;

/** Where Netlify may have placed the bundled file, most likely first. */
function candidates() {
    const roots = [process.cwd(), process.env.LAMBDA_TASK_ROOT, '/var/task'].filter(Boolean);
    return [...new Set(roots)].map((root) => join(root, RELATIVE));
}

async function readSealed() {
    for (const path of candidates()) {
        try {
            return await readFile(path);
        } catch {
            // try the next location
        }
    }
    return null;
}

/**
 * @returns {Promise<Buffer | null>} the decrypted PDF, or null when the
 *   sealed file or the key is missing
 */
export async function openSealedPdf() {
    if (cached) return cached;

    const hex = process.env.DC_PDF_KEY?.trim();
    if (!hex) return null;
    if (!/^[0-9a-f]{64}$/i.test(hex)) throw new Error('DC_PDF_KEY must be 64 hex characters');

    const sealed = await readSealed();
    if (!sealed) return null;

    const iv = sealed.subarray(0, IV_BYTES);
    const tag = sealed.subarray(sealed.length - TAG_BYTES);
    const body = sealed.subarray(IV_BYTES, sealed.length - TAG_BYTES);

    const decipher = createDecipheriv('aes-256-gcm', Buffer.from(hex, 'hex'), iv);
    decipher.setAuthTag(tag);
    cached = Buffer.concat([decipher.update(body), decipher.final()]);
    return cached;
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
