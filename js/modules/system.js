/**
 * System module - boot, shutdown and power functions.
 */
import { playSound, SOUNDS } from './sound.js';
import { showTooltips } from './ui/tooltips.js';
import { SITE } from '../data/site-config.js';

const SEEN_KEY = 'dreados:booted';

/** @returns {boolean} whether motion effects are enabled */
function motionEnabled() {
    return !document.documentElement.classList.contains('no-motion');
}

/**
 * Fills in the boot screen with real values instead of a hardcoded
 * "BIOS Version 1.0.18" string that never changed between releases.
 */
export function initBootScreen() {
    const bios = document.querySelector('.bios-text');
    if (!bios) return;

    const returning = (() => {
        try { return localStorage.getItem(SEEN_KEY) === '1'; } catch { return false; }
    })();

    const lines = [
        `${SITE.os} BIOS ${SITE.version}`,
        `Build date: ${new Date(document.lastModified).toISOString().slice(0, 10)}`,
        `Cores: ${navigator.hardwareConcurrency || 'unknown'}    Viewport: ${window.innerWidth}x${window.innerHeight}`,
        'System check: OK',
        'Memory test: PASSED'
    ];

    bios.textContent = '';
    lines.forEach(line => {
        const row = document.createElement('div');
        row.textContent = line;
        bios.appendChild(row);
    });

    const button = document.getElementById('startButton');
    if (button && returning) button.textContent = 'Reconnect';
}

/**
 * Runs the boot sequence, then reveals the desktop.
 */
export function startSystem() {
    playSound(SOUNDS.STARTUP);

    const bios = document.querySelector('.bios-text');
    const screen = document.getElementById('powerUpScreen');
    const button = document.getElementById('startButton');
    if (button) button.disabled = true;

    try { localStorage.setItem(SEEN_KEY, '1'); } catch { /* private mode */ }

    const lines = [
        'Initializing neural interface...',
        'Connecting to cyberspace...',
        'Loading ICE protocols...',
        'Bypassing security...',
        `Accessing ${SITE.os}...`
    ];

    const finish = () => {
        if (screen) screen.style.display = 'none';
        showTooltips();
    };

    // Skip the theatrics entirely when motion is reduced.
    if (!motionEnabled()) {
        finish();
        return;
    }

    const step = 400;
    lines.forEach((line, index) => {
        setTimeout(() => {
            if (bios) {
                const row = document.createElement('div');
                row.textContent = line;
                bios.appendChild(row);
            }
            if (index === lines.length - 1) setTimeout(finish, 500);
        }, index * step);
    });
}

/** Shows the shutdown confirmation modal. */
export function showShutdownModal() {
    const modal = document.getElementById('shutdownModal');
    if (modal) modal.style.display = 'block';
    document.getElementById('startMenu')?.classList.remove('open');
    document.querySelector('.start-menu')?.classList.remove('active');
}

/** Closes the shutdown confirmation modal. */
export function closeShutdownModal() {
    const modal = document.getElementById('shutdownModal');
    if (modal) modal.style.display = 'none';
}

/** Runs the shutdown animation and returns the visitor to the boot screen. */
export function initiateShutdown() {
    playSound(SOUNDS.SHUTDOWN);
    closeShutdownModal();

    const shutdownScreen = document.getElementById('shutdownScreen');
    if (shutdownScreen) shutdownScreen.style.display = 'flex';

    // Previously this navigated the visitor off-site to a fandom wiki page,
    // which is a surprising way to lose your audience. Now it powers back
    // down to the boot screen so they can start the system again.
    setTimeout(() => {
        if (shutdownScreen) shutdownScreen.style.display = 'none';

        document.querySelectorAll('.app-window').forEach(element => {
            element.style.display = 'none';
            document.dispatchEvent(new CustomEvent('window:closed', {
                detail: { id: element.id }
            }));
        });

        const powerUp = document.getElementById('powerUpScreen');
        if (powerUp) powerUp.style.display = 'flex';
        const button = document.getElementById('startButton');
        if (button) button.disabled = false;
        initBootScreen();
    }, 2200);
}
