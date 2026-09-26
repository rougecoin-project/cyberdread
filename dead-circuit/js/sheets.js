/**
 * The desktop spreads of issue 01, rendered as HTML strings.
 *
 * `sheets(L, { ids, linked })` returns one string per page id (default: the
 * whole issue in PAGE_ORDER). Paid pages need the sealed content merged into
 * L (see withContent in issue.js); the site only ever renders PREVIEW ids.
 * With `linked`, contents entries become buttons carrying `data-go="<id>"`.
 */
import { html, raw } from './dom.js';
import { rich } from './i18n.js';
import { PAGE_ORDER, folioOf } from './issue.js';

const ART = '/dead-circuit/art';

/** Photo for each dispatch. */
const DISPATCH_ART = { d1: 'avenue', d2: 'shelter', d3: 'night', d4: 'cover', d5: 'machine', d6: 'grid' };

/* ------------------------------------------------------------ drawings */
/* Numbers only inside the drawings; every word lives in the translated
   legend next to them, so no drawing needs translating or mirroring. */

const pin = (n, x, y) => `<g class="pin"><circle cx="${x}" cy="${y}" r="13"/><text x="${x}" y="${y + 4.5}">${n}</text></g>`;

const STOVE_SVG = raw(`<svg viewBox="0 0 420 470" class="drawing" role="img" aria-hidden="true">
  <line class="ground" x1="20" y1="432" x2="400" y2="432"/>
  <path class="hatch" d="M30 432l-12 14M60 432l-12 14M90 432l-12 14M120 432l-12 14M150 432l-12 14M180 432l-12 14M210 432l-12 14M240 432l-12 14M270 432l-12 14M300 432l-12 14M330 432l-12 14M360 432l-12 14M390 432l-12 14"/>
  <path class="metal" d="M110 368 V172 H310 V432 H110 V412"/>
  <path class="metal" d="M110 172 H175 M245 172 H310"/>
  <rect class="metal fill-soft" x="175" y="146" width="70" height="236"/>
  <path class="fire" d="M150 430c6-18-8-26 4-44 2 14 12 16 10 30 8-8 6-18 4-26 14 12 18 28 8 40z"/>
  <path class="fire" d="M200 430c4-14-6-20 3-34 2 10 10 12 8 23 6-6 5-14 3-20 11 9 14 21 6 31z"/>
  <path class="air" d="M40 394 H120"/><path class="air-head" d="M120 394l-12-7v14z"/>
  <path class="air" d="M210 360 V200"/><path class="air-head" d="M210 190l-7 12h14z"/>
  <path class="air" d="M250 132 C 290 132 300 116 330 104"/><path class="air-head" d="M336 101l-14 1 7 11z"/>
  <path class="air" d="M170 132 C 130 132 120 116 90 104"/><path class="air-head" d="M84 101l14 1-7 11z"/>
  <rect class="metal fill-pot" x="135" y="70" width="150" height="58" rx="6"/>
  <path class="metal" d="M150 128 v10 M270 128 v10"/>
  ${pin(1, 346, 300)}${pin(2, 72, 420)}${pin(3, 44, 364)}${pin(4, 276, 232)}${pin(5, 330, 70)}${pin(6, 392, 408)}
</svg>`);

const BOX_SVG = raw(`<svg viewBox="0 0 440 380" class="drawing" role="img" aria-hidden="true">
  <rect class="metal fill-soft" x="80" y="118" width="264" height="232" rx="6"/>
  <rect class="liner" x="98" y="136" width="228" height="196" rx="3"/>
  <rect class="metal fill-pot" x="68" y="88" width="288" height="30" rx="4"/>
  <path class="foil" d="M72 118 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6 l10 -6 l10 6"/>
  <rect class="device" x="150" y="190" width="62" height="112" rx="10"/>
  <rect class="device" x="232" y="232" width="44" height="64" rx="4"/>
  <path class="device-line" d="M246 232 v-8 h16 v8"/>
  <path class="cable" d="M344 262 C 372 262 384 240 414 236"/>
  <path class="no" d="M368 226 l30 30 M398 226 l-30 30"/>
  ${pin(1, 60, 250)}${pin(2, 382, 96)}${pin(3, 112, 346)}${pin(4, 244, 176)}${pin(5, 404, 286)}
</svg>`);

const ICONS = {
    settle: raw('<svg viewBox="0 0 64 64" class="glyph" aria-hidden="true"><path class="metal" d="M18 12h28v40a6 6 0 0 1-6 6H24a6 6 0 0 1-6-6z"/><path class="water" d="M19 26h26"/><path class="silt" d="M20 50h24M22 46h20"/></svg>'),
    clear: raw('<svg viewBox="0 0 64 64" class="glyph" aria-hidden="true"><path class="metal" d="M10 10h44L36 34v8h-8v-8z"/><path class="water" d="M32 46v10M28 58h8"/></svg>'),
    treat: raw('<svg viewBox="0 0 64 64" class="glyph" aria-hidden="true"><path class="metal" d="M12 26h40v22a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6z"/><path class="metal" d="M8 26h48"/><path class="fire" d="M22 62c2-5-2-7 1-11 1 3 3 4 3 7 2-2 2-4 1-6 4 3 5 7 2 10z"/><path class="water" d="M44 6c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/></svg>'),
    store: raw('<svg viewBox="0 0 64 64" class="glyph" aria-hidden="true"><path class="metal" d="M20 14h24v6l6 8v26a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V28l6-8z"/><path class="metal" d="M24 6h16v8H24z"/><path class="water" d="M20 38h24v8H20z"/></svg>')
};
const STAGE_ICONS = [ICONS.settle, ICONS.clear, ICONS.treat, ICONS.store];

/* ------------------------------------------------------------ pages */

export function sheets(L, { ids = PAGE_ORDER, linked = false } = {}) {
    const S = L.sheet;

    const folio = (id, light = false) => html`
    <footer class="${light ? 'folio folio-light' : 'folio'}">
      <span>Dead Circuit</span><span>${S.folioIssue}</span><span>${folioOf(id)}</span>
    </footer>`;

    const build = (id) => {
        const page = L.builds.find((item) => item.id === id);
        return html`
    <article class="sheet ${page.tone} spread-steps">
      <header class="${page.light ? 'spread-head light' : 'spread-head'}">
        <p class="${page.light ? 'kicker kicker-volt' : 'kicker'}">${page.kicker}</p>
        <h2>${page.title}</h2>
        <p class="dek">${page.dek}</p>
      </header>
      <div class="step-grid">
        ${page.steps.map((step) => html`
          <section><span>${step.n}</span><h3>${step.title}</h3><p>${step.body}</p></section>`)}
      </div>
      <p class="${page.light ? 'source-line source-line-light' : 'source-line'}">${page.foot}</p>
      ${folio(id, page.light)}
    </article>`;
    };

    const dispatch = (id) => {
        const D = L.dispatch[id];
        return html`
    <article class="sheet tone-ink spread-dispatch">
      <figure class="dispatch-photo">
        <img src="${ART}/${DISPATCH_ART[id]}.jpg" alt="">
        <figcaption><span>${D.stamp}</span><strong>${D.place}</strong></figcaption>
      </figure>
      <div class="dispatch-copy">
        <p class="kicker kicker-volt">${D.kicker}</p>
        <h2>${D.title}</h2>
        ${D.body.map((p) => html`<p>${p}</p>`)}
        <p class="dispatch-sign">${D.sign}</p>
      </div>
      ${folio(id, true)}
    </article>`;
    };

    const tocEntry = (item) => html`
    <span class="toc-n">${folioOf(item.id)}</span>
    <span><strong>${item.title}</strong><em>${item.deck}</em></span>`;

    const pages = {
        cover: () => html`
    <article class="sheet tone-ink cover">
      <img class="cover-photo" src="${ART}/cover.jpg" alt="">
      <div class="cover-scrim"></div>
      <div class="cover-copy">
        <p class="kicker kicker-paper">${S.cover.kicker}</p>
        <h1 class="cover-title">${rich(S.cover.title)}</h1>
        <p class="cover-deck">${S.cover.deck}</p>
      </div>
      <div class="cover-stamp"><span>${S.cover.stamp}</span><strong>01</strong></div>
      <p class="cover-bar">${S.cover.bar}</p>
    </article>`,

        letter: () => html`
    <article class="sheet tone-paper spread-letter">
      <div class="letter-index">
        <p class="kicker">${S.letter.indexKicker}</p>
        <h2 class="index-title">${rich(S.letter.indexTitle)}</h2>
        <ol class="toc">
          ${L.primer.map((item) => html`<li><div class="toc-static"><span class="toc-n">${item.n}</span><span><strong>${item.title}</strong><em>${item.deck}</em></span></div></li>`)}
        </ol>
      </div>
      <div class="letter-body">
        <p class="kicker">${S.letter.kicker}</p>
        <h2>${S.letter.title}</h2>
        ${S.letter.body.map((p) => html`<p>${p}</p>`)}
        <p class="letter-sign">${S.letter.sign}</p>
      </div>
      ${folio('letter')}
    </article>`,

        contents: () => html`
    <article class="sheet tone-paper spread-contents">
      <p class="kicker">${S.contents.kicker}</p>
      <h2>${S.contents.title}</h2>
      <ol class="contents-grid">
        ${L.toc.map((item) => html`<li>${linked
            ? html`<button type="button" data-go="${item.id}">${tocEntry(item)}</button>`
            : html`<div class="toc-static">${tocEntry(item)}</div>`}</li>`)}
      </ol>
      <p class="contents-also">${S.contents.also}</p>
      ${folio('contents')}
    </article>`,

        minutes: () => html`
    <article class="sheet tone-ink spread-minutes">
      <header class="spread-head light">
        <p class="kicker kicker-volt">${S.minutes.kicker}</p>
        <h2>${S.minutes.title}</h2>
      </header>
      <div class="minute-grid">
        ${L.minutes.map((step) => html`<section><span>${step.n}</span><h3>${step.title}</h3><p>${step.body}</p></section>`)}
      </div>
      <figure class="minute-photo">
        <img src="${ART}/avenue.jpg" alt="${S.minutes.photoAlt}">
        <figcaption>${S.minutes.caption}</figcaption>
      </figure>
      ${folio('minutes', true)}
    </article>`,

        pattern: () => html`
    <article class="sheet tone-paper spread-pattern">
      <div class="pattern-quote">
        <p class="kicker">${S.pattern.kicker}</p>
        <blockquote>${S.pattern.quote}</blockquote>
      </div>
      <div class="pattern-side">
        <img src="${ART}/avenue.jpg" alt="">
        <ul>
          ${L.patterns.map((item) => html`<li><strong>${item.title}</strong><span>${item.body}</span></li>`)}
        </ul>
      </div>
      ${folio('pattern')}
    </article>`,

        starve: () => html`
    <article class="sheet tone-hazard spread-starve">
      <header class="spread-head">
        <p class="kicker">${S.starve.kicker}</p>
        <h2>${S.starve.title}</h2>
        <p class="dek">${S.starve.dek}</p>
      </header>
      <div class="hunger-list">
        ${L.hungers.map((row) => html`<section><h3>${row.need}</h3><p>${row.deny}</p></section>`)}
      </div>
      ${folio('starve')}
    </article>`,

        shelter: () => html`
    <article class="sheet tone-paper spread-shelter">
      <figure>
        <img src="${ART}/shelter.jpg" alt="${S.shelter.photoAlt}">
        <figcaption>${S.shelter.caption}</figcaption>
      </figure>
      <div class="shelter-copy">
        <p class="kicker">${S.shelter.kicker}</p>
        <h2>${S.shelter.title}</h2>
        <ul>
          ${L.shelterRules.map((rule) => html`<li><strong>${rule.k}</strong><span>${rule.v}</span></li>`)}
        </ul>
        <p class="shelter-foot">${S.shelter.foot}</p>
      </div>
      ${folio('shelter')}
    </article>`,

        move: () => html`
    <article class="sheet tone-ink spread-move">
      <figure>
        <img src="${ART}/night.jpg" alt="${S.move.photoAlt}">
      </figure>
      <div class="move-copy">
        <p class="kicker kicker-volt">${S.move.kicker}</p>
        <h2>${S.move.title}</h2>
        <div class="move-split">
          <section><h3>${S.move.day}</h3><p>${S.move.dayBody}</p></section>
          <section><h3>${S.move.night}</h3><p>${S.move.nightBody}</p></section>
        </div>
        <ul>
          ${S.move.rules.map((rule) => html`<li>${rule}</li>`)}
        </ul>
      </div>
      ${folio('move', true)}
    </article>`,

        people: () => html`
    <article class="sheet tone-paper spread-people">
      <header class="spread-head">
        <p class="kicker">${S.people.kicker}</p>
        <h2>${S.people.title}</h2>
      </header>
      <ol class="people-list">
        ${L.peopleRules.map((rule) => html`<li><span>${rule.n}</span><div><h3>${rule.t}</h3><p>${rule.d}</p></div></li>`)}
      </ol>
      <p class="people-pull">${S.people.pull}</p>
      ${folio('people')}
    </article>`,

        bots: () => html`
    <article class="sheet tone-ink spread-bots">
      <figure>
        <img src="${ART}/machine.jpg" alt="${S.bots.photoAlt}">
      </figure>
      <div class="bots-copy">
        <p class="kicker kicker-volt">${S.bots.kicker}</p>
        <h2>${S.bots.title}</h2>
        <div class="bot-grid">
          ${L.machines.map((bot) => html`<section><p>${bot.kind}</p><h3>${bot.name}</h3><span>${bot.body}</span></section>`)}
        </div>
        <p class="bots-rule">${S.bots.rule}</p>
      </div>
      ${folio('bots', true)}
    </article>`,

        specs: () => html`
    <article class="sheet tone-paper spread-specs">
      <header class="spread-head">
        <p class="kicker">${S.specs.kicker}</p>
        <h2>${S.specs.title}</h2>
      </header>
      <div class="spec-grid">
        ${L.specs.map((item) => html`<section><strong>${item.stat}</strong><h3>${item.l}</h3><p>${item.d}</p></section>`)}
      </div>
      <p class="source-line">${S.specs.source}</p>
      ${folio('specs')}
    </article>`,

        arms: () => html`
    <article class="sheet tone-ink spread-arms">
      <header class="spread-head light">
        <p class="kicker kicker-volt">${S.arms.kicker}</p>
        <h2>${S.arms.title}</h2>
      </header>
      <div class="arm-list">
        ${L.arms.map((item) => html`<section><h3>${item.name}</h3><p>${item.d}</p></section>`)}
      </div>
      <p class="arms-foot">${S.arms.foot}</p>
      ${folio('arms', true)}
    </article>`,

        dwater: () => {
            const W = L.diagram.water;
            return html`
    <article class="sheet tone-paper spread-diagram spread-dwater">
      <header class="spread-head">
        <p class="kicker">${W.kicker}</p>
        <h2>${W.title}</h2>
        <p class="dek">${W.dek}</p>
      </header>
      <ol class="stages">
        ${W.stages.map((stage, i) => html`<li>${STAGE_ICONS[i]}<span class="stage-n">${i + 1}</span><h3>${stage.t}</h3><p>${stage.d}</p></li>`)}
      </ol>
      <div class="dose">
        <table>
          <caption>${W.table.caption}</caption>
          <thead><tr>${W.table.head.map((h) => html`<th scope="col">${h}</th>`)}</tr></thead>
          <tbody>${W.table.rows.map(([label, ...cells]) => html`<tr><th scope="row">${label}</th>${cells.map((c) => html`<td>${c}</td>`)}</tr>`)}</tbody>
        </table>
        <p class="diagram-foot">${W.foot}</p>
      </div>
      ${folio('dwater')}
    </article>`;
        },

        dstove: () => {
            const D = L.diagram.stove;
            return html`
    <article class="sheet tone-hazard spread-diagram spread-drawing">
      <div class="drawing-wrap">${STOVE_SVG}</div>
      <div class="drawing-copy">
        <p class="kicker">${D.kicker}</p>
        <h2>${D.title}</h2>
        <p class="dek">${D.dek}</p>
        <ol class="legend">${D.callouts.map((c, i) => html`<li><span>${i + 1}</span>${c}</li>`)}</ol>
        <p class="diagram-foot">${D.foot}</p>
      </div>
      ${folio('dstove')}
    </article>`;
        },

        dbox: () => {
            const D = L.diagram.box;
            return html`
    <article class="sheet tone-ink spread-diagram spread-drawing">
      <div class="drawing-wrap">${BOX_SVG}</div>
      <div class="drawing-copy">
        <p class="kicker kicker-volt">${D.kicker}</p>
        <h2>${D.title}</h2>
        <p class="dek">${D.dek}</p>
        <ol class="legend">${D.callouts.map((c, i) => html`<li><span>${i + 1}</span>${c}</li>`)}</ol>
        <div class="box-test">
          <h3>${D.testTitle}</h3>
          <ol>${D.test.map((t) => html`<li>${t}</li>`)}</ol>
        </div>
        <p class="diagram-foot">${D.foot}</p>
      </div>
      ${folio('dbox', true)}
    </article>`;
        },

        w72: () => {
            const W = L.worksheet.w72;
            return html`
    <article class="sheet tone-paper spread-worksheet">
      <header class="spread-head">
        <p class="kicker">${W.kicker}</p>
        <h2>${W.title}</h2>
        <p class="dek">${W.dek}</p>
      </header>
      <div class="ws-grid">
        <ul class="ws-fields">
          ${W.fields.map((f) => html`<li><strong>${f.l}</strong>${f.hint ? html`<em>${f.hint}</em>` : ''}<span class="ws-line"></span></li>`)}
        </ul>
        <div class="ws-bag">
          <h3>${W.bagTitle}</h3>
          <ul>${W.bag.map((item) => html`<li><span class="ws-box"></span>${item}</li>`)}</ul>
        </div>
      </div>
      ${folio('w72')}
    </article>`;
        },

        wpower: () => {
            const W = L.worksheet.wpower;
            const blank = html`<tr>${W.head.map(() => html`<td></td>`)}</tr>`;
            return html`
    <article class="sheet tone-paper spread-worksheet spread-wpower">
      <header class="spread-head">
        <p class="kicker">${W.kicker}</p>
        <h2>${W.title}</h2>
        <p class="dek">${W.dek}</p>
      </header>
      <table class="ws-table">
        <thead><tr>${W.head.map((h) => html`<th scope="col">${h}</th>`)}</tr></thead>
        <tbody>
          <tr class="ws-example">${W.example.map((c) => html`<td>${c}</td>`)}</tr>
          ${blank}${blank}${blank}${blank}${blank}${blank}
          <tr class="ws-total"><th scope="row" colspan="3">${W.total}</th><td></td></tr>
        </tbody>
      </table>
      <ul class="ws-notes">
        <li>${W.panel}</li>
        <li>${W.battery}</li>
        <li>${W.note}</li>
      </ul>
      ${folio('wpower')}
    </article>`;
        },

        cards: () => {
            const C = L.cards;
            return html`
    <article class="sheet tone-paper spread-cards">
      <header class="spread-head">
        <p class="kicker">${C.kicker}</p>
        <h2>${C.title}</h2>
        <p class="dek">${C.dek}</p>
      </header>
      <div class="card-grid">
        ${C.items.map((card) => html`<section class="pocket-card"><span class="scissors" aria-hidden="true">✂</span><h3>${card.t}</h3><ul>${card.lines.map((line) => html`<li>${line}</li>`)}</ul><footer>Dead Circuit · 01</footer></section>`)}
      </div>
      ${folio('cards')}
    </article>`;
        },

        sources: () => {
            const R = L.sources;
            return html`
    <article class="sheet tone-paper spread-sources">
      <header class="spread-head">
        <p class="kicker">${R.kicker}</p>
        <h2>${R.title}</h2>
        <p class="dek">${R.dek}</p>
      </header>
      <ol class="source-list">
        ${R.items.map((item) => html`<li><strong>${item.t}</strong><span>${item.d}</span></li>`)}
      </ol>
      <p class="sources-note">${R.note}</p>
      ${folio('sources')}
    </article>`;
        },

        end: () => html`
    <article class="sheet tone-volt spread-end">
      <div class="end-list">
        <p class="kicker">${S.end.kicker}</p>
        <h2>${S.end.title}</h2>
        <ol>
          ${L.checklist.map((item) => html`<li><span>${item.n}</span>${item.t}</li>`)}
        </ol>
      </div>
      <aside>
        <img src="${ART}/grid.jpg" alt="${S.end.photoAlt}">
        <h3>${S.end.winsTitle}</h3>
        ${S.end.wins.map((p) => html`<p>${p}</p>`)}
        <p class="end-mark">${S.end.mark}</p>
      </aside>
      ${folio('end')}
    </article>`
    };

    return ids.map((id) => {
        if (pages[id]) return String(pages[id]());
        if (id in DISPATCH_ART) return String(dispatch(id));
        return String(build(id));
    });
}
