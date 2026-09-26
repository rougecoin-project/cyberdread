/**
 * /dead-circuit/thanks/ -- trades proof of payment for the PDF.
 * Stripe's Payment Link redirects here with ?session_id=..., which is claimed
 * automatically. Crypto buyers paste their transaction id.
 */
import { html } from './dom.js';
import { SUPPORT_URL, WALLETS } from './offer.js';

const CLAIM_URL = '/.netlify/functions/dc-claim';

const root = document.getElementById('app');
root.innerHTML = String(html`
  <div class="store thanks">
    <p class="kicker kicker-volt">Dead Circuit · Issue 01</p>
    <h1>Take the file.</h1>
    <p data-ref="status">Paid by card? Stripe sends you back here on its own. Paid with crypto? Paste the transaction below.</p>
    <a class="buy" data-ref="take" hidden>Download the PDF</a>

    <form class="claim-form" data-ref="form">
      <label for="claim-chain">Chain</label>
      <select id="claim-chain" name="chain">
        ${WALLETS.map((w) => html`<option value="${w.chain}">${w.label}</option>`)}
      </select>
      <label for="claim-tx">Transaction id</label>
      <input id="claim-tx" name="tx" autocomplete="off" autocapitalize="off" spellcheck="false"
        placeholder="0x…, txid or signature" required>
      <button type="submit" class="buy buy-volt">Check payment</button>
    </form>

    <p class="claim-help">Stuck? <a href="${SUPPORT_URL}" target="_blank" rel="noopener noreferrer">Ask on Telegram</a> with your receipt or transaction id.</p>
    <a href="/dead-circuit/" class="store-sample">Back to the offer</a>
  </div>`);

const ref = (name) => root.querySelector(`[data-ref="${name}"]`);
const status = ref('status');
const take = ref('take');
const form = ref('form');
const submit = form.querySelector('button');

function say(text, tone) {
    status.textContent = text;
    status.dataset.tone = tone ?? '';
}

function grant(url) {
    take.href = url;
    take.hidden = false;
    form.hidden = true;
    say('Verified. The link works for fifteen minutes. Save the file somewhere safe.', 'ok');
    // Start the download straight away; the button stays as a fallback.
    window.location.assign(url);
}

async function claim(body) {
    try {
        const response = await fetch(CLAIM_URL, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(body)
        });
        return await response.json();
    } catch {
        return { ok: false, pending: true, message: 'Could not reach the desk. Check your connection and try again.' };
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const chain = form.chain.value;
    const tx = form.tx.value.trim();
    if (!tx) return;
    submit.disabled = true;
    submit.textContent = 'Checking the chain…';
    say('Checking the chain…');
    const result = await claim({ method: 'crypto', chain, tx });
    submit.disabled = false;
    submit.textContent = 'Check payment';
    if (result.ok) grant(result.url);
    else say(result.message, result.pending ? 'wait' : 'bad');
});

const sessionId = new URLSearchParams(window.location.search).get('session_id');
if (sessionId) {
    form.hidden = true;
    say('Checking your card payment with Stripe…');
    claim({ method: 'stripe', sessionId }).then((result) => {
        if (result.ok) {
            grant(result.url);
            return;
        }
        say(result.message, result.pending ? 'wait' : 'bad');
        if (!result.pending) form.hidden = false;
        else setTimeout(() => window.location.reload(), 5000);
    });
}
