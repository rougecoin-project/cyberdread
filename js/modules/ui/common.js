/**
 * Common UI module - window dragging, glitch effects and the Start menu.
 */

/**
 * Makes a window draggable by its header, using Pointer Events so mouse,
 * touch and pen all take the same path (the old code kept parallel
 * mouse/touch handlers that drifted apart).
 * @param {HTMLElement} handle - the header element
 */
function makeDraggable(handle) {
    const target = handle.closest('.app-window, .explorer, .music-player');
    if (!target) return;

    handle.addEventListener('pointerdown', event => {
        // Ignore drags that start on the window's own buttons.
        if (event.target.closest('button, a, input')) return;
        if (target.classList.contains('fullscreen')) return;

        event.preventDefault();
        handle.setPointerCapture(event.pointerId);

        const rect = target.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;

        target.classList.add('dragging');

        const move = moveEvent => {
            // Keep the title bar reachable: clamp to the viewport.
            const left = Math.min(
                Math.max(0, moveEvent.clientX - offsetX),
                window.innerWidth - rect.width
            );
            const top = Math.min(
                Math.max(40, moveEvent.clientY - offsetY),
                window.innerHeight - 40
            );
            target.style.left = `${left}px`;
            target.style.top = `${top}px`;
            target.style.transform = 'none';
        };

        const stop = () => {
            target.classList.remove('dragging');
            handle.removeEventListener('pointermove', move);
            handle.removeEventListener('pointerup', stop);
            handle.removeEventListener('pointercancel', stop);
        };

        handle.addEventListener('pointermove', move);
        handle.addEventListener('pointerup', stop);
        handle.addEventListener('pointercancel', stop);
    });
}

/**
 * Adds a one-shot glitch animation to an element.
 * @param {Element} element
 */
export function addGlitchEffect(element) {
    if (!element || document.documentElement.classList.contains('no-motion')) return;
    element.style.animation = 'none';
    void element.offsetHeight; // force reflow so the animation restarts
    element.style.animation = 'glitchEffect 0.3s ease';
}

/** Glitches a random desktop element on a loose interval. */
function randomGlitch() {
    if (document.documentElement.classList.contains('no-motion')) {
        setTimeout(randomGlitch, 10000);
        return;
    }
    const elements = document.querySelectorAll('.folder, .icon');
    if (elements.length > 0) {
        addGlitchEffect(elements[Math.floor(Math.random() * elements.length)]);
    }
    setTimeout(randomGlitch, Math.random() * 10000 + 5000);
}

/** Opens or closes the Start menu. */
export function toggleStartMenu() {
    const menu = document.getElementById('startMenu');
    const button = document.querySelector('.start-menu');
    if (!menu || !button) return;

    const open = menu.classList.toggle('open');
    button.classList.toggle('active', open);
    button.setAttribute('aria-expanded', String(open));
    document.dispatchEvent(new CustomEvent('playSound', {
        detail: { id: open ? 'openSound' : 'closeSound' }
    }));
}

/** Closes the Start menu. */
function closeStartMenu() {
    const menu = document.getElementById('startMenu');
    const button = document.querySelector('.start-menu');
    if (menu) menu.classList.remove('open');
    if (button) {
        button.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
    }
}

/** Wires up shared desktop interactions. */
export function initUIEventListeners() {
    document.querySelectorAll('.explorer-header, .player-header, .window-header')
        .forEach(makeDraggable);

    document.querySelectorAll('.folder').forEach(folder => {
        folder.addEventListener('click', () => addGlitchEffect(folder));
    });

    document.addEventListener('click', event => {
        const button = document.querySelector('.start-menu');
        const menu = document.getElementById('startMenu');
        if (!button || !menu) return;
        if (!button.contains(event.target) && !menu.contains(event.target)) {
            closeStartMenu();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeStartMenu();
    });

    setTimeout(randomGlitch, 3000);
}
