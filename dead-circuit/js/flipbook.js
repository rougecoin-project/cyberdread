/**
 * /dead-circuit/read/ in English: the free preview as a magazine. The six
 * PREVIEW pages of the A4 portrait edition (rendered from the paid PDF's own
 * pages, which are already public on the site) turn like paper, two up on a
 * desk, one at a time on a phone. The last page is the end of the preview and
 * sends readers to the store for the full issue.
 *
 * The book is a stack of leaves. Each leaf carries two pages (front and back)
 * and turns on the spine: a turned leaf lies on the left with its back up.
 * On a phone each leaf carries one page and turns away to the left.
 */
import { html, ICONS } from './dom.js';
import { bindPicker, picker, t } from './i18n.js';
import { PAGE_COUNT, PREVIEW } from './issue.js';
import { PRICE_LABEL } from './offer.js';
import { lockedList } from './zine.js';

const ART = '/dead-circuit/art/flip';
const FILES = ['en-01-cover', 'en-02-letter', 'en-03-contents', 'en-04-d1', 'en-05-minutes', 'en-06-day'];
const RATIO = 1323 / 1871; // A4 portrait, width / height
const TURN_MS = 900;

export function mountFlipbook(L) {
    const R = L.reader;
    const K = R.locked;
    const more = PAGE_COUNT - PREVIEW.length;
    document.title = L.titles.read;

    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/dead-circuit/flipbook.css';
    document.head.append(css);

    const img = (file, i) => String(html`
        <img src="${ART}/${file}.webp" alt="${L.pages[PREVIEW[i]] ?? ''}" width="1323" height="1871"
             decoding="async" draggable="false">`);

    const endPage = String(html`
        <div class="fb-end">
          <p class="fb-kicker">${K.kicker}</p>
          <h2>${t(K.title, { count: more })}</h2>
          <p class="fb-dek">${K.body}</p>
          <a class="fb-buy" href="/dead-circuit/">${t(K.cta, { price: PRICE_LABEL })}</a>
          <h3>${K.listTitle}</h3>
          ${lockedList(L)}
        </div>`);

    const backCover = String(html`
        <div class="fb-back">
          <p class="fb-kicker">Dead Circuit · Issue 01</p>
          <p class="fb-back-title">How to survive a robot apocalypse.</p>
          <p class="fb-dek">${t(K.title, { count: more })}</p>
          <a class="fb-buy" href="/dead-circuit/">${t(K.cta, { price: PRICE_LABEL })}</a>
        </div>`);

    // Reading order: the six preview pages, the end of the preview, the back cover.
    const PAGES = [...FILES.map(img), endPage, backCover];
    const LABELS = [...PREVIEW.map((id) => L.pages[id]), K.badge, ''];

    const root = document.getElementById('app');
    root.innerHTML = String(html`
      <div class="fb">
        <header class="fb-bar">
          <a class="wordmark" href="/dead-circuit/">Dead Circuit <span>${R.wordmarkIssue}</span></a>
          <p class="fb-label" aria-live="polite" data-ref="label"></p>
          <div class="fb-actions">
            ${picker(L)}
            <a href="/dead-circuit/" class="buy-mini">${t(R.buy, { price: PRICE_LABEL })}</a>
          </div>
        </header>
        <main class="fb-stage" data-ref="stage">
          <div class="fb-book" data-ref="book" role="region" aria-roledescription="magazine" aria-label="Dead Circuit, issue 01, preview"></div>
          <p class="fb-hint" data-ref="hint">Tap the cover to open</p>
        </main>
        <nav class="fb-nav">
          <button type="button" data-ref="prev" aria-label="${R.previous}">${ICONS.left}</button>
          <p class="fb-count" data-ref="count"></p>
          <button type="button" data-ref="next" aria-label="${R.next}">${ICONS.right}</button>
        </nav>
      </div>`);
    bindPicker(root);

    const ref = (name) => root.querySelector(`[data-ref="${name}"]`);
    const stage = ref('stage');
    const book = ref('book');
    const label = ref('label');
    const count = ref('count');
    const prev = ref('prev');
    const next = ref('next');
    const hint = ref('hint');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

    let spread = true; // two pages up, or one
    let leaves = [];   // leaf elements
    let turned = 0;    // how many leaves lie on the left
    let busy = false;

    const leafCount = () => (spread ? Math.ceil(PAGES.length / 2) : PAGES.length);

    function build() {
        const n = spread ? Math.ceil(PAGES.length / 2) : PAGES.length;
        book.innerHTML = '';
        leaves = [];
        for (let i = 0; i < n; i++) {
            const front = spread ? PAGES[2 * i] : PAGES[i];
            const back = spread ? PAGES[2 * i + 1] ?? '' : '';
            const leaf = document.createElement('div');
            leaf.className = 'fb-leaf';
            leaf.innerHTML = `<div class="fb-face fb-front">${front}<i class="fb-shade"></i></div>`
                + `<div class="fb-face fb-backface">${back}<i class="fb-shade"></i></div>`;
            book.append(leaf);
            leaves.push(leaf);
        }
        book.classList.toggle('is-spread', spread);
        place(false);
    }

    /** Puts every leaf where it belongs for `turned`, optionally animating the one in motion. */
    function place(animate, moving = -1) {
        const n = leaves.length;
        leaves.forEach((leaf, i) => {
            const isTurned = i < turned;
            leaf.classList.toggle('is-turned', isTurned);
            leaf.classList.toggle('is-moving', i === moving && animate && !reduced);
            leaf.classList.toggle('is-top', i === turned || i === turned - 1 || i === moving);
            // The leaf in motion rides above both stacks; otherwise the top of each stack wins.
            leaf.style.zIndex = i === moving ? String(2 * n + 1) : String(isTurned ? i + 1 : n - i);
        });
        // A closed book sits centered on its cover (or its back cover); an open one on the spine.
        const closedFront = spread && turned === 0;
        const closedBack = spread && turned === n;
        book.classList.toggle('is-closed-front', closedFront);
        book.classList.toggle('is-closed-back', closedBack);
        hint.hidden = turned !== 0;
        updateLabels();
    }

    function visiblePages() {
        if (!spread) return [turned];
        const left = 2 * turned - 1;
        return [left, left + 1].filter((p) => p >= 0 && p < PAGES.length);
    }

    function updateLabels() {
        const shown = visiblePages().filter((p) => p < PREVIEW.length);
        const names = visiblePages().map((p) => LABELS[p]).filter(Boolean);
        label.textContent = names.join(' · ');
        count.textContent = shown.length
            ? `${shown.map((p) => p + 1).join('–')} / ${PREVIEW.length} free pages`
            : 'End of the preview';
        prev.disabled = turned === 0;
        next.disabled = turned === leaves.length - (spread ? 0 : 1);
    }

    function turn(direction) {
        if (busy) return;
        const target = turned + direction;
        const last = spread ? leaves.length : leaves.length - 1;
        if (target < 0 || target > last) return;
        busy = true;
        const moving = direction > 0 ? turned : turned - 1;
        turned = target;
        place(true, moving);
        setTimeout(() => {
            busy = false;
            place(false);
        }, reduced ? 0 : TURN_MS);
    }

    // Size the book to the stage: two A4 pages side by side, or one.
    function measure() {
        const rect = stage.getBoundingClientRect();
        const wantSpread = rect.width >= 760 && rect.width / rect.height > RATIO * 1.35;
        const pagesAcross = wantSpread ? 2 : 1;
        const height = Math.min(rect.height - 64, (rect.width - 32) / (RATIO * pagesAcross));
        book.style.setProperty('--page-h', `${Math.max(240, Math.floor(height))}px`);
        book.style.setProperty('--page-w', `${Math.max(170, Math.floor(height * RATIO))}px`);
        if (wantSpread !== spread || !leaves.length) {
            // Keep the reader on the same page when the layout changes.
            const firstShown = leaves.length ? visiblePages()[0] ?? 0 : 0;
            spread = wantSpread;
            turned = spread ? (firstShown === 0 ? 0 : Math.floor((firstShown + 1) / 2)) : firstShown;
            turned = Math.min(turned, leafCount() - (spread ? 0 : 1));
            build();
        }
    }

    prev.addEventListener('click', () => turn(-1));
    next.addEventListener('click', () => turn(1));

    // Click the right half to go forward, the left half to go back (links still work).
    book.addEventListener('click', (event) => {
        if (event.target.closest('a, button, select')) return;
        const rect = book.getBoundingClientRect();
        const forward = spread && turned === 0 ? true : event.clientX > rect.left + rect.width / 2;
        turn(forward ? 1 : -1);
    });

    window.addEventListener('keydown', (event) => {
        const tag = event.target?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
        if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') { event.preventDefault(); turn(1); }
        if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); turn(-1); }
    });

    let touchX = 0;
    let touchY = 0;
    stage.addEventListener('touchstart', (event) => {
        touchX = event.changedTouches[0]?.clientX ?? 0;
        touchY = event.changedTouches[0]?.clientY ?? 0;
    }, { passive: true });
    stage.addEventListener('touchend', (event) => {
        const dx = (event.changedTouches[0]?.clientX ?? touchX) - touchX;
        const dy = (event.changedTouches[0]?.clientY ?? touchY) - touchY;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) turn(dx < 0 ? 1 : -1);
    });

    new ResizeObserver(measure).observe(stage);
    measure();

}
