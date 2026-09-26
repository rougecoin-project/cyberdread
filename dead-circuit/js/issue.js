/**
 * The shape of issue 01: every page in reading order, and which ones are
 * free to read on the site. Folios, the contents page and the reader all
 * derive from this list, so adding a page is one entry here plus its
 * builder in sheets.js.
 */
export const PAGE_ORDER = [
    'cover', 'letter', 'contents', 'd1', 'minutes', 'day',
    'w72', 'pattern', 'starve', 'd2', 'water', 'dwater', 'food', 'heat', 'dstove',
    'power', 'wpower', 'faraday', 'dbox', 'd3', 'shelter', 'cache', 'waste', 'med',
    'move', 'people', 'd4', 'bots', 'specs', 'arms', 'd5', 'denial', 'emp',
    'runners', 'tools', 'cards', 'd6', 'sources', 'end'
];

/** Readable free on the site. Everything else is only in the paid PDF. */
export const PREVIEW = ['cover', 'letter', 'contents', 'd1', 'minutes', 'day'];

export const PAGE_COUNT = PAGE_ORDER.length;

/** Printed page number of a page id, e.g. "07". */
export const folioOf = (id) => String(PAGE_ORDER.indexOf(id) + 1).padStart(2, '0');

/** Deep-merges the sealed paid content into a public language object. */
export function withContent(L, content) {
    if (!content) return L;
    const merge = (a, b) => {
        const out = Array.isArray(a) ? [...a] : { ...a };
        for (const [k, v] of Object.entries(b)) {
            if (k === 'builds' && Array.isArray(out[k])) out[k] = [...out[k], ...v];
            else if (v && typeof v === 'object' && !Array.isArray(v) && out[k] && typeof out[k] === 'object') out[k] = merge(out[k], v);
            else out[k] = v;
        }
        return out;
    };
    return merge(L, content);
}
