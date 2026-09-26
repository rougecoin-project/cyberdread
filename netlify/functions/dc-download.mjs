/**
 * GET /.netlify/functions/dc-download?t=<token>
 *
 * Streams the Dead Circuit PDF for a valid token from dc-claim. The PDF is
 * not in the repo (the repo is public); it lives in the Netlify Blobs store
 * `dead-circuit` under the key `issue-01.pdf`. See the README to upload it.
 */
import { getStore } from '@netlify/blobs';
import { readToken } from '../lib/dead-circuit/tokens.mjs';

const STORE = 'dead-circuit';
const KEY = 'issue-01.pdf';
const FILE_NAME = 'Dead-Circuit-Issue-01.pdf';

const text = (body, status) =>
    new Response(body, { status, headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' } });

export default async (request) => {
    const token = new URL(request.url).searchParams.get('t');
    if (!readToken(token)) return text('This download link has expired. Go back and take the file again.', 403);

    try {
        const pdf = await getStore(STORE).get(KEY, { type: 'stream' });
        if (!pdf) return text('The issue has not been uploaded yet.', 503);
        return new Response(pdf, {
            headers: {
                'content-type': 'application/pdf',
                'content-disposition': `attachment; filename="${FILE_NAME}"`,
                'cache-control': 'private, no-store',
                'x-robots-tag': 'noindex'
            }
        });
    } catch (error) {
        console.error('dc-download failed:', error);
        return text('Could not load the file. Try again.', 500);
    }
};

export const config = { path: '/.netlify/functions/dc-download' };
