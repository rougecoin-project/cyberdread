/**
 * /dead-circuit/ -- the storefront: countdown, Stripe Payment Link for card,
 * published wallets for crypto.
 */
import { pages, toc } from './copy.js';
import { html, pad2 } from './dom.js';
import { DEADLINE, DEADLINE_LABEL, FULL_PRICE_LABEL, PRICE_LABEL, STRIPE_PAYMENT_LINK, WALLETS, splitLeft } from './offer.js';

const left = () => Math.max(0, DEADLINE - Date.now());
const isClosed = () => left() === 0;

const clock = () => html`
  <div class="clock" role="timer" aria-label="Time left until ${DEADLINE_LABEL}">
    ${['Days', 'Hours', 'Min', 'Sec'].map((unit, i) => html`<div><strong data-clock="${'dhms'[i]}">—</strong><span>${unit}</span></div>`)}
  </div>`;

function render() {
    const closed = isClosed();
    const buyLabel = (open) => (closed ? `Full price ${FULL_PRICE_LABEL}` : open);
    const disabled = closed ? 'disabled' : '';
    const d = splitLeft(left());

    return html`
  <div class="store">
    <header class="store-bar">
      <p>Dead Circuit <span>01</span></p>
      <div class="store-bar-end">
        <p class="store-deadline">${closed ? 'Window closed' : DEADLINE_LABEL}</p>
        <button type="button" class="buy" data-buy="card" ${disabled}>${buyLabel(`Half off — ${PRICE_LABEL}`)}</button>
      </div>
    </header>

    <section class="store-hero">
      <img src="/dead-circuit/art/cover.jpg" alt="Cover of Dead Circuit, issue 01.">
      <div>
        <p class="kicker kicker-volt">Predicted dawn · ${DEADLINE_LABEL}</p>
        <h1>${closed ? 'The half-off window is closed.' : 'Half off until the dawn. Then it doubles.'}</h1>
        <p class="price-lock">
          ${closed
            ? html`<strong>${FULL_PRICE_LABEL}</strong>`
            : html`<s>${FULL_PRICE_LABEL}</s><strong>${PRICE_LABEL}</strong>`}
          <span>${closed ? 'Full price.' : 'The real price is $48. This is half off, and the clock does not reset.'}</span>
        </p>
        ${clock()}
        <div class="buy-row">
          <button type="button" class="buy" data-buy="card" ${disabled}>${buyLabel(`Pay by card — ${PRICE_LABEL}`)}</button>
          <button type="button" class="buy buy-volt" data-buy="crypto" ${disabled}>Pay with crypto</button>
        </div>
        <p class="store-deck">
          ${pages.length} pages. Card opens Stripe at ${PRICE_LABEL} and brings you back to the file.
          Crypto is the same file once ${PRICE_LABEL} hits one wallet.
        </p>
        <p class="store-note" data-ref="note" hidden></p>
        <ul class="wallet-list" data-ref="wallets" hidden>
          ${WALLETS.map((row) => html`
            <li><strong>${row.label}</strong><span>${row.address}</span><button type="button" data-copy="${row.address}">Copy</button></li>`)}
        </ul>
        <a href="/dead-circuit/thanks/" class="store-sample">Already paid? Take the file</a>
        <a href="/dead-circuit/read/" class="store-sample store-sample-second">Look inside the issue</a>
      </div>
    </section>

    <section class="store-paper">
      <p class="kicker">In the file</p>
      <h2>What half-off ${PRICE_LABEL} buys. Full price is ${FULL_PRICE_LABEL}.</h2>
      <ol>
        ${toc.map((item) => html`<li><span>${item.n}</span><div><strong>${item.title}</strong><em>${item.deck}</em></div></li>`)}
      </ol>
    </section>

    <section class="store-volt">
      <p class="kicker">The limit</p>
      <h2>After the dawn this doubles to ${FULL_PRICE_LABEL}.</h2>
      ${clock()}
      <button type="button" class="buy" data-buy="card" ${disabled}>${buyLabel(`Get the issue — ${PRICE_LABEL}`)}</button>
    </section>

    <section class="store-end">
      <h2>Half off now. ${FULL_PRICE_LABEL} when the clock hits zero.</h2>
      <p>
        Pay by card and Stripe charges ${PRICE_LABEL}, then sends you straight to the file. Pay with crypto by
        sending ${PRICE_LABEL} to one wallet, then paste the transaction id on Take the file. After ${DEADLINE_LABEL} the price is
        ${FULL_PRICE_LABEL}.
      </p>
      <button type="button" class="buy buy-volt" data-buy="card" ${disabled}>${buyLabel(`Pay ${PRICE_LABEL}, half of ${FULL_PRICE_LABEL}`)}</button>
      <a href="/dead-circuit/gate/" class="store-gate">dc@gate:~$</a>
    </section>

    <div class="store-dock">
      <p data-ref="dock">${closed ? 'Closed' : `${d.d}d ${d.h}h`}</p>
      <button type="button" class="buy" data-buy="card" ${disabled}>${closed ? FULL_PRICE_LABEL : PRICE_LABEL}</button>
    </div>
  </div>`;
}

const root = document.getElementById('app');
let wasClosed = isClosed();
root.innerHTML = String(render());

const ref = (name) => root.querySelector(`[data-ref="${name}"]`);

function tick() {
    // Re-render once when the window closes so every button and label flips.
    if (isClosed() !== wasClosed) {
        wasClosed = isClosed();
        root.innerHTML = String(render());
    }
    const part = splitLeft(left());
    root.querySelectorAll('[data-clock]').forEach((cell) => {
        cell.textContent = pad2(part[cell.dataset.clock]);
    });
    const dock = ref('dock');
    if (dock) dock.textContent = wasClosed ? 'Closed' : `${part.d}d ${part.h}h`;
}
tick();
setInterval(tick, 1000);

function note(text) {
    const el = ref('note');
    el.textContent = text;
    el.hidden = !text;
}

root.addEventListener('click', (event) => {
    const buy = event.target.closest('[data-buy]');
    if (buy) {
        if (isClosed()) return;
        if (buy.dataset.buy === 'card') {
            buy.textContent = 'Opening Stripe…';
            window.location.assign(STRIPE_PAYMENT_LINK);
            return;
        }
        note(`Send ${PRICE_LABEL} on one chain. That is half of ${FULL_PRICE_LABEL}. Send it in one transfer from a regular wallet, then paste the transaction id on Take the file.`);
        ref('wallets').hidden = false;
        return;
    }

    const copy = event.target.closest('[data-copy]');
    if (copy) {
        navigator.clipboard?.writeText(copy.dataset.copy).then(() => {
            root.querySelectorAll('[data-copy]').forEach((b) => { b.textContent = 'Copy'; });
            copy.textContent = 'Copied';
        }).catch(() => {});
    }
});
