/**
 * The 26 desktop spreads of issue 01, rendered as HTML strings.
 * `sheets(L, { linked })` returns one string per page in language L; with
 * `linked` the contents page renders its entries as buttons carrying `data-go`.
 */
import { html } from './dom.js';
import { rich } from './i18n.js';

const ART = '/dead-circuit/art';

const FOLIOS = {
    day: '05', water: '08', food: '09', heat: '10', power: '11', faraday: '12', cache: '14',
    waste: '15', med: '16', denial: '22', emp: '23', runners: '24', tools: '25'
};

export function sheets(L, { linked = false } = {}) {
    const { arms, builds, checklist, hungers, machines, minutes, patterns, peopleRules, primer, shelterRules, specs, toc } = L;
    const S = L.sheet;

    const folio = (n, light = false) => html`
    <footer class="${light ? 'folio folio-light' : 'folio'}">
      <span>Dead Circuit</span><span>${S.folioIssue}</span><span>${n}</span>
    </footer>`;

    function build(id) {
    const page = builds.find((item) => item.id === id);
    if (!page) return html``;
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
      ${folio(FOLIOS[id] ?? '00', page.light)}
    </article>`;
    }

    const tocEntry = (item) => html`
    <span class="toc-n">${item.n}</span>
    <span><strong>${item.title}</strong><em>${item.deck}</em></span>`;

    const all = [
        html`
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

        html`
    <article class="sheet tone-paper spread-letter">
      <div class="letter-index">
        <p class="kicker">${S.letter.indexKicker}</p>
        <h2 class="index-title">${rich(S.letter.indexTitle)}</h2>
        <ol class="toc">
          ${primer.map((item) => html`<li><div class="toc-static">${tocEntry(item)}</div></li>`)}
        </ol>
      </div>
      <div class="letter-body">
        <p class="kicker">${S.letter.kicker}</p>
        <h2>${S.letter.title}</h2>
        ${S.letter.body.map((p) => html`<p>${p}</p>`)}
        <p class="letter-sign">${S.letter.sign}</p>
      </div>
      ${folio('02')}
    </article>`,

        html`
    <article class="sheet tone-paper spread-contents">
      <p class="kicker">${S.contents.kicker}</p>
      <h2>${S.contents.title}</h2>
      <ol class="contents-grid">
        ${toc.map((item) => html`<li>${linked
            ? html`<button type="button" data-go="${item.page}">${tocEntry(item)}</button>`
            : html`<div class="toc-static">${tocEntry(item)}</div>`}</li>`)}
      </ol>
      ${folio('03')}
    </article>`,

        html`
    <article class="sheet tone-ink spread-minutes">
      <header class="spread-head light">
        <p class="kicker kicker-volt">${S.minutes.kicker}</p>
        <h2>${S.minutes.title}</h2>
      </header>
      <div class="minute-grid">
        ${minutes.map((step) => html`<section><span>${step.n}</span><h3>${step.title}</h3><p>${step.body}</p></section>`)}
      </div>
      <figure class="minute-photo">
        <img src="${ART}/avenue.jpg" alt="${S.minutes.photoAlt}">
        <figcaption>${S.minutes.caption}</figcaption>
      </figure>
      ${folio('04', true)}
    </article>`,

        build('day'),

        html`
    <article class="sheet tone-paper spread-pattern">
      <div class="pattern-quote">
        <p class="kicker">${S.pattern.kicker}</p>
        <blockquote>${S.pattern.quote}</blockquote>
      </div>
      <div class="pattern-side">
        <img src="${ART}/avenue.jpg" alt="">
        <ul>
          ${patterns.map((item) => html`<li><strong>${item.title}</strong><span>${item.body}</span></li>`)}
        </ul>
      </div>
      ${folio('06')}
    </article>`,

        html`
    <article class="sheet tone-hazard spread-starve">
      <header class="spread-head">
        <p class="kicker">${S.starve.kicker}</p>
        <h2>${S.starve.title}</h2>
        <p class="dek">${S.starve.dek}</p>
      </header>
      <div class="hunger-list">
        ${hungers.map((row) => html`<section><h3>${row.need}</h3><p>${row.deny}</p></section>`)}
      </div>
      ${folio('07')}
    </article>`,

        build('water'),
        build('food'),
        build('heat'),
        build('power'),
        build('faraday'),

        html`
    <article class="sheet tone-paper spread-shelter">
      <figure>
        <img src="${ART}/shelter.jpg" alt="${S.shelter.photoAlt}">
        <figcaption>${S.shelter.caption}</figcaption>
      </figure>
      <div class="shelter-copy">
        <p class="kicker">${S.shelter.kicker}</p>
        <h2>${S.shelter.title}</h2>
        <ul>
          ${shelterRules.map((rule) => html`<li><strong>${rule.k}</strong><span>${rule.v}</span></li>`)}
        </ul>
        <p class="shelter-foot">${S.shelter.foot}</p>
      </div>
      ${folio('13')}
    </article>`,

        build('cache'),
        build('waste'),
        build('med'),

        html`
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
      ${folio('17', true)}
    </article>`,

        html`
    <article class="sheet tone-paper spread-people">
      <header class="spread-head">
        <p class="kicker">${S.people.kicker}</p>
        <h2>${S.people.title}</h2>
      </header>
      <ol class="people-list">
        ${peopleRules.map((rule) => html`<li><span>${rule.n}</span><div><h3>${rule.t}</h3><p>${rule.d}</p></div></li>`)}
      </ol>
      <p class="people-pull">${S.people.pull}</p>
      ${folio('18')}
    </article>`,

        html`
    <article class="sheet tone-ink spread-bots">
      <figure>
        <img src="${ART}/machine.jpg" alt="${S.bots.photoAlt}">
      </figure>
      <div class="bots-copy">
        <p class="kicker kicker-volt">${S.bots.kicker}</p>
        <h2>${S.bots.title}</h2>
        <div class="bot-grid">
          ${machines.map((bot) => html`<section><p>${bot.kind}</p><h3>${bot.name}</h3><span>${bot.body}</span></section>`)}
        </div>
        <p class="bots-rule">${S.bots.rule}</p>
      </div>
      ${folio('19', true)}
    </article>`,

        html`
    <article class="sheet tone-paper spread-specs">
      <header class="spread-head">
        <p class="kicker">${S.specs.kicker}</p>
        <h2>${S.specs.title}</h2>
      </header>
      <div class="spec-grid">
        ${specs.map((item) => html`<section><strong>${item.n}</strong><h3>${item.l}</h3><p>${item.d}</p></section>`)}
      </div>
      <p class="source-line">${S.specs.source}</p>
      ${folio('20')}
    </article>`,

        html`
    <article class="sheet tone-ink spread-arms">
      <header class="spread-head light">
        <p class="kicker kicker-volt">${S.arms.kicker}</p>
        <h2>${S.arms.title}</h2>
      </header>
      <div class="arm-list">
        ${arms.map((item) => html`<section><h3>${item.name}</h3><p>${item.d}</p></section>`)}
      </div>
      <p class="arms-foot">${S.arms.foot}</p>
      ${folio('21', true)}
    </article>`,

        build('denial'),
        build('emp'),
        build('runners'),
        build('tools'),

        html`
    <article class="sheet tone-volt spread-end">
      <div class="end-list">
        <p class="kicker">${S.end.kicker}</p>
        <h2>${S.end.title}</h2>
        <ol>
          ${checklist.map((item) => html`<li><span>${item.n}</span>${item.t}</li>`)}
        </ol>
      </div>
      <aside>
        <img src="${ART}/grid.jpg" alt="${S.end.photoAlt}">
        <h3>${S.end.winsTitle}</h3>
        ${S.end.wins.map((p) => html`<p>${p}</p>`)}
        <p class="end-mark">${S.end.mark}</p>
      </aside>
      ${folio('26')}
    </article>`
    ];
    return all.map(String);
}
