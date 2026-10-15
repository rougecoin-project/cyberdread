/**
 * Seals a finished Dead Circuit PDF as one edition of the download, e.g. the
 * vertical English edition:
 *
 *   DC_PDF_KEY=<64 hex> node tools/seal-dead-circuit-pdf.mjs en Dead-Circuit-Issue-01-EN-Vertical.pdf
 *
 * Writes dead-circuit/sealed/issue-01.<lang>.pdf.enc (AES-256-GCM: 12-byte IV,
 * ciphertext, 16-byte tag), the same format tools/build-dead-circuit-pdfs.mjs
 * writes and netlify/lib/dead-circuit/sealed-pdf.mjs opens. Commit only the
 * .enc file, never the PDF: the repo is public.
 */
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const [lang, file] = process.argv.slice(2);
const KEY = process.env.DC_PDF_KEY?.trim();

if (!/^[a-z]{2}$/.test(lang ?? '') || !file) {
    console.error('Usage: DC_PDF_KEY=<64 hex> node tools/seal-dead-circuit-pdf.mjs <lang> <file.pdf>');
    process.exit(1);
}
if (!/^[0-9a-f]{64}$/i.test(KEY ?? '')) {
    console.error('Set DC_PDF_KEY to the same 64-hex key configured in Netlify.');
    process.exit(1);
}

const pdf = readFileSync(file);
if (pdf.subarray(0, 5).toString() !== '%PDF-') {
    console.error(`${file} is not a PDF.`);
    process.exit(1);
}

const key = Buffer.from(KEY, 'hex');
const iv = randomBytes(12);
const cipher = createCipheriv('aes-256-gcm', key, iv);
const sealed = Buffer.concat([iv, cipher.update(pdf), cipher.final(), cipher.getAuthTag()]);

// Round-trip before writing, so a bad seal never replaces a good one.
const check = createDecipheriv('aes-256-gcm', key, sealed.subarray(0, 12));
check.setAuthTag(sealed.subarray(sealed.length - 16));
const back = Buffer.concat([check.update(sealed.subarray(12, sealed.length - 16)), check.final()]);
if (!back.equals(pdf)) throw new Error('round-trip failed');

const out = `dead-circuit/sealed/issue-01.${lang}.pdf.enc`;
writeFileSync(out, sealed);
console.log(`${out}: ${pdf.length} bytes sealed`);
