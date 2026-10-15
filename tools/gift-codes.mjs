/**
 * Makes Dead Circuit gift codes: each one is a free copy of issue 01
 * (a download plus a couple of retries), in the reader's language.
 *
 *   DC_PDF_KEY=<64 hex> node tools/gift-codes.mjs [count] [--csv]
 *
 * Uses the same DC_PDF_KEY as Netlify; codes made with any other key won't
 * redeem. Prints each code with its one-tap link. Codes are not stored
 * anywhere, so keep the list somewhere private, and never commit it.
 */
import { giftKey, makeCode } from '../netlify/lib/dead-circuit/gift.mjs';

const SITE = process.env.DC_SITE_URL || 'https://cyberdreadx.dev';
const args = process.argv.slice(2);
const count = Math.min(Math.max(parseInt(args.find((a) => /^\d+$/.test(a)) ?? '1', 10), 1), 1000);
const csv = args.includes('--csv');

const key = giftKey();
if (!key) {
    console.error('Set DC_PDF_KEY to the same 64-hex key configured in Netlify.');
    process.exit(1);
}

if (csv) console.log('code,link');
for (let i = 0; i < count; i++) {
    const code = makeCode(key);
    const link = `${SITE}/dead-circuit/thanks/?code=${code}`;
    console.log(csv ? `${code},${link}` : `${code}   ${link}`);
}
