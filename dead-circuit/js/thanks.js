/**
 * /dead-circuit/thanks/ -- trades proof of payment for the PDF.
 * Stripe's Payment Link redirects here with ?session_id=..., which is claimed
 * automatically. Crypto buyers paste their transaction id.
 */
import { html } from './dom.js';
import { bindPicker, loadLanguage, picker, t } from './i18n.js';
import { SUPPORT_URL, WALLETS } from './offer.js';

const CLAIM_URL = '/.netlify/functions/dc-claim';

const L = await loadLanguage();
const T = L.thanks;
document.title = L.titles.thanks;

const [stuckBefore, stuckAfter] = T.stuck.split('{link}');

const root = document.getElementById('app');
root.innerHTML = String(html`
  <div class="store thanks">
    <div class="thanks-top">
      <p class="kicker kicker-volt">${T.kicker}</p>
      ${picker(L)}
    </div>
    <h1>${T.title}</h1>
    <p data-ref="status">${T.intro}</p>
    <a class="buy" data-ref="take" hidden>${T.download}</a>

    <form class="claim-form" data-ref="form">
      <label for="claim-chain">${T.chain}</label>
      <select id="claim-chain" name="chain">
        ${WALLETS.map((w) => html`<option value="${w.chain}">${w.label}</option>`)}
      </select>
      <label for="claim-tx">${T.tx}</label>
      <input id="claim-tx" name="tx" dir="ltr" autocomplete="off" autocapitalize="off" spellcheck="false"
        placeholder="${T.txPlaceholder}" required>
      <button type="submit" class="buy buy-volt">${T.check}</button>
    </form>

    <p class="claim-help">${stuckBefore}<a href="${SUPPORT_URL}" target="_blank" rel="noopener noreferrer">${T.stuckLink}</a>${stuckAfter ?? ''}</p>
    <a href="/dead-circuit/" class="store-sample">${T.back}</a>
  </div>`);
bindPicker(root);

const ref = (name) => root.querySelector(`[data-ref="${name}"]`);
const status = ref('status');
const take = ref('take');
const form = ref('form');
const submit = form.querySelector('button');

function say(text, tone) {
    status.textContent = text;
    status.dataset.tone = tone ?? '';
}

/** The server answers with a code; show it in the reader's language. */
function explain(result) {
    const template = L.errors[result.code] ?? result.message ?? L.errors.unknown;
    say(t(template, result.params ?? {}), result.pending ? 'wait' : 'bad');
}

function grant(url) {
    take.href = url;
    take.hidden = false;
    form.hidden = true;
    say(T.verified, 'ok');
    // Start the download straight away; the button stays as a fallback.
    window.location.assign(url);
}

async function claim(body) {
    try {
        const response = await fetch(CLAIM_URL, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            // The PDF comes in the language this page is showing.
            body: JSON.stringify({ ...body, lang: L.code })
        });
        return await response.json();
    } catch {
        return { ok: false, pending: true, message: T.offline };
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const chain = form.chain.value;
    const tx = form.tx.value.trim();
    if (!tx) return;
    submit.disabled = true;
    submit.textContent = T.checking;
    say(T.checking);
    const result = await claim({ method: 'crypto', chain, tx });
    submit.disabled = false;
    submit.textContent = T.check;
    if (result.ok) grant(result.url);
    else explain(result);
});

const sessionId = new URLSearchParams(window.location.search).get('session_id');
if (sessionId) {
    form.hidden = true;
    say(T.checkingStripe);
    claim({ method: 'stripe', sessionId }).then((result) => {
        if (result.ok) {
            grant(result.url);
            return;
        }
        explain(result);
        if (!result.pending) form.hidden = false;
        else setTimeout(() => window.location.reload(), 5000);
    });
}
