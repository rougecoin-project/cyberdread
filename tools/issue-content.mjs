/**
 * Seals and opens the paid chapters of Dead Circuit, issue 01.
 *
 * The repo is public, so the paid text is committed only as AES-256-GCM
 * ciphertext: content/issue-01/<lang>.json.enc (same key as the PDFs,
 * DC_PDF_KEY). The plain JSON beside it is git-ignored and exists only on
 * the machine of whoever is editing.
 *
 *   DC_PDF_KEY=<hex> node tools/issue-content.mjs open    # .enc  -> .json (to edit)
 *   DC_PDF_KEY=<hex> node tools/issue-content.mjs seal    # .json -> .enc  (to commit)
 */
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

export const LANGS = ['en', 'es', 'fr', 'it', 'pt', 'ja', 'zh', 'ar'];
export const DIR = 'content/issue-01';

export function keyFromEnv() {
    const hex = process.env.DC_PDF_KEY?.trim();
    if (!/^[0-9a-f]{64}$/i.test(hex ?? '')) {
        throw new Error('Set DC_PDF_KEY to the 64-hex key configured in Netlify.');
    }
    return Buffer.from(hex, 'hex');
}

export function seal(buffer, key) {
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', key, iv);
    const body = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return Buffer.concat([iv, body, cipher.getAuthTag()]);
}

export function unseal(sealed, key) {
    const decipher = createDecipheriv('aes-256-gcm', key, sealed.subarray(0, 12));
    decipher.setAuthTag(sealed.subarray(sealed.length - 16));
    return Buffer.concat([decipher.update(sealed.subarray(12, sealed.length - 16)), decipher.final()]);
}

/** The paid content for one language, decrypted. */
export function readContent(lang, key = keyFromEnv()) {
    return JSON.parse(unseal(readFileSync(`${DIR}/${lang}.json.enc`), key).toString('utf8'));
}

if (import.meta.url === `file://${process.argv[1]}`) {
    const mode = process.argv[2];
    const key = keyFromEnv();
    for (const lang of LANGS) {
        const plain = `${DIR}/${lang}.json`;
        const sealed = `${plain}.enc`;
        if (mode === 'seal') {
            if (!existsSync(plain)) continue;
            JSON.parse(readFileSync(plain, 'utf8')); // refuse to seal broken JSON
            writeFileSync(sealed, seal(readFileSync(plain), key));
            console.log(`sealed ${sealed}`);
        } else if (mode === 'open') {
            if (!existsSync(sealed)) continue;
            writeFileSync(plain, unseal(readFileSync(sealed), key));
            console.log(`opened ${plain}`);
        } else {
            console.error('Usage: node tools/issue-content.mjs open|seal');
            process.exit(1);
        }
    }
}
