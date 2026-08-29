/**
 * Window manager - focus stacking, placement and fullscreen.
 *
 * This module existed but was never imported by main.js, so none of it ran:
 * clicking a background window did not raise it, and fullscreen was handled
 * by a cruder duplicate that lost the window's previous position.
 */

const WINDOW_SELECTOR = '.explorer, .music-player, .app-window';
const BASE_Z = 100;
let topZ = BASE_Z;

// Cascade offset so newly opened windows don't stack exactly on top of
// each other.
let cascade = 0;

/** @returns {boolean} whether the viewport is phone-sized */
function isSmallScreen() {
    return window.matchMedia('(max-width: 720px)').matches;
}

/**
 * Raises a window above the others.
 * @param {HTMLElement} element
 */
export function focusWindow(element) {
    if (!element) return;
    topZ += 1;
    element.style.zIndex = String(topZ);

    document.querySelectorAll('.app-window').forEach(other => {
        other.classList.toggle('focused', other === element);
    });
}

/**
 * Gives a window a sensible starting position the first time it opens.
 * @param {HTMLElement} element
 */
function placeWindow(element) {
    if (element.dataset.placed === 'true') return;
    element.dataset.placed = 'true';

    if (isSmallScreen()) {
        Object.assign(element.style, {
            left: '2.5%',
            top: '48px',
            width: '95%',
            height: 'calc(100dvh - 96px)',
            transform: 'none'
        });
        return;
    }

    const width = element.offsetWidth || 620;
    const height = element.offsetHeight || 460;
    const offset = cascade * 28;
    cascade = (cascade + 1) % 6;

    const left = Math.max(16, (window.innerWidth - width) / 2 + offset);
    const top = Math.max(48, (window.innerHeight - height) / 2 + offset);

    // Explicit pixel coordinates only. The previous version combined
    // left/top: 50% with a translate(-50%, -50%) transform, which made the
    // window jump by half its size the first time it was dragged, because
    // the drag handler writes plain pixel offsets.
    Object.assign(element.style, {
        left: `${left}px`,
        top: `${top}px`,
        transform: 'none'
    });
}

/**
 * Toggles a window between fullscreen and its previous geometry.
 * @param {string} elementId
 */
export function toggleFullScreenWindow(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    if (element.classList.contains('fullscreen')) {
        element.classList.remove('fullscreen');
        if (element.dataset.prevStyles) {
            Object.assign(element.style, JSON.parse(element.dataset.prevStyles));
            delete element.dataset.prevStyles;
        }
    } else {
        element.dataset.prevStyles = JSON.stringify({
            width: element.style.width,
            height: element.style.height,
            top: element.style.top,
            left: element.style.left,
            transform: element.style.transform
        });
        element.classList.add('fullscreen');
        Object.assign(element.style, {
            width: '', height: '', top: '', left: '', transform: ''
        });
    }

    focusWindow(element);
}

/** Keeps windows from being dragged or resized off-screen. */
function clampWindows() {
    document.querySelectorAll('.app-window').forEach(element => {
        if (element.classList.contains('fullscreen') || element.style.display === 'none') return;

        const rect = element.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
            element.style.left = `${Math.max(0, window.innerWidth - rect.width)}px`;
        }
        if (rect.left < 0) element.style.left = '0px';
        if (rect.bottom > window.innerHeight) {
            element.style.top = `${Math.max(40, window.innerHeight - rect.height)}px`;
        }
        // Never let a title bar hide behind the taskbar.
        if (rect.top < 40) element.style.top = '40px';
    });
}

/** Initializes window management. */
export function initWindowManager() {
    document.querySelectorAll(WINDOW_SELECTOR).forEach(element => {
        element.classList.add('app-window');
    });

    const raise = event => {
        const element = event.target.closest('.app-window');
        if (element) focusWindow(element);
    };
    document.addEventListener('mousedown', raise);
    document.addEventListener('touchstart', raise, { passive: true });

    // Place and raise a window whenever something opens it.
    document.addEventListener('window:opened', event => {
        const element = document.getElementById(event.detail.id);
        if (!element) return;
        element.classList.add('app-window');
        placeWindow(element);
        focusWindow(element);
    });

    document.addEventListener('window:focus', event => {
        focusWindow(document.getElementById(event.detail.id));
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(clampWindows, 150);
    });

    // Escape closes the focused window, like a real desktop.
    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        const focused = document.querySelector('.app-window.focused');
        if (focused && focused.style.display !== 'none') {
            const close = focused.querySelector('[data-close]');
            close?.click();
        }
    });
}
