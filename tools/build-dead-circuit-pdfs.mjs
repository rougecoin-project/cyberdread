/**
 * Builds the Dead Circuit PDF in every language and seals each one for the
 * download function.
 *
 *   npx serve . -l 8765                      # or any static server on the repo root
 *   DC_PDF_KEY=<64 hex> node tools/build-dead-circuit-pdfs.mjs [en es ...]
 *
 * Needs Playwright (`npm i -D playwright` or a global install) and, for the
 * Japanese, Chinese and Arabic editions, fonts with those scripts installed
 * on the machine (the Noto Sans/Serif JP and SC, Noto Kufi Arabic and Noto
 * Naskh Arabic families match the site's font stacks). PDFs embed the fonts,
 * so readers need nothing installed.
 *
 * Writes plain PDFs to ./dist-pdf/ (git-ignored, never commit them: the repo
 * is public) and sealed copies to dead-circuit/sealed/issue-01.<lang>.pdf.enc,
 * which are served as ordinary static files: without the key they are noise.
 *
 * English defaults to excluded: its edition is the original PDF, sealed as
 * is. Pass `en` explicitly to regenerate it too.
 */
import { createCipheriv, randomBytes } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const BASE = process.env.DC_BASE_URL || 'http://localhost:8765';
const LANGS = process.argv.slice(2).length ? process.argv.slice(2) : ['es', 'fr', 'it', 'pt', 'ja', 'zh', 'ar'];
const OUT = 'dead-circuit/sealed';
const KEY = process.env.DC_PDF_KEY?.trim();

if (!/^[0-9a-f]{64}$/i.test(KEY ?? '')) {
    console.error('Set DC_PDF_KEY to the same 64-hex key configured in Netlify.');
    process.exit(1);
}

function seal(pdf) {
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', Buffer.from(KEY, 'hex'), iv);
    const body = Buffer.concat([cipher.update(pdf), cipher.final()]);
    return Buffer.concat([iv, body, cipher.getAuthTag()]);
}

mkdirSync('dist-pdf', { recursive: true });
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
for (const lang of LANGS) {
    const page = await browser.newPage({ viewport: { width: 1100, height: 680 } });
    await page.goto(`${BASE}/dead-circuit/print/?lang=${lang}`, { waitUntil: 'networkidle' });
    await page.waitForSelector('body[data-ready="1"]', { timeout: 30000 });
    const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true });
    await page.close();

    writeFileSync(`dist-pdf/Dead-Circuit-Issue-01-${lang.toUpperCase()}.pdf`, pdf);
    writeFileSync(`${OUT}/issue-01.${lang}.pdf.enc`, seal(pdf));
    console.log(`${lang}: ${(pdf.length / 1e6).toFixed(2)} MB`);
}
await browser.close();
