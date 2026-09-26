/**
 * Tiny templating helpers. `html` escapes every interpolated value unless it
 * was itself produced by `html` (or wrapped in `raw`), so copy can never
 * inject markup.
 */

class Safe {
    constructor(value) { this.value = value; }
    toString() { return this.value; }
}

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const esc = (value) => String(value).replace(/[&<>"']/g, (ch) => ESC[ch]);

export const raw = (value) => new Safe(String(value));

function part(value) {
    if (value === null || value === undefined || value === false) return '';
    if (Array.isArray(value)) return value.map(part).join('');
    if (value instanceof Safe) return value.value;
    return esc(value);
}

export function html(strings, ...values) {
    let out = strings[0];
    values.forEach((value, i) => { out += part(value) + strings[i + 1]; });
    return new Safe(out);
}

export const pad2 = (n) => String(n).padStart(2, '0');

export const ICONS = {
    left: raw('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>'),
    right: raw('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>'),
    download: raw('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>')
};
