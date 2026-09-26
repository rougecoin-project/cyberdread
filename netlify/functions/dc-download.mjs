/**
 * GET /.netlify/functions/dc-download?t=<token>
 *
 * Streams the Dead Circuit PDF for a valid token from dc-claim. The repo is
 * public, so the plain PDF is never in it. Sources, in order:
 *   1. Netlify Blobs, store `dead-circuit`, key `issue-01.pdf`, if uploaded.
 *   2. The sealed copy bundled with this function, decrypted with DC_PDF_KEY
 *      (see ../lib/dead-circuit/sealed-pdf.mjs).
 */
import { getStore } from '@netlify/blobs';
import { readToken } from '../lib/dead-circuit/tokens.mjs';
import { openSealedPdf, streamBuffer } from '../lib/dead-circuit/sealed-pdf.mjs';

const STORE = 'dead-circuit';
const KEY = 'issue-01.pdf';
const FILE_NAME = 'Dead-Circuit-Issue-01.pdf';

const text = (body, status) =>
    new Response(body, { status, headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' } });

const pdfHeaders = (length) => ({
    'content-type': 'application/pdf',
    'content-disposition': `attachment; filename="${FILE_NAME}"`,
    'cache-control': 'private, no-store',
    'x-robots-tag': 'noindex',
    ...(length ? { 'content-length': String(length) } : {})
});

async function fromBlobs() {
    try {
        return await getStore(STORE).get(KEY, { type: 'stream' });
    } catch (error) {
        console.warn('Blobs unavailable, trying the sealed copy:', error);
        return null;
    }
}

export default async (request) => {
    const token = new URL(request.url).searchParams.get('t');
    if (!readToken(token)) return text('This download link has expired. Go back and take the file again.', 403);

    try {
        const blob = await fromBlobs();
        if (blob) return new Response(blob, { headers: pdfHeaders() });

        const pdf = await openSealedPdf();
        if (pdf) return new Response(streamBuffer(pdf), { headers: pdfHeaders(pdf.length) });

        return text('The issue has not been uploaded yet.', 503);
    } catch (error) {
        console.error('dc-download failed:', error);
        return text('Could not load the file. Try again.', 500);
    }
};

export const config = { path: '/.netlify/functions/dc-download' };
