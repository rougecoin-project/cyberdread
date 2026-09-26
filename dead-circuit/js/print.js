/**
 * /dead-circuit/print/ -- every spread in order, for printing to PDF.
 *
 * The paid chapters are not on the site. tools/build-dead-circuit-pdfs.mjs
 * unseals them and hands them in as `window.__DC_ISSUE__` before this runs;
 * opened directly, the page prints only the free preview.
 * Sets `document.body.dataset.ready` once images and fonts are in.
 */
import { loadLanguage } from './i18n.js';
import { PAGE_ORDER, PREVIEW, withContent } from './issue.js';
import { sheets } from './sheets.js';

const content = window.__DC_ISSUE__ ?? null;
const L = withContent(await loadLanguage(), content);
document.title = `Dead Circuit — ${L.name}`;
document.getElementById('print-root').innerHTML = sheets(L, { ids: content ? PAGE_ORDER : PREVIEW }).join('');

await Promise.all([...document.images].map((img) => (img.complete
    ? Promise.resolve()
    : new Promise((resolve) => { img.onload = img.onerror = resolve; }))));
await document.fonts.ready;
document.body.dataset.ready = '1';
