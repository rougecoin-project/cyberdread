/**
 * /dead-circuit/read/ -- the page-flipping desktop viewer plus the scrolling
 * mobile zine. CSS decides which one shows (.only-desk / .only-mobile).
 */
import { pages } from './copy.js';
import { html, ICONS, pad2 } from './dom.js';
import { PDF_NAME, PDF_URL, PRICE_LABEL } from './offer.js';
import { sheets } from './sheets.js';
import { zineBody } from './zine.js';

const PAGES = sheets({ linked: true });
const COUNT = PAGES.length;

const pdfLink = (label) => html`<a class="pdf-link" href="${PDF_URL}" download="${PDF_NAME}">${ICONS.download}${label}</a>`;

const root = document.getElementById('app');
root.innerHTML = String(html`
  <div class="only-desk studio">
    <header class="studio-bar">
      <p class="wordmark">Dead Circuit <span>Issue 01</span></p>
      <p class="studio-page" aria-live="polite" data-ref="label"></p>
      <div class="studio-actions">
        <a href="/dead-circuit/" class="buy-mini">Buy · ${PRICE_LABEL}</a>
        <button type="button" data-ref="prev" aria-label="Previous page">${ICONS.left}</button>
        <button type="button" data-ref="next" aria-label="Next page">${ICONS.right}</button>
        ${pdfLink('Download PDF')}
      </div>
    </header>
    <div class="stage" data-ref="stage">
      <div class="fit-box" data-ref="fit"><div class="fit-page" data-ref="page"></div></div>
    </div>
    <nav class="dots" aria-label="Pages">
      ${pages.map((label, i) => html`<button type="button" data-go="${i}" aria-label="${label}"></button>`)}
    </nav>
  </div>
  <article class="only-mobile zine">
    <header class="zine-bar">
      <p>Dead Circuit <span>01</span></p>
      <div class="zine-actions">
        <a href="/dead-circuit/" class="buy-mini">${PRICE_LABEL}</a>
        ${pdfLink('Save')}
      </div>
    </header>
  </article>`);

root.querySelector('.zine').insertAdjacentHTML('beforeend', zineBody());

const ref = (name) => root.querySelector(`[data-ref="${name}"]`);
const label = ref('label');
const prev = ref('prev');
const next = ref('next');
const stage = ref('stage');
const fit = ref('fit');
const holder = ref('page');
const dots = [...root.querySelectorAll('.dots button')];

let page = 0;

function go(target) {
    page = Math.max(0, Math.min(COUNT - 1, target));
    holder.innerHTML = PAGES[page];
    label.textContent = `${pad2(page + 1)} — ${pages[page]}`;
    prev.disabled = page === 0;
    next.disabled = page === COUNT - 1;
    dots.forEach((dot, i) => {
        dot.classList.toggle('is-on', i === page);
        if (i === page) dot.setAttribute('aria-current', 'page');
        else dot.removeAttribute('aria-current');
    });
}

prev.addEventListener('click', () => go(page - 1));
next.addEventListener('click', () => go(page + 1));

// Dots and the contents page's entries both carry data-go.
root.querySelector('.studio').addEventListener('click', (event) => {
    const target = event.target.closest('[data-go]');
    if (target) go(Number(target.dataset.go));
});

window.addEventListener('keydown', (event) => {
    const tag = event.target?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault();
        go(page + 1);
    }
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        go(page - 1);
    }
});

let touchX = 0;
stage.addEventListener('touchstart', (event) => { touchX = event.changedTouches[0]?.clientX ?? 0; }, { passive: true });
stage.addEventListener('touchend', (event) => {
    const end = event.changedTouches[0]?.clientX ?? touchX;
    if (touchX - end > 48) go(page + 1);
    if (end - touchX > 48) go(page - 1);
});

// Scale the fixed 1100x680 spread down to whatever the stage allows.
function measure() {
    const rect = stage.getBoundingClientRect();
    const scale = Math.min(rect.width / 1100, rect.height / 680, 1);
    fit.style.setProperty('--fit', String(Number.isFinite(scale) && scale > 0 ? scale : 1));
}
new ResizeObserver(measure).observe(stage);
measure();

go(0);
