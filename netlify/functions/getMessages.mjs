/**
 * GET /.netlify/functions/getMessages
 *
 * Returns the most recent chat messages.
 *
 * Storage note: this used to read a messages.json file bundled next to the
 * function. Lambda filesystems are read-only outside /tmp and each
 * invocation may run on a fresh container, so writes were silently lost and
 * the board could never persist in production. It now uses Netlify Blobs,
 * which is configured automatically for functions on Netlify.
 */
import { getStore } from '@netlify/blobs';

const STORE = 'dreados-chat';
const KEY = 'messages';
const MAX_RETURNED = 100;

export default async () => {
    try {
        const store = getStore(STORE);
        const messages = (await store.get(KEY, { type: 'json' })) ?? [];

        return Response.json(messages.slice(-MAX_RETURNED), {
            headers: { 'cache-control': 'no-store' }
        });
    } catch (error) {
        console.error('Error reading messages:', error);
        return Response.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
};

export const config = { path: '/.netlify/functions/getMessages' };
