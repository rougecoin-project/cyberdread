/** The single-column mobile edition of issue 01. */
import { html } from './dom.js';
import { rich } from './i18n.js';

const ART = '/dead-circuit/art';

/** Everything below the zine's header bar, in language L. */
export function zineBody(L) {
    const { arms, builds, checklist, hungers, machines, minutes, patterns, peopleRules, shelterRules, specs } = L;
    const S = L.sheet;
    const Z = L.zine;

    function build(id) {
    const page = builds.find((item) => item.id === id);
    if (!page) return html``;
    const dark = page.tone === 'tone-ink';
    return html`
    <section class="${dark ? 'zine-ink' : 'zine-steps'}">
      <p class="${dark ? 'kicker kicker-volt' : 'kicker'}">${page.kicker}</p>
      <h2>${page.title}</h2>
      <p>${page.dek}</p>
      <ol>
        ${page.steps.map((step) => html`<li><span>${step.n}</span><div><h3>${step.title}</h3><p>${step.body}</p></div></li>`)}
      </ol>
      <p>${page.foot}</p>
    </section>`;
    }

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

    <section class="zine-ink">
      <p class="kicker kicker-volt">${S.minutes.kicker}</p>
      <h2>${Z.minutes.title}</h2>
      <ol>
        ${minutes.map((step) => html`<li><span>${step.n}</span><div><h3>${step.title}</h3><p>${step.body}</p></div></li>`)}
      </ol>
      <img src="${ART}/avenue.jpg" alt="${Z.minutes.photoAlt}">
    </section>

    ${build('day')}

    <section class="zine-quote">
      <p class="kicker">${Z.pattern.kicker}</p>
      <blockquote>${S.pattern.quote}</blockquote>
      <ul>
        ${patterns.map((item) => html`<li><strong>${item.title}</strong>${item.body}</li>`)}
      </ul>
    </section>

    <section class="zine-hazard">
      <p class="kicker">${S.starve.kicker}</p>
      <h2>${S.starve.title}</h2>
      <ul>
        ${hungers.map((row) => html`<li><h3>${row.need}</h3><p>${row.deny}</p></li>`)}
      </ul>
    </section>

    ${build('water')}
    ${build('food')}
    ${build('heat')}
    ${build('power')}
    ${build('faraday')}

    <section class="zine-photo">
      <img src="${ART}/shelter.jpg" alt="${Z.shelter.photoAlt}">
      <div>
        <p class="kicker">${Z.shelter.kicker}</p>
        <h2>${S.shelter.title}</h2>
        <ul>
          ${shelterRules.map((rule) => html`<li><strong>${rule.k}.</strong> ${rule.v}</li>`)}
        </ul>
        <p>${Z.shelter.foot}</p>
      </div>
    </section>

    ${build('cache')}
    ${build('waste')}
    ${build('med')}

    <section class="zine-ink">
      <img src="${ART}/night.jpg" alt="${Z.move.photoAlt}">
      <p class="kicker kicker-volt">${S.move.kicker}</p>
      <h2>${S.move.title}</h2>
      <p><strong>${S.move.day}.</strong> ${Z.move.day}</p>
      <p><strong>${S.move.night}.</strong> ${Z.move.night}</p>
      <p>${Z.move.foot}</p>
    </section>

    <section class="zine-people">
      <p class="kicker">${S.people.kicker}</p>
      <h2>${S.people.title}</h2>
      <ol>
        ${peopleRules.map((rule) => html`<li><span>${rule.n}</span><div><h3>${rule.t}</h3><p>${rule.d}</p></div></li>`)}
      </ol>
    </section>

    <section class="zine-ink">
      <img src="${ART}/machine.jpg" alt="${Z.bots.photoAlt}">
      <p class="kicker kicker-volt">${Z.bots.kicker}</p>
      <h2>${Z.bots.title}</h2>
      <ul class="zine-bots">
        ${machines.map((bot) => html`<li><h3>${bot.kind}<span>${bot.name}</span></h3><p>${bot.body}</p></li>`)}
      </ul>
      <p>${Z.bots.foot}</p>
    </section>

    <section class="zine-quote">
      <p class="kicker">${S.specs.kicker}</p>
      <h2>${S.specs.title}</h2>
      <ul>
        ${specs.map((item) => html`<li><strong>${item.n} — ${item.l}</strong>${item.d}</li>`)}
      </ul>
    </section>

    <section class="zine-ink">
      <p class="kicker kicker-volt">${S.arms.kicker}</p>
      <h2>${S.arms.title}</h2>
      <ul class="zine-bots">
        ${arms.map((item) => html`<li><h3>${item.name}</h3><p>${item.d}</p></li>`)}
      </ul>
      <p>${Z.arms.foot}</p>
    </section>

    ${build('denial')}
    ${build('emp')}
    ${build('runners')}
    ${build('tools')}

    <section class="zine-end">
      <img src="${ART}/grid.jpg" alt="${Z.end.photoAlt}">
      <p class="kicker">${S.end.kicker}</p>
      <h2>${Z.end.title}</h2>
      <ol>
        ${checklist.map((item) => html`<li><span>${item.n}</span>${item.t}</li>`)}
      </ol>
      <p>${Z.end.body}</p>
      <p class="end-mark">${S.end.mark}</p>
    </section>`);
}
