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
 * The paid chapters come from content/issue-01/<lang>.json.enc (see
 * tools/issue-content.mjs), unsealed here and handed to the print page as
 * window.__DC_ISSUE__; the site itself never serves them.
 */
import { createCipheriv, randomBytes } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { readContent } from './issue-content.mjs';

const BASE = process.env.DC_BASE_URL || 'http://localhost:8765';
const LANGS = process.argv.slice(2).length ? process.argv.slice(2) : ['en', 'es', 'fr', 'it', 'pt', 'ja', 'zh', 'ar'];
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

/**
 * Print-sized copies of the art. Chromium embeds a photo again on every page
 * that shows it, so the site's full-resolution JPEGs would make a ~18 MB PDF.
 * At most 1400 px on the long edge is still sharp at 2x on a 1100 px page.
 */
const PRINT_ART = new Map();
{
    const helper = await browser.newPage();
    await helper.goto(`${BASE}/dead-circuit/print/`);
    for (const name of ['cover', 'night', 'avenue', 'shelter', 'grid', 'machine']) {
        const base64 = await helper.evaluate(async (src) => {
            const bitmap = await createImageBitmap(await (await fetch(src)).blob());
            const scale = Math.min(1, 1400 / Math.max(bitmap.width, bitmap.height));
            const canvas = new OffscreenCanvas(Math.round(bitmap.width * scale), Math.round(bitmap.height * scale));
            canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
            const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.82 });
            const bytes = new Uint8Array(await blob.arrayBuffer());
            let binary = '';
            for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
            return btoa(binary);
        }, `/dead-circuit/art/${name}.jpg`);
        PRINT_ART.set(name, Buffer.from(base64, 'base64'));
    }
    await helper.close();
}

for (const lang of LANGS) {
    const page = await browser.newPage({ viewport: { width: 1100, height: 680 } });
    await page.route('**/dead-circuit/art/*.jpg', (route) => {
        const name = new URL(route.request().url()).pathname.split('/').pop().replace('.jpg', '');
        return PRINT_ART.has(name)
            ? route.fulfill({ body: PRINT_ART.get(name), contentType: 'image/jpeg' })
            : route.continue();
    });
    const content = readContent(lang, Buffer.from(KEY, 'hex'));
    await page.addInitScript((c) => { window.__DC_ISSUE__ = c; }, content);
    await page.goto(`${BASE}/dead-circuit/print/?lang=${lang}`, { waitUntil: 'networkidle' });
    await page.waitForSelector('body[data-ready="1"]', { timeout: 30000 });
    const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true });
    await page.close();

    writeFileSync(`dist-pdf/Dead-Circuit-Issue-01-${lang.toUpperCase()}.pdf`, pdf);
    writeFileSync(`${OUT}/issue-01.${lang}.pdf.enc`, seal(pdf));
    console.log(`${lang}: ${(pdf.length / 1e6).toFixed(2)} MB`);
}
await browser.close();
