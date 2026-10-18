/**
 * Checks the Dread_OS dictionaries.
 *
 *   node js/i18n/check.mjs
 *
 * - ru mirrors en: same keys, same list lengths, same {placeholders};
 *   plural sets have every form the language needs (en: one/other,
 *   ru: one/few/many/other).
 * - every key the code asks for exists: t('…') / list('…') in js/, and
 *   data-i18n / data-i18n-html / data-i18n-attr in index.html.
 * - the English fallback text in index.html matches en (so the page reads
 *   right even before the script runs).
 * Warns (without failing) about Russian strings left identical to English.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '../..');
const PLURAL_FORMS = { en: ['one', 'other'], ru: ['one', 'few', 'many', 'other'] };
const CATEGORIES = new Set(['zero', 'one', 'two', 'few', 'many', 'other']);

const problems = [];
const warnings = [];
const placeholders = (s) => [...String(s).matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');
const isPlural = (v) => v && typeof v === 'object' && !Array.isArray(v)
    && Object.keys(v).length > 0 && Object.keys(v).every((k) => CATEGORIES.has(k)) && 'other' in v;

function compare(a, b, path, code) {
    if (isPlural(a)) {
        if (!isPlural(b)) return problems.push(`${path}: expected a plural set`);
        for (const form of PLURAL_FORMS[code]) {
            if (!(form in b)) problems.push(`${path}.${form}: missing plural form`);
        }
        const want = placeholders(a.other);
        for (const [form, text] of Object.entries(b)) {
            if (placeholders(text) !== want) problems.push(`${path}.${form}: placeholders ${placeholders(text) || 'none'} ≠ ${want || 'none'}`);
        }
        return;
    }
    if (Array.isArray(a)) {
        if (!Array.isArray(b)) return problems.push(`${path}: expected a list`);
        if (a.length !== b.length) problems.push(`${path}: ${b.length} items, English has ${a.length}`);
        a.forEach((item, i) => compare(item, b[i], `${path}[${i}]`, code));
        return;
    }
    if (a && typeof a === 'object') {
        if (!b || typeof b !== 'object') return problems.push(`${path}: expected an object`);
        for (const key of Object.keys(a)) {
            if (!(key in b)) problems.push(`${path}.${key}: missing`);
            else compare(a[key], b[key], `${path}.${key}`, code);
        }
        for (const key of Object.keys(b)) if (!(key in a)) problems.push(`${path}.${key}: not in English`);
        return;
    }
    if (typeof a === 'string') {
        if (typeof b !== 'string') return problems.push(`${path}: not a string`);
        if (a.trim() && !b.trim()) problems.push(`${path}: empty`);
        if (placeholders(a) !== placeholders(b)) problems.push(`${path}: placeholders ${placeholders(b) || 'none'} ≠ ${placeholders(a) || 'none'}`);
        if (a === b && /[a-z]{3,}\s+[a-z]{3,}/i.test(a.replace(/<[^>]+>/g, ''))) warnings.push(`${path}: same as English — "${a.slice(0, 60)}"`);
        return;
    }
    if (a !== b) problems.push(`${path}: must stay ${JSON.stringify(a)}`);
}

const { default: en } = await import(join(here, 'en.js'));
const { default: ru } = await import(join(here, 'ru.js'));
compare(en, ru, 'ru', 'ru');
for (const area of ['ui', 'content', 'chain', 'term', 'netrun']) {
    if (!Object.keys(en[area] ?? {}).length) warnings.push(`en.${area}: empty`);
}

// Keys the code asks for.
const lookup = (key) => key.split('.').reduce((node, part) => (node == null ? undefined : node[part]), en);
function walk(dir, out = []) {
    for (const name of readdirSync(dir)) {
        const file = join(dir, name);
        if (statSync(file).isDirectory()) {
            if (file !== here) walk(file, out);
        } else if (name.endsWith('.js')) out.push(file);
    }
    return out;
}
for (const file of walk(join(repo, 'js'))) {
    const src = readFileSync(file, 'utf8');
    for (const m of src.matchAll(/\b(?:t|list)\(\s*(['"`])([a-zA-Z][\w.]*)\1/g)) {
        if (lookup(m[2]) == null) problems.push(`${relative(repo, file)}: t('${m[2]}') is not in en`);
    }
}

const html = readFileSync(join(repo, 'index.html'), 'utf8');
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
const squash = (s) => decode(s).replace(/\s+/g, ' ').trim();
for (const m of html.matchAll(/data-i18n="([^"]+)"[^>]*>([^<]*)</g)) {
    const value = lookup(m[1]);
    if (value == null) problems.push(`index.html: data-i18n="${m[1]}" is not in en`);
    else if (typeof value === 'string' && squash(m[2]) !== squash(value)) problems.push(`index.html: "${squash(m[2]).slice(0, 50)}" ≠ en.${m[1]} "${squash(value).slice(0, 50)}"`);
}
for (const m of html.matchAll(/data-i18n-html="([^"]+)"/g)) {
    if (lookup(m[1]) == null) problems.push(`index.html: data-i18n-html="${m[1]}" is not in en`);
}
for (const m of html.matchAll(/data-i18n-attr="([^"]+)"/g)) {
    for (const pair of m[1].split(';')) {
        const key = pair.split(':')[1]?.trim();
        if (key && lookup(key) == null) problems.push(`index.html: data-i18n-attr key "${key}" is not in en`);
    }
}

for (const w of warnings) console.log(`  ! ${w}`);
console.log(problems.length ? `✗ ${problems.length} problem(s)\n  ${problems.join('\n  ')}` : '✓ en/ru dictionaries and keys');
process.exit(problems.length ? 1 : 0);
