/**
 * /dead-circuit/print/ -- every spread in order, for printing to PDF.
 * Sets `document.body.dataset.ready` once the images and fonts are in, so a
 * headless browser knows when to print.
 */
import { loadLanguage } from './i18n.js';
import { sheets } from './sheets.js';

const L = await loadLanguage();
document.title = `Dead Circuit — ${L.name}`;
document.getElementById('print-root').innerHTML = sheets(L).join('');

await Promise.all([...document.images].map((img) => (img.complete
    ? Promise.resolve()
    : new Promise((resolve) => { img.onload = img.onerror = resolve; }))));
await document.fonts.ready;
document.body.dataset.ready = '1';
