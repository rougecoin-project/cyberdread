/**
 * The offer. Edit this file to change price, deadline, the Stripe link or the
 * wallets -- the store page reads everything from here.
 */

/** Fixed close. 11 Nov 2026, 00:00 America/New_York (EST). Does not reset. */
export const DEADLINE = Date.parse('2026-11-11T05:00:00.000Z');
export const DEADLINE_LABEL = '11 Nov 2026, midnight Eastern';
export const PRICE_LABEL = '$24';
export const FULL_PRICE_LABEL = '$48';

/** Card checkout is a Stripe Payment Link, so no server is involved. */
export const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/8x27sL7LD0hp7MegO87EQ05';

export const WALLETS = [
    { label: 'ETH on Base', address: '0xf0e8d6E3E5a5aE77A9036bE1B8E2cc73a1F995b5' },
    { label: 'XRGE', address: '0xAFfF1f3A68DF9E2Bc106A4B95377118172a1aDC5' },
    { label: 'BTC', address: '3Jvskgc7gxTzGDm8CedWyqJRYNwZzhNSmv' },
    { label: 'SOL', address: 'E5NqKak2XzURKV1QGdHaDQ4GoznAvLRkyz7eEKorziMb' }
];

export const PDF_URL = '/dead-circuit/dead-circuit-issue-01.pdf';
export const PDF_NAME = 'Dead-Circuit-Issue-01.pdf';

export function splitLeft(ms) {
    const seconds = Math.floor(Math.max(0, ms) / 1000);
    return {
        d: Math.floor(seconds / 86400),
        h: Math.floor((seconds % 86400) / 3600),
        m: Math.floor((seconds % 3600) / 60),
        s: seconds % 60
    };
}
