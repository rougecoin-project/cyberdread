/**
 * Languages for Dread_OS.
 *
 * Order of precedence: ?lang=xx in the address, then the visitor's last
 * choice (shared with Dead Circuit under the same key), then the browser's
 * preferred languages, then English. The chosen dictionary loads before
 * the desktop boots, so nothing renders in the wrong language.
 *
 * Strings live in ./en/*.js and ./ru/*.js (one file per area, merged by
 * ./en.js and ./ru.js). In code: t('ui.settings.title'). In index.html:
 *   data-i18n="key"                 text content
 *   data-i18n-html="key"            markup (our own dictionaries only)
 *   data-i18n-attr="title:key; aria-label:key2"
 * A value can be a plural set ({ one, few, many, other }); t() picks the
 * form from the `n` variable with the language's plural rules.
 *
 * Check that ru mirrors en with: node js/i18n/check.mjs
 */
import en from './en.js';

export const LANGS = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' }
];

// Shared with Dead Circuit (dead-circuit/js/i18n.js), so one choice covers
// the whole site.
const STORAGE_KEY = 'dc-lang';
const known = (code) => LANGS.some((lang) => lang.code === code);

function stored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
}

export function rememberLanguage(code) {
    try { localStorage.setItem(STORAGE_KEY, code); } catch { /* private mode */ }
}

function chooseLanguage() {
    const fromUrl = new URLSearchParams(window.location.search).get('lang')?.slice(0, 2).toLowerCase();
    if (known(fromUrl)) {
        rememberLanguage(fromUrl);
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

const chosen = chooseLanguage();
let dict = en;
if (chosen !== 'en') {
    try {
        dict = (await import(`./${chosen}.js`)).default;
    } catch {
        dict = en;
    }
}

/** The active language code, e.g. 'ru'. */
export const LANG = dict.code;

/**
 * Locale for dates and numbers: the visitor's own regional variant of the
 * active language when they have one (en-GB, ru-UA), else the default.
 */
export const LOCALE = (navigator.languages ?? [navigator.language])
    .find((tag) => String(tag).toLowerCase().startsWith(`${LANG}-`)) ?? dict.locale;

const plurals = new Intl.PluralRules(LOCALE);

function lookup(source, key) {
    return key.split('.').reduce((node, part) => (node == null ? undefined : node[part]), source);
}

/**
 * The string for `key` in the active language (English if it is missing
 * there), with {name} placeholders filled from `vars`.
 * @param {string} key  dotted path, e.g. 'ui.settings.title'
 * @param {Object} [vars]
 * @returns {string}
 */
export function t(key, vars = {}) {
    let value = lookup(dict, key);
    if (value == null) value = lookup(en, key);
    if (value == null) return key;
    if (typeof value === 'object' && !Array.isArray(value)) {
        const n = Number(vars.n);
        value = value[plurals.select(Number.isFinite(n) ? n : 0)] ?? value.other ?? '';
    }
    return String(value).replace(/\{(\w+)\}/g, (whole, name) => (name in vars ? String(vars[name]) : whole));
}

/** A list value (e.g. a set of lines), in the active language. */
export function list(key) {
    const value = lookup(dict, key) ?? lookup(en, key);
    return Array.isArray(value) ? value : [];
}

/** Formats a number for the active locale. */
export function num(value, options) {
    return Number(value).toLocaleString(LOCALE, options);
}

/** Fills every data-i18n* element under `root`. */
export function translateDom(root = document) {
    root.querySelectorAll('[data-i18n]').forEach((el) => {
        el.textContent = t(el.dataset.i18n);
    });
    root.querySelectorAll('[data-i18n-html]').forEach((el) => {
        el.innerHTML = t(el.dataset.i18nHtml);
    });
    root.querySelectorAll('[data-i18n-attr]').forEach((el) => {
        el.dataset.i18nAttr.split(';').forEach((pair) => {
            const [attr, key] = pair.split(':').map((part) => part?.trim());
            if (attr && key) el.setAttribute(attr, t(key));
        });
    });
}

/** Sets <html lang>, the title and the description, then the markup. */
export function applyLanguage() {
    const root = document.documentElement;
    root.lang = LANG;
    root.dir = dict.dir || 'ltr';
    document.title = t('ui.meta.title');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('ui.meta.description'));
    translateDom();
    root.classList.remove('i18n-pending');
}

/** Switches language: remembers it and reloads into it. */
export function switchLanguage(code) {
    if (!known(code) || code === LANG) return;
    rememberLanguage(code);
    const url = new URL(window.location.href);
    url.searchParams.delete('lang');
    window.location.replace(url);
}
