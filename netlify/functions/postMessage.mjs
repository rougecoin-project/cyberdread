/**
 * POST /.netlify/functions/postMessage
 *
 * Appends a chat message. See getMessages.mjs for why this uses Netlify
 * Blobs rather than a file on disk.
 */
import { getStore } from '@netlify/blobs';

const STORE = 'dreados-chat';
const KEY = 'messages';

const MAX_NAME = 20;
const MAX_MESSAGE = 200;
const MAX_STORED = 200;

// Simple in-memory throttle. It only covers a single warm container, so it
// slows casual spam rather than guaranteeing a hard limit.
const RATE_LIMIT_MS = 3000;
const lastPostByClient = new Map();

/**
 * Trims to length and strips control characters. Output is rendered with
 * textContent on the client, so no HTML escaping is needed here.
 * @param {unknown} value
 * @param {number} maxLength
 * @returns {string}
 */
function clean(value, maxLength) {
    if (typeof value !== 'string') return '';
    return value
        .replace(/[\u0000-\u001F\u007F]/g, '')
        .trim()
        .slice(0, maxLength);
}

export default async (request) => {
    if (request.method !== 'POST') {
        return Response.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const client = request.headers.get('x-nf-client-connection-ip') || 'unknown';
    const now = Date.now();
    const previous = lastPostByClient.get(client);
    if (previous && now - previous < RATE_LIMIT_MS) {
        return Response.json({ error: 'Slow down.' }, { status: 429 });
    }

    try {
        const body = await request.json();
        const name = clean(body?.name, MAX_NAME);
        const message = clean(body?.message, MAX_MESSAGE);

        if (!name || !message) {
            return Response.json(
                { error: 'Name and message are required' },
                { status: 400 }
            );
        }

        const store = getStore(STORE);
        const messages = (await store.get(KEY, { type: 'json' })) ?? [];

        messages.push({ name, message, timestamp: new Date().toISOString() });

        // Keep the board bounded so the blob stays small.
        await store.setJSON(KEY, messages.slice(-MAX_STORED));
        lastPostByClient.set(client, now);

        return Response.json({ success: true }, { status: 201 });
    } catch (error) {
        console.error('Error saving message:', error);
        return Response.json({ error: 'Failed to save message' }, { status: 500 });
    }
};

export const config = { path: '/.netlify/functions/postMessage' };
