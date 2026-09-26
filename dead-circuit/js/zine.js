/**
 * The single-column mobile edition of the free preview: cover, the letter,
 * the first dispatch, the first ten minutes and the 72 hours. The rest of
 * the issue is only in the paid PDF, so the zine ends with a locked list.
 */
import { html, raw } from './dom.js';
import { rich, t } from './i18n.js';
import { PAGE_COUNT, PREVIEW, folioOf } from './issue.js';
import { PRICE_LABEL } from './offer.js';

const ART = '/dead-circuit/art';

/** The contents entries that are not in the preview, as an HTML list. */
export function lockedList(L) {
    const items = L.toc.filter((item) => !PREVIEW.includes(item.id));
    return raw(String(html`
      <ol class="locked-items">
        ${items.map((item) => html`<li><span class="toc-n">${folioOf(item.id)}</span><span><strong>${item.title}</strong><em>${item.deck}</em></span></li>`)}
      </ol>`));
}

/** Everything below the zine's header bar, in language L. */
export function zineBody(L) {
    const S = L.sheet;
    const Z = L.zine;
    const D = L.dispatch.d1;
    const K = L.reader.locked;
    const day = L.builds.find((item) => item.id === 'day');

    return String(html`
    <section class="zine-cover">
      <img src="${ART}/cover.jpg" alt="">
      <div>
        <p>${Z.cover.kicker}</p>
        <h1>${rich(Z.cover.title)}</h1>
        <span>${Z.cover.tagline}</span>
      </div>
    </section>

    <section class="zine-letter">
      <p class="kicker">${S.letter.kicker}</p>
      <h2>${S.letter.title}</h2>
      ${Z.letter.body.map((p) => html`<p>${p}</p>`)}
    </section>

    <section class="zine-dispatch">
      <img src="${ART}/avenue.jpg" alt="">
      <p class="kicker kicker-volt">${D.kicker} · ${D.stamp}</p>
      <h2>${D.title}</h2>
      ${D.body.map((p) => html`<p>${p}</p>`)}
      <p class="dispatch-sign">${D.sign}</p>
    </section>

    <section class="zine-ink">
      <p class="kicker kicker-volt">${S.minutes.kicker}</p>
      <h2>${Z.minutes.title}</h2>
      <ol>
        ${L.minutes.map((step) => html`<li><span>${step.n}</span><div><h3>${step.title}</h3><p>${step.body}</p></div></li>`)}
      </ol>
      <img src="${ART}/avenue.jpg" alt="${Z.minutes.photoAlt}">
    </section>

    <section class="zine-steps">
      <p class="kicker">${day.kicker}</p>
      <h2>${day.title}</h2>
      <p>${day.dek}</p>
      <ol>
        ${day.steps.map((step) => html`<li><span>${step.n}</span><div><h3>${step.title}</h3><p>${step.body}</p></div></li>`)}
      </ol>
      <p>${day.foot}</p>
    </section>

    <section class="zine-locked">
      <p class="kicker kicker-volt">${K.kicker}</p>
      <h2>${t(K.title, { count: PAGE_COUNT - PREVIEW.length })}</h2>
      <p>${K.body}</p>
      <a class="buy buy-volt" href="/dead-circuit/">${t(K.cta, { price: PRICE_LABEL })}</a>
      <h3>${K.listTitle}</h3>
      ${lockedList(L)}
    </section>`);
}
