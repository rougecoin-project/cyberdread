/**
 * The offer. Edit this file to change price, deadline, the Stripe link or the
 * wallets -- the store page and the Netlify claim function both read it.
 */

/** Fixed close. 11 Nov 2026, 00:00 America/New_York (EST). Does not reset. */
export const DEADLINE = Date.parse('2026-11-11T05:00:00.000Z');
export const DEADLINE_LABEL = '11 Nov 2026, midnight Eastern';
export const PRICE_LABEL = '$24';
export const FULL_PRICE_LABEL = '$48';
export const PRICE_USD = 24;
export const FULL_PRICE_USD = 48;

/**
 * Crypto payments older than this are never accepted, so nobody can claim
 * the file with someone else's old transfer to the same wallet.
 */
export const SALE_START = Date.parse('2026-09-24T00:00:00.000Z');

/** Card checkout is a Stripe Payment Link; the claim function verifies it. */
export const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/8x27sL7LD0hp7MegO87EQ05';

/** `chain` is the id the claim function verifies against. */
export const WALLETS = [
    { chain: 'base-eth', label: 'ETH on Base', address: '0xf0e8d6E3E5a5aE77A9036bE1B8E2cc73a1F995b5' },
    { chain: 'base-xrge', label: 'XRGE', address: '0xAFfF1f3A68DF9E2Bc106A4B95377118172a1aDC5' },
    { chain: 'btc', label: 'BTC', address: '3Jvskgc7gxTzGDm8CedWyqJRYNwZzhNSmv' },
    { chain: 'sol', label: 'SOL', address: 'E5NqKak2XzURKV1QGdHaDQ4GoznAvLRkyz7eEKorziMb' }
];

/** Where people go when a claim can't be verified. */
export const SUPPORT_URL = 'https://t.me/rougecoinv3';

export function splitLeft(ms) {
    const seconds = Math.floor(Math.max(0, ms) / 1000);
    return {
        d: Math.floor(seconds / 86400),
        h: Math.floor((seconds % 86400) / 3600),
        m: Math.floor((seconds % 3600) / 60),
        s: seconds % 60
    };
}
