/**
 * Checks that a language file mirrors en.js: same keys, same array lengths,
 * the same untranslatable values (id, tone, light, page, n), the same
 * {placeholders}, and the same | and *emphasis* markers where English has them.
 *
 *   node dead-circuit/js/i18n/check.mjs es ja zh
 *   node dead-circuit/js/i18n/check.mjs          (every language)
 */
import { readdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const FIXED = new Set(['id', 'tone', 'light', 'page', 'n', 'code', 'dir']);

const placeholders = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');

function compare(en, other, path, problems) {
    if (Array.isArray(en)) {
        if (!Array.isArray(other)) return problems.push(`${path}: expected an array`);
        if (en.length !== other.length) problems.push(`${path}: ${other.length} items, English has ${en.length}`);
        en.forEach((item, i) => compare(item, other[i], `${path}[${i}]`, problems));
        return;
    }
    if (en && typeof en === 'object') {
        if (!other || typeof other !== 'object') return problems.push(`${path}: expected an object`);
        for (const key of Object.keys(en)) {
            if (!(key in other)) problems.push(`${path}.${key}: missing`);
            else if (FIXED.has(key)) {
                if (en[key] !== other[key] && !(key === 'code' || key === 'dir')) problems.push(`${path}.${key}: must stay ${JSON.stringify(en[key])}`);
            } else compare(en[key], other[key], `${path}.${key}`, problems);
        }
        for (const key of Object.keys(other)) if (!(key in en)) problems.push(`${path}.${key}: not in English`);
        return;
    }
    if (typeof en === 'string') {
        if (typeof other !== 'string' || !other.trim()) return problems.push(`${path}: empty or not a string`);
        if (placeholders(en) !== placeholders(other)) problems.push(`${path}: placeholders ${placeholders(other) || 'none'} ≠ ${placeholders(en)}`);
        if (en.includes('*') && (other.match(/\*/g) ?? []).length !== 2) problems.push(`${path}: needs one *emphasis*`);
        if (en.includes('|') && !other.includes('|')) problems.push(`${path}: needs | line breaks`);
        return;
    }
    if (en !== other) problems.push(`${path}: must stay ${JSON.stringify(en)}`);
}

const { default: en } = await import(`${here}/en.js`);
const codes = process.argv.slice(2).length
    ? process.argv.slice(2)
    : readdirSync(here).filter((f) => /^[a-z]{2}\.js$/.test(f) && f !== 'en.js').map((f) => f.slice(0, 2));

let failed = false;
for (const code of codes) {
    const { default: other } = await import(`${here}/${code}.js`);
    const problems = [];
    compare(en, other, code, problems);
    if (other.code !== code) problems.push(`${code}.code: must be "${code}"`);
    console.log(problems.length ? `✗ ${code}\n  ${problems.join('\n  ')}` : `✓ ${code}`);
    failed ||= problems.length > 0;
}
process.exit(failed ? 1 : 0);
