/**
 * Touch layer - makes Dread_OS feel like a phone OS.
 *
 * Home screen: icons press in under a finger; a long press starts edit mode
 * (icons jiggle) and the held icon can be dragged straight away to a new
 * spot while the others slide out of its way. The order is kept in
 * localStorage. "Done", a tap on empty space or the home gesture ends it.
 *
 * Apps (phone layout): sheets zoom out of the icon that opened them and back
 * into it when they close; drag a sheet down by its header to dismiss it;
 * swipe up on the dock's home bar to go home. The Start menu drags down too.
 *
 * Animations use the individual `translate` / `scale` properties because the
 * phone sheet styles pin `transform: none !important`.
 */

import { t } from '../../i18n/i18n.js';
import enUi from '../../i18n/en/ui.js';

const PHONE = '(max-width: 720px)';
const LONG_PRESS_MS = 420;
const SLOP = 8; // px a finger may wander before a press stops being a tap
const ORDER_KEY = 'dreados.home.order';
const SHEETS = '.app-window';

const isPhone = () => window.matchMedia(PHONE).matches;
const calm = () => document.documentElement.classList.contains('no-motion')
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------- haptics */

let hapticSwitch = null;

/** A light tick: vibrate() on Android, the switch-control trick on iOS 18+. */
function haptic() {
    if (navigator.vibrate) {
        navigator.vibrate(8);
        return;
    }
    if (!hapticSwitch) {
        const label = document.createElement('label');
        label.className = 'haptic-switch';
        label.setAttribute('aria-hidden', 'true');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.setAttribute('switch', '');
        input.tabIndex = -1;
        label.append(input);
        document.body.append(label);
        hapticSwitch = label;
    }
    hapticSwitch.click();
}

/* ---------------------------------------------------------- home order */

/**
 * An icon's name in the saved order: its English label whatever the
 * language on screen, so the order survives a language switch (and orders
 * saved before translations existed still apply).
 */
const labelOf = (icon) => {
    const label = icon.querySelector('.icon-label');
    const key = label?.dataset.i18n;
    const english = key?.replace(/^ui\./, '').split('.').reduce((node, part) => node?.[part], enUi);
    return typeof english === 'string' ? english : label?.textContent.trim() ?? '';
};

function readOrder() {
    try {
        const saved = JSON.parse(localStorage.getItem(ORDER_KEY) || 'null');
        return Array.isArray(saved) ? saved : null;
    } catch {
        return null;
    }
}

function saveOrder(grid) {
    try {
        localStorage.setItem(ORDER_KEY, JSON.stringify([...grid.children].map(labelOf)));
    } catch { /* private mode: the order just won't stick */ }
}

/**
 * Puts icons in the saved order. Icons added to the site after the order was
 * saved slot in at their default position.
 */
function applyOrder(grid, defaults, saved) {
    const byLabel = new Map([...grid.children].map((icon) => [labelOf(icon), icon]));
    const order = saved.filter((label) => byLabel.has(label));
    defaults.forEach((label, index) => {
        if (!order.includes(label)) order.splice(Math.min(index, order.length), 0, label);
    });
    order.forEach((label) => grid.append(byLabel.get(label)));
}

/* ----------------------------------------------------------- home screen */

function initHomeScreen() {
    const grid = document.querySelector('.desktop-icons');
    if (!grid) return;
    const icons = () => [...grid.querySelectorAll('.icon')];
    const defaults = icons().map(labelOf);

    const saved = readOrder();
    if (saved) applyOrder(grid, defaults, saved);

    icons().forEach((icon) => {
        icon.setAttribute('draggable', 'false');
        icon.querySelector('img')?.setAttribute('draggable', 'false');
    });

    // Edit-mode controls and a live region for screen readers.
    const bar = document.createElement('div');
    bar.className = 'home-edit-bar';
    bar.hidden = true;
    bar.innerHTML = `<button type="button" class="home-edit-reset">${t('ui.home.reset')}</button>`
        + `<button type="button" class="home-edit-done">${t('ui.home.done')}</button>`;
    const live = document.createElement('p');
    live.className = 'sr-only';
    live.setAttribute('aria-live', 'polite');
    document.body.append(bar, live);
    const reset = bar.querySelector('.home-edit-reset');

    const isDefault = () => icons().map(labelOf).join('\n') === defaults.join('\n');
    let editing = false;

    function setEditing(on) {
        if (editing === on) return;
        editing = on;
        document.documentElement.classList.toggle('home-editing', on);
        bar.hidden = !on;
        reset.hidden = isDefault();
        icons().forEach((icon, i) => icon.style.setProperty('--jiggle-delay', `${(i % 4) * -0.07 - (i % 3) * 0.05}s`));
        live.textContent = t(on ? 'ui.home.editing' : 'ui.home.saved');
    }

    bar.querySelector('.home-edit-done').addEventListener('click', () => setEditing(false));
    reset.addEventListener('click', () => {
        flip(() => applyOrder(grid, defaults, defaults));
        try { localStorage.removeItem(ORDER_KEY); } catch { /* ignore */ }
        reset.hidden = true;
        haptic();
    });

    /** Animates icons from where they were to where a DOM change put them. */
    function flip(change, skip) {
        const before = new Map(icons().map((icon) => [icon, icon.getBoundingClientRect()]));
        change();
        if (calm()) return;
        icons().forEach((icon) => {
            if (icon === skip) return;
            const was = before.get(icon);
            const now = icon.getBoundingClientRect();
            const dx = was.left - now.left;
            const dy = was.top - now.top;
            if (!dx && !dy) return;
            icon.animate([{ translate: `${dx}px ${dy}px` }, { translate: '0 0' }],
                { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' });
        });
    }

    // Tapping empty home-screen space ends edit mode.
    document.addEventListener('pointerdown', (event) => {
        if (!editing) return;
        if (event.target.closest('.desktop-icons .icon, .home-edit-bar, .taskbar, .start-menu-dropdown, .app-window')) return;
        setEditing(false);
    });

    let press = null; // the gesture in progress
    let swallowClick = false;

    grid.addEventListener('pointerdown', (event) => {
        const icon = event.target.closest('.icon');
        if (!icon || !event.isPrimary || event.button > 0) return;
        press = {
            icon,
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            dragging: false,
            timer: setTimeout(() => {
                if (!press || press.icon !== icon) return;
                press.timer = null;
                haptic();
                setEditing(true);
                startDrag(event.clientX, event.clientY);
            }, LONG_PRESS_MS)
        };
        icon.classList.add('pressed');
    });

    /**
     * An icon's resting slot on screen, ignoring any slide or drag offset
     * (offsetLeft/Top skip transforms), so hit-testing never chases an
     * animation.
     */
    function slotOf(icon) {
        const box = grid.getBoundingClientRect();
        const left = box.left + icon.offsetLeft - grid.scrollLeft;
        const top = box.top + icon.offsetTop - grid.scrollTop;
        return { left, top, right: left + icon.offsetWidth, bottom: top + icon.offsetHeight, width: icon.offsetWidth, height: icon.offsetHeight };
    }

    function startDrag(x, y) {
        if (!press || press.dragging) return;
        const { icon } = press;
        press.dragging = true;
        swallowClick = true;
        const slot = slotOf(icon);
        press.grabX = press.x - slot.left;
        press.grabY = press.y - slot.top;
        icon.classList.remove('pressed');
        icon.classList.add('lifted');
        // Follow this finger on the grid, which never moves. (Capturing on the
        // icon would be lost the moment it changes places in the DOM.)
        try { grid.setPointerCapture(press.id); } catch { /* pointer already up */ }
        moveDrag(x, y);
    }

    function follow(x, y) {
        const slot = slotOf(press.icon);
        press.icon.style.translate = `${x - press.grabX - slot.left}px ${y - press.grabY - slot.top}px`;
    }

    function moveDrag(x, y) {
        const { icon } = press;
        follow(x, y);
        // Swap only when the finger is well inside another icon's slot.
        const over = icons().find((other) => {
            if (other === icon) return false;
            const r = slotOf(other);
            const mx = r.width * 0.15;
            const my = r.height * 0.15;
            return x >= r.left + mx && x <= r.right - mx && y >= r.top + my && y <= r.bottom - my;
        });
        if (!over) return;
        const list = icons();
        const from = list.indexOf(icon);
        const to = list.indexOf(over);
        flip(() => grid.insertBefore(icon, from < to ? over.nextSibling : over), icon);
        haptic();
        follow(x, y); // the slot moved under the finger
    }

    grid.addEventListener('pointermove', (event) => {
        if (!press || event.pointerId !== press.id) return;
        const moved = Math.hypot(event.clientX - press.x, event.clientY - press.y);
        if (press.dragging) {
            event.preventDefault();
            moveDrag(event.clientX, event.clientY);
        } else if (moved > SLOP) {
            clearTimeout(press.timer);
            press.timer = null;
            press.icon.classList.remove('pressed');
            // In edit mode any drag moves the icon, like iOS's jiggle mode.
            if (editing) startDrag(event.clientX, event.clientY);
            else press = null;
        }
    });

    function endPress(event) {
        if (!press || (event && event.pointerId !== press.id)) return;
        const { icon, dragging } = press;
        clearTimeout(press.timer);
        icon.classList.remove('pressed');
        if (dragging) {
            // Settle into the slot from wherever the finger let go.
            const from = icon.style.translate || '0 0';
            icon.style.translate = '';
            icon.classList.remove('lifted');
            if (!calm()) {
                icon.animate([{ translate: from }, { translate: '0 0' }],
                    { duration: 220, easing: 'cubic-bezier(.2,.8,.2,1)' });
            }
            saveOrder(grid);
            reset.hidden = isDefault();
        } else if (editing) {
            swallowClick = true; // a tap in edit mode doesn't launch the app
        }
        press = null;
    }
    grid.addEventListener('pointerup', endPress);
    grid.addEventListener('pointercancel', endPress);

    // A long press or drag must not also open the app.
    grid.addEventListener('click', (event) => {
        if (!swallowClick) return;
        swallowClick = false;
        event.preventDefault();
        event.stopImmediatePropagation();
    }, true);
    // No callout / link preview on long press.
    grid.addEventListener('contextmenu', (event) => event.preventDefault());

    // Let the home gesture end edit mode.
    document.addEventListener('home:gesture', () => setEditing(false));
}

/* -------------------------------------------------------------- sheets */

let launch = null; // { el, at } - what was tapped to open the next window
const origins = new Map(); // window id -> element it zoomed out of

function visibleSheets() {
    return [...document.querySelectorAll(SHEETS)].filter((el) =>
        el.style.display !== 'none' && el.style.display !== '' && !el.classList.contains('minimized'));
}

function topSheet() {
    return visibleSheets().sort((a, b) => (Number(b.style.zIndex) || 0) - (Number(a.style.zIndex) || 0))[0] ?? null;
}

/** Rect an element sits in, if it is on screen. */
function onScreen(el) {
    if (!el || !el.isConnected) return null;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    if (el.closest('.start-menu-dropdown:not(.open)')) return null;
    return rect;
}

/** Zoom keyframes between a rectangle and the sheet's own box. */
function zoomFrames(sheet, rect) {
    const box = sheet.getBoundingClientRect();
    const sx = rect.width / box.width;
    const sy = rect.height / box.height;
    return {
        small: { translate: `${rect.left - box.left}px ${rect.top - box.top}px`, scale: `${sx} ${sy}`, opacity: 0.35, borderRadius: '40px' },
        full: { translate: '0 0', scale: '1 1', opacity: 1, borderRadius: '20px' }
    };
}

function animateOpen(sheet) {
    if (calm()) return;
    sheet.style.transformOrigin = '0 0';
    const from = launch && performance.now() - launch.at < 900 ? onScreen(launch.el) : null;
    if (from) {
        origins.set(sheet.id, launch.el);
        const { small, full } = zoomFrames(sheet, from);
        sheet.animate([small, full], { duration: 360, easing: 'cubic-bezier(.2,.9,.25,1)' });
    } else {
        origins.delete(sheet.id);
        sheet.animate([{ translate: '0 60px', opacity: 0 }, { translate: '0 0', opacity: 1 }],
            { duration: 300, easing: 'cubic-bezier(.2,.9,.25,1)' });
    }
    launch = null;
}

let closingThrough = null; // the close button we are letting through

/** Animates a sheet away (into its icon, or down), then runs its real close. */
function dismiss(sheet, { fromY = 0 } = {}) {
    const button = sheet.querySelector('[data-close]');
    if (!button || sheet.classList.contains('closing')) return;
    const finish = () => {
        sheet.classList.remove('closing');
        sheet.style.translate = '';
        sheet.style.scale = '';
        closingThrough = button;
        button.click();
        closingThrough = null;
    };
    if (calm()) return finish();

    sheet.classList.add('closing');
    sheet.style.transformOrigin = '0 0';
    const target = onScreen(origins.get(sheet.id));
    const start = { translate: `0 ${fromY}px`, scale: '1 1', opacity: 1, borderRadius: '20px' };
    let animation;
    if (target && !fromY) {
        const { small } = zoomFrames(sheet, target);
        animation = sheet.animate([start, { ...small, opacity: 0 }], { duration: 300, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
    } else {
        const height = sheet.getBoundingClientRect().height;
        animation = sheet.animate([start, { translate: `0 ${height + 40}px`, scale: '1 1', opacity: 0.6, borderRadius: '20px' }],
            { duration: 260, easing: 'cubic-bezier(.4,0,.6,1)', fill: 'forwards' });
    }
    animation.onfinish = () => {
        animation.cancel();
        finish();
    };
}

/** Drag a sheet down by its header to dismiss it. */
function makeSheetDraggable(sheet) {
    const header = sheet.querySelector('.window-header, .explorer-header, .player-header');
    if (!header) return;
    const grabber = document.createElement('i');
    grabber.className = 'sheet-grabber';
    grabber.setAttribute('aria-hidden', 'true');
    sheet.prepend(grabber);

    let drag = null;
    const handles = [header, grabber];
    const down = (event) => {
        if (!isPhone() || !event.isPrimary || event.target.closest('button, a, input, select')) return;
        drag = { id: event.pointerId, y: event.clientY, dy: 0, t: performance.now(), v: 0, handle: event.currentTarget };
        try { event.currentTarget.setPointerCapture(event.pointerId); } catch { /* ignore */ }
    };
    const move = (event) => {
        if (!drag || event.pointerId !== drag.id) return;
        const raw = event.clientY - drag.y;
        // Down follows the finger; up resists like a rubber band.
        const dy = raw > 0 ? raw : raw / 5;
        const now = performance.now();
        drag.v = (dy - drag.dy) / Math.max(1, now - drag.t);
        drag.dy = dy;
        drag.t = now;
        sheet.style.translate = `0 ${dy}px`;
        sheet.classList.add('sheet-dragging');
    };
    const up = (event) => {
        if (!drag || event.pointerId !== drag.id) return;
        const { dy, v } = drag;
        drag = null;
        sheet.classList.remove('sheet-dragging');
        const height = sheet.getBoundingClientRect().height;
        if (dy > height * 0.22 || (dy > 30 && v > 0.5)) {
            haptic();
            sheet.style.translate = '';
            dismiss(sheet, { fromY: dy });
        } else if (dy !== 0) {
            sheet.style.translate = '';
            if (!calm()) sheet.animate([{ translate: `0 ${dy}px` }, { translate: '0 0' }], { duration: 280, easing: 'cubic-bezier(.2,.9,.25,1.15)' });
        }
    };
    handles.forEach((handle) => {
        handle.addEventListener('pointerdown', down);
        handle.addEventListener('pointermove', move);
        handle.addEventListener('pointerup', up);
        handle.addEventListener('pointercancel', up);
    });
}

function initSheets() {
    // Remember what was tapped, so the next window can zoom out of it.
    document.addEventListener('click', (event) => {
        const el = event.target.closest('.desktop-icons .icon, .start-menu-item, .taskbar-window, .taskbar-ticker');
        if (el) launch = { el, at: performance.now() };
    }, true);

    document.addEventListener('window:opened', (event) => {
        if (!isPhone()) return;
        const sheet = document.getElementById(event.detail.id);
        if (sheet) requestAnimationFrame(() => animateOpen(sheet));
    });

    // Close buttons animate first on phones, then do their real work.
    document.addEventListener('click', (event) => {
        const button = event.target.closest('[data-close]');
        if (!button || button === closingThrough || !isPhone()) return;
        const sheet = button.closest(SHEETS);
        if (!sheet) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        dismiss(sheet);
    }, true);

    document.querySelectorAll(SHEETS).forEach(makeSheetDraggable);
}

/* ----------------------------------------------------- the home gesture */

function goHome() {
    document.dispatchEvent(new CustomEvent('home:gesture'));
    const sheet = topSheet();
    if (sheet) dismiss(sheet);
    document.getElementById('startMenu')?.classList.contains('open') && window.toggleStartMenu?.();
}

function initHomeBar() {
    const taskbar = document.querySelector('.taskbar');
    if (!taskbar) return;
    const bar = document.createElement('button');
    bar.type = 'button';
    bar.className = 'home-bar';
    bar.setAttribute('aria-label', t('ui.home.homeButton'));
    bar.innerHTML = '<i></i>';
    taskbar.append(bar);
    bar.addEventListener('click', goHome);

    // Swipe up on the dock = home, like the bar at the bottom of an iPhone.
    let start = null;
    taskbar.addEventListener('pointerdown', (event) => {
        if (!isPhone() || !event.isPrimary) return;
        start = { y: event.clientY, x: event.clientX, done: false };
    });
    taskbar.addEventListener('pointermove', (event) => {
        if (!start || start.done) return;
        if (start.y - event.clientY > 36 && Math.abs(event.clientX - start.x) < 80) {
            start.done = true;
            haptic();
            goHome();
            // Don't let the lifting finger also tap the Start button. Only a
            // real (trusted) click is eaten: the sheet's own close click,
            // fired by code when its animation ends, must get through.
            const swallow = (click) => {
                if (!click.isTrusted) return;
                click.preventDefault();
                click.stopImmediatePropagation();
                document.removeEventListener('click', swallow, true);
            };
            document.addEventListener('click', swallow, true);
            setTimeout(() => document.removeEventListener('click', swallow, true), 600);
        }
    });
    const end = () => { start = null; };
    taskbar.addEventListener('pointerup', end);
    taskbar.addEventListener('pointercancel', end);

    const sync = () => document.documentElement.classList.toggle('app-open', isPhone() && visibleSheets().length > 0);
    document.addEventListener('window:opened', () => requestAnimationFrame(sync));
    document.addEventListener('window:closed', () => requestAnimationFrame(sync));
}

/* ----------------------------------------------------------- start menu */

function initStartSheet() {
    const menu = document.getElementById('startMenu');
    if (!menu) return;
    const grabber = document.createElement('i');
    grabber.className = 'sheet-grabber';
    grabber.setAttribute('aria-hidden', 'true');
    menu.prepend(grabber);

    let drag = null;
    const handles = [grabber, menu.querySelector('.start-menu-user')].filter(Boolean);
    handles.forEach((handle) => {
        handle.addEventListener('pointerdown', (event) => {
            if (!isPhone() || !event.isPrimary) return;
            drag = { id: event.pointerId, y: event.clientY, dy: 0 };
            try { handle.setPointerCapture(event.pointerId); } catch { /* ignore */ }
        });
        handle.addEventListener('pointermove', (event) => {
            if (!drag || event.pointerId !== drag.id) return;
            drag.dy = Math.max(0, event.clientY - drag.y);
            menu.style.translate = `0 ${drag.dy}px`;
        });
        const up = (event) => {
            if (!drag || event.pointerId !== drag.id) return;
            const { dy } = drag;
            drag = null;
            menu.style.translate = '';
            if (dy > 70) {
                haptic();
                window.toggleStartMenu?.();
            } else if (dy && !calm()) {
                menu.animate([{ translate: `0 ${dy}px` }, { translate: '0 0' }], { duration: 240, easing: 'cubic-bezier(.2,.9,.25,1.1)' });
            }
        };
        handle.addEventListener('pointerup', up);
        handle.addEventListener('pointercancel', up);
    });
}

/* ------------------------------------------------------------------ init */

export function initTouch() {
    // iOS only applies :active styles once a touch listener exists.
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.documentElement.classList.add('touch-ui');

    initHomeScreen();
    initSheets();
    initHomeBar();
    initStartSheet();
}
