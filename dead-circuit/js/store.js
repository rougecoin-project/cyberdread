/**
 * /dead-circuit/ -- the storefront: countdown, Stripe Payment Link for card,
 * published wallets for crypto.
 */
import { html, pad2 } from './dom.js';
import { bindPicker, loadLanguage, picker, t } from './i18n.js';
import { DEADLINE, FULL_PRICE_LABEL, PRICE_LABEL, STRIPE_PAYMENT_LINK, WALLETS, splitLeft } from './offer.js';

const L = await loadLanguage();
const S = L.store;
const vars = { price: PRICE_LABEL, full: FULL_PRICE_LABEL, deadline: S.deadline, pages: L.pages.length };
const tr = (text, extra) => t(text, { ...vars, ...extra });

document.title = tr(L.titles.store);
document.querySelector('meta[name="description"]')?.setAttribute('content', tr(L.titles.storeDescription));

/**
 * Spreads previewed on the storefront. Captions reuse the issue's own
 * translated lines, so the preview needs no strings of its own.
 */
const PREVIEWS = [
    { art: 'avenue', caption: (L) => L.sheet.minutes.caption },
    { art: 'shelter', caption: (L) => L.sheet.shelter.caption },
    { art: 'night', caption: (L) => L.sheet.move.title },
    { art: 'machine', caption: (L) => L.sheet.bots.title }
];

const left = () => Math.max(0, DEADLINE - Date.now());
const isClosed = () => left() === 0;

const clock = () => html`
  <div class="clock" role="timer" aria-label="${tr(S.clockLabel)}">
    ${S.clockUnits.map((unit, i) => html`<div><strong data-clock="${'dhms'[i]}">—</strong><span>${unit}</span></div>`)}
  </div>`;

function render() {
    const closed = isClosed();
    const buyLabel = (open) => (closed ? tr(S.fullPrice) : tr(open));
    const disabled = closed ? 'disabled' : '';
    const d = splitLeft(left());

    return html`
  <div class="store">
    <header class="store-bar">
      <p>Dead Circuit <span>01</span></p>
      <div class="store-bar-end">
        <p class="store-deadline">${closed ? S.windowClosed : S.deadline}</p>
        ${picker(L)}
        <button type="button" class="buy" data-buy="card" ${disabled}>${buyLabel(S.barBuy)}</button>
      </div>
    </header>

    <section class="store-hero">
      <img src="/dead-circuit/art/cover.jpg" alt="${S.heroAlt}">
      <div>
        <p class="kicker kicker-volt">${tr(S.dawnKicker)}</p>
        <h1>${closed ? S.headlineClosed : S.headlineOpen}</h1>
        <p class="price-lock">
          ${closed
            ? html`<strong>${FULL_PRICE_LABEL}</strong>`
            : html`<s>${FULL_PRICE_LABEL}</s><strong>${PRICE_LABEL}</strong>`}
          <span>${closed ? S.priceNoteClosed : tr(S.priceNoteOpen)}</span>
        </p>
        ${clock()}
        <div class="buy-row">
          <button type="button" class="buy" data-buy="card" ${disabled}>${buyLabel(S.payCard)}</button>
          <button type="button" class="buy buy-volt" data-buy="crypto" ${disabled}>${S.payCrypto}</button>
        </div>
        <p class="store-deck">${tr(S.deck)}</p>
        <p class="store-note" data-ref="note" hidden></p>
        <ul class="wallet-list" data-ref="wallets" hidden>
          ${WALLETS.map((row) => html`
            <li><strong>${row.label}</strong><span dir="ltr">${row.address}</span><button type="button" data-copy="${row.address}">${S.copy}</button></li>`)}
        </ul>
        <a href="/dead-circuit/thanks/" class="store-sample">${S.alreadyPaid}</a>
        <a href="/dead-circuit/read/" class="store-sample store-sample-second">${S.lookInside}</a>
      </div>
    </section>

    <section class="store-preview">
      <p class="kicker kicker-volt">${L.sheet.letter.kicker}</p>
      <h2>${L.sheet.letter.title}</h2>
      ${L.sheet.letter.body.map((p) => html`<p class="store-preview-lede">${p}</p>`)}
      <div class="preview-grid">
        ${PREVIEWS.map(({ art, caption }) => html`
          <a class="preview-card" href="/dead-circuit/read/">
            <img src="/dead-circuit/art/${art}.jpg" alt="" loading="lazy" decoding="async">
            <span>${caption(L)}</span>
          </a>`)}
      </div>
      <a href="/dead-circuit/read/" class="buy buy-volt store-preview-cta">${S.lookInside}</a>
    </section>

    <section class="store-paper">
      <p class="kicker">${S.paperKicker}</p>
      <h2>${tr(S.paperTitle)}</h2>
      <ol>
        ${L.toc.map((item) => html`<li><span>${item.n}</span><div><strong>${item.title}</strong><em>${item.deck}</em></div></li>`)}
      </ol>
    </section>

    <section class="store-volt">
      <p class="kicker">${S.voltKicker}</p>
      <h2>${tr(S.voltTitle)}</h2>
      ${clock()}
      <button type="button" class="buy" data-buy="card" ${disabled}>${buyLabel(S.voltBuy)}</button>
    </section>

    <section class="store-end">
      <h2>${tr(S.endTitle)}</h2>
      <p>${tr(S.endBody)}</p>
      <button type="button" class="buy buy-volt" data-buy="card" ${disabled}>${buyLabel(S.endBuy)}</button>
      <a href="/dead-circuit/gate/" class="store-gate" dir="ltr">dc@gate:~$</a>
    </section>

    <div class="store-dock">
      <p data-ref="dock">${closed ? S.dockClosed : tr(S.dockLeft, d)}</p>
      <button type="button" class="buy" data-buy="card" ${disabled}>${closed ? FULL_PRICE_LABEL : PRICE_LABEL}</button>
    </div>
  </div>`;
}

const root = document.getElementById('app');
let wasClosed = isClosed();

function paint() {
    root.innerHTML = String(render());
    bindPicker(root);
}
paint();

const ref = (name) => root.querySelector(`[data-ref="${name}"]`);

function tick() {
    // Re-render once when the window closes so every button and label flips.
    if (isClosed() !== wasClosed) {
        wasClosed = isClosed();
        paint();
    }
    const part = splitLeft(left());
    root.querySelectorAll('[data-clock]').forEach((cell) => {
        cell.textContent = pad2(part[cell.dataset.clock]);
    });
    const dock = ref('dock');
    if (dock) dock.textContent = wasClosed ? S.dockClosed : tr(S.dockLeft, part);
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
            buy.textContent = S.openingStripe;
            window.location.assign(STRIPE_PAYMENT_LINK);
            return;
        }
        note(tr(S.cryptoNote));
        ref('wallets').hidden = false;
        return;
    }

    const copy = event.target.closest('[data-copy]');
    if (copy) {
        navigator.clipboard?.writeText(copy.dataset.copy).then(() => {
            root.querySelectorAll('[data-copy]').forEach((b) => { b.textContent = S.copy; });
            copy.textContent = S.copied;
        }).catch(() => {});
    }
});
