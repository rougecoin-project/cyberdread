/**
 * Spotlight - the home screen's rotating project card.
 *
 * Under the clock and the live chips, one project at a time: its picture,
 * name, a one-line pitch and its main call to action (Get issue 01, Download
 * free, Jack in…). It moves on every few seconds, pauses while you point at
 * or touch it, swipes left/right on phones, and the dots jump to a project.
 * With animations off (Settings, or the system's reduced motion) it stays
 * put until you move it. The list and pitches come from SPOTLIGHT in
 * js/data/site-config.js.
 *
 * On short phones it gives way rather than cover the app grid: first the
 * pitch line goes, then the whole card.
 */
import { SPOTLIGHT } from '../../data/site-config.js';
import { t } from '../../i18n/i18n.js';
import { buildAction } from './explorer.js';

const ROTATE_MS = 6500;
const SWIPE_PX = 40;

const root = document.documentElement;
const still = () => root.classList.contains('no-motion')
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let host = null;
let index = 0;
let timer = 0;
let paused = false;

function slide(project, i) {
    const card = document.createElement('div');
    card.className = 'spot-card';

    const thumb = document.createElement('img');
    thumb.className = 'spot-thumb';
    thumb.src = project.icon;
    thumb.alt = '';
    thumb.decoding = 'async';

    const copy = document.createElement('div');
    copy.className = 'spot-copy';
    const kicker = document.createElement('p');
    kicker.className = 'spot-kicker';
    kicker.textContent = `${t('ui.spotlight.kicker')} · ${i + 1}/${SPOTLIGHT.length}`;
    const name = document.createElement('p');
    name.className = 'spot-name';
    name.textContent = project.name;
    const pitch = document.createElement('p');
    pitch.className = 'spot-pitch';
    pitch.textContent = project.pitch;
    copy.append(kicker, name, pitch);

    const action = buildAction(project.actions[0], true);
    action.classList.add('spot-cta');

    card.append(thumb, copy, action);
    return card;
}

function show(i, direction = 1) {
    index = (i + SPOTLIGHT.length) % SPOTLIGHT.length;
    const card = slide(SPOTLIGHT[index], index);
    if (!still()) card.classList.add(direction > 0 ? 'spot-in-next' : 'spot-in-prev');
    const current = host.querySelector('.spot-card');
    if (current) current.replaceWith(card);
    else host.prepend(card);
    host.querySelectorAll('.spot-dots button').forEach((dot, n) => {
        dot.classList.toggle('active', n === index);
        dot.setAttribute('aria-current', n === index ? 'true' : 'false');
    });
}

function schedule() {
    clearInterval(timer);
    timer = 0;
    if (still() || SPOTLIGHT.length < 2) return;
    timer = setInterval(() => {
        if (!paused && !document.hidden && !host.hidden) show(index + 1);
    }, ROTATE_MS);
}

/** Keeps the card clear of the app grid on short phones. */
function fit() {
    host.classList.remove('spot-tight', 'spot-gone');
    if (!window.matchMedia('(max-width: 720px)').matches) return;
    const grid = document.querySelector('.desktop-icons');
    if (!grid || !grid.firstElementChild) return;
    const room = () => grid.firstElementChild.getBoundingClientRect().top - host.getBoundingClientRect().bottom;
    if (room() < 10) host.classList.add('spot-tight');
    if (room() < 10) host.classList.add('spot-gone');
}

function bindGestures() {
    host.addEventListener('pointerenter', () => { paused = true; });
    host.addEventListener('pointerleave', () => { paused = false; });
    host.addEventListener('focusin', () => { paused = true; });
    host.addEventListener('focusout', () => { paused = false; });

    let start = null;
    host.addEventListener('pointerdown', (event) => {
        if (event.pointerType === 'mouse') return;
        start = { x: event.clientX, y: event.clientY };
        paused = true;
    });
    const end = (event) => {
        if (!start) return;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        start = null;
        paused = false;
        if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy) * 1.5) {
            host.dataset.swiped = '1';
            setTimeout(() => { delete host.dataset.swiped; }, 80);
            show(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
            schedule();
        }
    };
    host.addEventListener('pointerup', end);
    host.addEventListener('pointercancel', () => { start = null; paused = false; });
    // A swipe is not a tap on the button underneath it.
    host.addEventListener('click', (event) => {
        if (host.dataset.swiped === '1') {
            event.preventDefault();
            event.stopPropagation();
        }
    }, true);
}

export function initSpotlight() {
    host = document.querySelector('[data-spotlight]');
    if (!host || !SPOTLIGHT.length) return;
    host.hidden = false;
    host.setAttribute('role', 'region');
    host.setAttribute('aria-label', t('ui.spotlight.label'));

    const dots = document.createElement('div');
    dots.className = 'spot-dots';
    SPOTLIGHT.forEach((project, n) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', t('ui.spotlight.show', { name: project.name }));
        dot.addEventListener('click', () => {
            show(n, n >= index ? 1 : -1);
            schedule();
        });
        dots.appendChild(dot);
    });
    host.appendChild(dots);

    show(0);
    bindGestures();
    schedule();
    fit();

    // Fonts and the boot screen settle after init; measure again then.
    window.addEventListener('load', fit);
    setTimeout(fit, 1500);

    let resizeTimer = 0;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(fit, 150);
    });
    // Animations switched on or off in Settings.
    new MutationObserver(schedule).observe(root, { attributes: true, attributeFilter: ['class'] });
}
