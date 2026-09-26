/**
 * Language selection for Dead Circuit.
 *
 * Order of precedence: ?lang=xx in the URL, then the reader's last choice,
 * then the browser's preferred languages, then English. The chosen file from
 * ./i18n/ is loaded before a page renders, and <html lang dir> are set.
 */
import { html } from './dom.js';

export const LANGS = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '中文' },
    { code: 'ar', name: 'العربية' }
];

const STORAGE_KEY = 'dc-lang';
const known = (code) => LANGS.some((lang) => lang.code === code);

function stored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
}

function remember(code) {
    try { localStorage.setItem(STORAGE_KEY, code); } catch { /* private mode */ }
}

export function chooseLanguage() {
    const fromUrl = new URLSearchParams(window.location.search).get('lang')?.slice(0, 2).toLowerCase();
    if (known(fromUrl)) {
        remember(fromUrl);
        return fromUrl;
    }
    const saved = stored();
    if (known(saved)) return saved;
    for (const tag of navigator.languages ?? [navigator.language]) {
        const code = String(tag).slice(0, 2).toLowerCase();
        if (known(code)) return code;
    }
    return 'en';
}

/** Loads the chosen language and applies it to the document. */
export async function loadLanguage() {
    const code = chooseLanguage();
    let L;
    try {
        L = (await import(`./i18n/${code}.js`)).default;
    } catch {
        L = (await import('./i18n/en.js')).default;
    }
    document.documentElement.lang = L.code;
    document.documentElement.dir = L.dir;
    return L;
}

/** Fills {name} placeholders. */
export function t(text, vars = {}) {
    return String(text).replace(/\{(\w+)\}/g, (whole, name) => (name in vars ? String(vars[name]) : whole));
}

/** A headline with `|` line breaks and one *emphasised* word, safely escaped. */
export function rich(text) {
    return html`${String(text).split('|').map((line, i) => {
        const parts = line.split('*');
        return html`${i ? html`<br>` : ''}${parts.map((part, j) => (j % 2 ? html`<em>${part}</em>` : part))}`;
    })}`;
}

/** The <select> that switches language; wire it with bindPicker(). */
export function picker(L) {
    return html`
    <label class="lang-picker">
      <span class="sr-only">${L.languageLabel}</span>
      <select data-lang-picker aria-label="${L.languageLabel}">
        ${LANGS.map((lang) => html`<option value="${lang.code}" lang="${lang.code}" ${lang.code === L.code ? 'selected' : ''}>${lang.name}</option>`)}
      </select>
    </label>`;
}

export function bindPicker(root) {
    root.querySelectorAll('[data-lang-picker]').forEach((select) => {
        select.addEventListener('change', () => {
            remember(select.value);
            const url = new URL(window.location.href);
            if (url.searchParams.has('lang')) url.searchParams.set('lang', select.value);
            window.location.replace(url);
        });
    });
}
