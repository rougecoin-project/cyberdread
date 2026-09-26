/**
 * GET /.netlify/functions/dc-download?t=<token>
 *
 * Streams the Dead Circuit PDF, in the edition named by the token, for a
 * valid token from dc-claim. The repo is public, so the plain PDFs are never
 * in it: each edition is a sealed static file decrypted here with DC_PDF_KEY
 * (see ../lib/dead-circuit/sealed-pdf.mjs).
 */
import { readToken } from '../lib/dead-circuit/tokens.mjs';
import { edition, openSealedPdf, streamBuffer } from '../lib/dead-circuit/sealed-pdf.mjs';

const text = (body, status) =>
    new Response(body, { status, headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' } });

const fileName = (code) => (code === 'en' ? 'Dead-Circuit-Issue-01.pdf' : `Dead-Circuit-Issue-01-${code.toUpperCase()}.pdf`);

export default async (request) => {
    const url = new URL(request.url);
    const claim = readToken(url.searchParams.get('t'));
    if (!claim) return text('This download link has expired. Go back and take the file again.', 403);

    const code = edition(claim.lang);
    try {
        const pdf = await openSealedPdf(code, url.origin);
        if (!pdf) return text('The issue has not been uploaded yet.', 503);
        return new Response(streamBuffer(pdf), {
            headers: {
                'content-type': 'application/pdf',
                'content-length': String(pdf.length),
                'content-disposition': `attachment; filename="${fileName(code)}"`,
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
