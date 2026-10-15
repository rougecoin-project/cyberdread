/**
 * /dead-circuit/read/ -- picks the preview for the reader's language: the
 * turning-page magazine of the A4 portrait edition in English, the spread
 * viewer (reader.js) in every other language.
 */
import { loadLanguage } from './i18n.js';

const L = await loadLanguage();
if (L.code === 'en') (await import('./flipbook.js')).mountFlipbook(L);
else await import('./reader.js');
