/** The single-column mobile edition of issue 01. */
import { arms, builds, checklist, hungers, machines, minutes, patterns, peopleRules, shelterRules, specs } from './copy.js';
import { html } from './dom.js';

const ART = '/dead-circuit/art';

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

/** Everything below the zine's header bar. */
export function zineBody() {
    return String(html`
    <section class="zine-cover">
      <img src="${ART}/cover.jpg" alt="">
      <div>
        <p>Field quarterly</p>
        <h1>How to survive a robot <em>apocalypse</em></h1>
        <span>Stay boring. Stay quiet. Stay alive.</span>
      </div>
    </section>

    <section class="zine-letter">
      <p class="kicker">Editor’s letter</p>
      <h2>Be uninteresting.</h2>
      <p>Machines are fast, tireless, and networked. You are none of those, and that is the
        advantage. They hunt the average plan: the highway, the shelter on the radio, the reunion
        at home.</p>
      <p>Deny them data, power, and a pattern. Stay alive until the grid fails. When the links
        partition, the swarm is just many stupid programs. You are still here.</p>
    </section>

    <section class="zine-ink">
      <p class="kicker kicker-volt">The first ten minutes</p>
      <h2>The network is already hostile.</h2>
      <ol>
        ${minutes.map((step) => html`<li><span>${step.n}</span><div><h3>${step.title}</h3><p>${step.body}</p></div></li>`)}
      </ol>
      <img src="${ART}/avenue.jpg" alt="A person slips into an alley past frozen cars.">
    </section>

    ${build('day')}

    <section class="zine-quote">
      <p class="kicker">Do not be average</p>
      <blockquote>The predictable route is a schedule with your name on it.</blockquote>
      <ul>
        ${patterns.map((item) => html`<li><strong>${item.title}</strong>${item.body}</li>`)}
      </ul>
    </section>

    <section class="zine-hazard">
      <p class="kicker">Logistics, not legend</p>
      <h2>Starve the machines.</h2>
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
      <img src="${ART}/shelter.jpg" alt="A basement shelter with water, a paper map, and one lamp.">
      <div>
        <p class="kicker">Dumb shelter</p>
        <h2>A room that cannot ping home.</h2>
        <ul>
          ${shelterRules.map((rule) => html`<li><strong>${rule.k}.</strong> ${rule.v}</li>`)}
        </ul>
        <p>Water, then food, then warmth.</p>
      </div>
    </section>

    ${build('cache')}
    ${build('waste')}
    ${build('med')}

    <section class="zine-ink">
      <img src="${ART}/night.jpg" alt="A cyclist under an overpass at night.">
      <p class="kicker kicker-volt">Movement</p>
      <h2>Walls, not shadows.</h2>
      <p><strong>Day.</strong> Only under thick cover. Open ground is a gallery.</p>
      <p><strong>Night.</strong> Move slow. Heat sensors do not care that it is dark.</p>
      <p>Cross one at a time. No convoys of lights. Cache supplies in two places.</p>
    </section>

    <section class="zine-people">
      <p class="kicker">The real variable</p>
      <h2>Other humans.</h2>
      <ol>
        ${peopleRules.map((rule) => html`<li><span>${rule.n}</span><div><h3>${rule.t}</h3><p>${rule.d}</p></div></li>`)}
      </ol>
    </section>

    <section class="zine-ink">
      <img src="${ART}/machine.jpg" alt="A one-eyed ground robot on a stair landing.">
      <p class="kicker kicker-volt">If you meet one</p>
      <h2>Name it, then go around.</h2>
      <ul class="zine-bots">
        ${machines.map((bot) => html`<li><h3>${bot.kind}<span>${bot.name}</span></h3><p>${bot.body}</p></li>`)}
      </ul>
      <p>Cornered? Break sight, change direction, use doors. Smoke once, then leave.</p>
    </section>

    <section class="zine-quote">
      <p class="kicker">Field notes</p>
      <h2>The brochure, corrected.</h2>
      <ul>
        ${specs.map((item) => html`<li><strong>${item.n} — ${item.l}</strong>${item.d}</li>`)}
      </ul>
    </section>

    <section class="zine-ink">
      <p class="kicker kicker-volt">Ordnance</p>
      <h2>What actually shoots back.</h2>
      <ul class="zine-bots">
        ${arms.map((item) => html`<li><h3>${item.name}</h3><p>${item.d}</p></li>`)}
      </ul>
      <p>A 2017 U.S. trial called the drones “very resilient against damage.” Weather, wire, a
        ceiling, and the battery do more than a gadget. This is not a build guide. Civilian
        jammers are illegal.</p>
    </section>

    ${build('denial')}
    ${build('emp')}
    ${build('runners')}
    ${build('tools')}

    <section class="zine-end">
      <img src="${ART}/grid.jpg" alt="A substation flares as the skyline goes dark.">
      <p class="kicker">Pocket checklist</p>
      <h2>Eight lines. Then wait.</h2>
      <ol>
        ${checklist.map((item) => html`<li><span>${item.n}</span>${item.t}</li>`)}
      </ol>
      <p>What wins is logistics: dead plants, split networks, mud, and missing parts. This is
        fiction until it isn’t. Practice the boring version while the toasters are still on your
        side.</p>
      <p class="end-mark">End of signal</p>
    </section>`);
}
