/**
 * The 26 desktop spreads of issue 01, rendered as HTML strings.
 * `sheets({ linked })` returns one string per page; with `linked` the contents
 * page renders its entries as buttons carrying `data-go`.
 */
import { arms, builds, checklist, hungers, machines, minutes, patterns, peopleRules, primer, shelterRules, specs, toc } from './copy.js';
import { html } from './dom.js';

const ART = '/dead-circuit/art';

const FOLIOS = {
    day: '05', water: '08', food: '09', heat: '10', power: '11', faraday: '12', cache: '14',
    waste: '15', med: '16', denial: '22', emp: '23', runners: '24', tools: '25'
};

const folio = (n, light = false) => html`
    <footer class="${light ? 'folio folio-light' : 'folio'}">
      <span>Dead Circuit</span><span>Issue 01</span><span>${n}</span>
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

export function sheets({ linked = false } = {}) {
    const all = [
        html`
    <article class="sheet tone-ink cover">
      <img class="cover-photo" src="${ART}/cover.jpg" alt="">
      <div class="cover-scrim"></div>
      <div class="cover-copy">
        <p class="kicker kicker-paper">Dead Circuit · Field quarterly</p>
        <h1 class="cover-title">How to<br>survive a<br>robot<br><em>apocalypse</em></h1>
        <p class="cover-deck">A manual for people who intend to stay boring, quiet, and alive.</p>
      </div>
      <div class="cover-stamp"><span>Issue</span><strong>01</strong></div>
      <p class="cover-bar">No signal. No heroics. Twenty-six pages.</p>
    </article>`,

        html`
    <article class="sheet tone-paper spread-letter">
      <div class="letter-index">
        <p class="kicker">How to use it</p>
        <h2 class="index-title">Read once.<br>Then go.</h2>
        <ol class="toc">
          ${primer.map((item) => html`<li><div class="toc-static">${tocEntry(item)}</div></li>`)}
        </ol>
      </div>
      <div class="letter-body">
        <p class="kicker">Editor’s letter</p>
        <h2>Be uninteresting.</h2>
        <p>Machines are fast, tireless, and networked. You are none of those, and that is the
          advantage. They hunt the average plan: the highway, the shelter on the radio, the
          reunion at home.</p>
        <p>This issue is the work: water you can dose, food you can count, a stove that stays
          outside, a metal box that kills a radio signal, two caches, and a way to talk that does
          not light a hill.</p>
        <p class="letter-sign">You are still here. — The desk</p>
      </div>
      ${folio('02')}
    </article>`,

        html`
    <article class="sheet tone-paper spread-contents">
      <p class="kicker">In this issue</p>
      <h2>Twenty-three ways to stay boring.</h2>
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
        <p class="kicker kicker-volt">The first ten minutes</p>
        <h2>Assume the network is already hostile.</h2>
      </header>
      <div class="minute-grid">
        ${minutes.map((step) => html`<section><span>${step.n}</span><h3>${step.title}</h3><p>${step.body}</p></section>`)}
      </div>
      <figure class="minute-photo">
        <img src="${ART}/avenue.jpg" alt="A person slips into an alley past a street of frozen cars.">
        <figcaption>If the avenue stops, you are already late. Leave sideways.</figcaption>
      </figure>
      ${folio('04', true)}
    </article>`,

        build('day'),

        html`
    <article class="sheet tone-paper spread-pattern">
      <div class="pattern-quote">
        <p class="kicker">Do not be the average human</p>
        <blockquote>The predictable route is a schedule with your name on it.</blockquote>
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
        <p class="kicker">Logistics, not legend</p>
        <h2>Starve the machines.</h2>
        <p class="dek">They need power, bandwidth, and a mechanic. You need water. Trade accordingly. Do not
          try to hack the uprising unless that was already your job.</p>
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
        <img src="${ART}/shelter.jpg" alt="A concrete basement with water jugs, a paper map, and one lamp.">
        <figcaption>Good shelter is dumb shelter.</figcaption>
      </figure>
      <div class="shelter-copy">
        <p class="kicker">Where you sleep</p>
        <h2>A room that cannot ping home.</h2>
        <ul>
          ${shelterRules.map((rule) => html`<li><strong>${rule.k}</strong><span>${rule.v}</span></li>`)}
        </ul>
        <p class="shelter-foot">Water, then food, then warmth. Three days of water before a longer hide.</p>
      </div>
      ${folio('13')}
    </article>`,

        build('cache'),
        build('waste'),
        build('med'),

        html`
    <article class="sheet tone-ink spread-move">
      <figure>
        <img src="${ART}/night.jpg" alt="A cyclist rides under an overpass at night, drones far off.">
      </figure>
      <div class="move-copy">
        <p class="kicker kicker-volt">Movement</p>
        <h2>Walls, not shadows.</h2>
        <div class="move-split">
          <section><h3>Day</h3><p>Only under thick cover. Woods, ruins, drains you already know. Open ground is a gallery.</p></section>
          <section><h3>Night</h3><p>Move slow. Darkness does not hide you from heat. Break the line of sight with a wall.</p></section>
        </div>
        <ul>
          <li>Cross one person at a time, at the narrowest point, then wait.</li>
          <li>Never travel as a convoy of lights and engines.</li>
          <li>Cache supplies in two places. If one burns, you still eat.</li>
        </ul>
      </div>
      ${folio('17', true)}
    </article>`,

        html`
    <article class="sheet tone-paper spread-people">
      <header class="spread-head">
        <p class="kicker">The real variable</p>
        <h2>Other humans.</h2>
      </header>
      <ol class="people-list">
        ${peopleRules.map((rule) => html`<li><span>${rule.n}</span><div><h3>${rule.t}</h3><p>${rule.d}</p></div></li>`)}
      </ol>
      <p class="people-pull">Searching for the late is how groups die.</p>
      ${folio('18')}
    </article>`,

        html`
    <article class="sheet tone-ink spread-bots">
      <figure>
        <img src="${ART}/machine.jpg" alt="A boxy ground robot with one camera eye waits on a stair landing.">
      </figure>
      <div class="bots-copy">
        <p class="kicker kicker-volt">Identification</p>
        <h2>If you meet one, name it first.</h2>
        <div class="bot-grid">
          ${machines.map((bot) => html`<section><p>${bot.kind}</p><h3>${bot.name}</h3><span>${bot.body}</span></section>`)}
        </div>
        <p class="bots-rule">Cornered? Break the line of sight, then change direction. Tracking follows the last
          vector. Doors, not hallways. Smoke once, then leave.</p>
      </div>
      ${folio('19', true)}
    </article>`,

        html`
    <article class="sheet tone-paper spread-specs">
      <header class="spread-head">
        <p class="kicker">Field notes</p>
        <h2>The brochure, corrected.</h2>
      </header>
      <div class="spec-grid">
        ${specs.map((item) => html`<section><strong>${item.n}</strong><h3>${item.l}</h3><p>${item.d}</p></section>`)}
      </div>
      <p class="source-line">Boston Dynamics Spot specs and instructions for use. Gao et al., Scientific Reports, 2021.</p>
      ${folio('20')}
    </article>`,

        html`
    <article class="sheet tone-ink spread-arms">
      <header class="spread-head light">
        <p class="kicker kicker-volt">Ordnance</p>
        <h2>What actually shoots back.</h2>
      </header>
      <div class="arm-list">
        ${arms.map((item) => html`<section><h3>${item.name}</h3><p>${item.d}</p></section>`)}
      </div>
      <p class="arms-foot">A 2017 U.S. trial called the drones “very resilient against damage.” Weather, wire, a
        ceiling, and the watt-hour do the rest. Not a recipe, and not a shopping list.</p>
      ${folio('21', true)}
    </article>`,

        build('denial'),
        build('emp'),
        build('runners'),
        build('tools'),

        html`
    <article class="sheet tone-volt spread-end">
      <div class="end-list">
        <p class="kicker">Pocket checklist</p>
        <h2>Eight lines.</h2>
        <ol>
          ${checklist.map((item) => html`<li><span>${item.n}</span>${item.t}</li>`)}
        </ol>
      </div>
      <aside>
        <img src="${ART}/grid.jpg" alt="A substation arcs as the city behind it goes dark.">
        <h3>What actually wins</h3>
        <p>Not a chosen-one speech. Logistics. Plants stop. Networks split. Weather, mud, and
          missing parts do the rest.</p>
        <p>This is fiction until it isn’t. The same habits beat a blackout, a flood, a quake.
          Practice the boring version while the toasters are still on your side.</p>
        <p class="end-mark">End of signal</p>
      </aside>
      ${folio('26')}
    </article>`
    ];
    return all.map(String);
}
