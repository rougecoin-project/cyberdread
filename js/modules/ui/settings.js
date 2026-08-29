/**
 * Settings module - accent themes, CRT effects, sound and motion toggles.
 *
 * The Start menu had a "Settings" entry that did nothing at all; this backs
 * it with real, persisted preferences.
 */
import { playSound, SOUNDS, setMuted, isMuted } from '../sound.js';

const STORAGE_KEY = 'dreados:settings';

const THEMES = {
    ice:     { label: 'ICE Cyan',   accent: '#00ffff', rgb: '0, 255, 255' },
    acid:    { label: 'Acid Green', accent: '#39ff5c', rgb: '57, 255, 92' },
    magenta: { label: 'Hot Pink',   accent: '#ff3ec8', rgb: '255, 62, 200' },
    amber:   { label: 'Amber CRT',  accent: '#ffb000', rgb: '255, 176, 0' }
};

const DEFAULTS = {
    theme: 'ice',
    crt: true,
    sound: true,
    motion: true
};

let settings = { ...DEFAULTS };

/** @returns {Object} the current settings */
function read() {
    try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        return { ...DEFAULTS, ...stored };
    } catch {
        return { ...DEFAULTS };
    }
}

function write() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch { /* private mode -- settings stay session-only */ }
}

/** Applies the current settings to the document. */
function apply() {
    const root = document.documentElement;
    const theme = THEMES[settings.theme] || THEMES[DEFAULTS.theme];

    root.dataset.theme = settings.theme;
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--accent-rgb', theme.rgb);
    root.classList.toggle('no-crt', !settings.crt);
    root.classList.toggle('no-motion', !settings.motion);

    setMuted(!settings.sound);

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', theme.accent);
}

/** @returns {string[]} the available theme names */
export function listThemes() {
    return Object.keys(THEMES);
}

/** @returns {string} the active theme name */
export function getTheme() {
    return settings.theme;
}

/**
 * @param {string} name
 */
export function setTheme(name) {
    if (!THEMES[name]) return;
    settings.theme = name;
    apply();
    write();
    syncControls();
}

/**
 * @param {string} key
 * @param {boolean} value
 */
export function setToggle(key, value) {
    if (!(key in DEFAULTS)) return;
    settings[key] = Boolean(value);
    apply();
    write();
    syncControls();
}

/** Reflects state back into the settings panel controls. */
function syncControls() {
    document.querySelectorAll('[data-theme-option]').forEach(button => {
        button.classList.toggle('active', button.dataset.themeOption === settings.theme);
        button.setAttribute('aria-pressed', String(button.dataset.themeOption === settings.theme));
    });

    ['crt', 'sound', 'motion'].forEach(key => {
        const toggle = document.getElementById(`setting-${key}`);
        if (toggle) toggle.checked = settings[key];
    });
}

/** Opens the settings window. */
export function openSettings() {
    playSound(SOUNDS.OPEN);
    const panel = document.getElementById('settingsPanel');
    if (!panel) return;
    panel.style.display = 'block';
    document.dispatchEvent(new CustomEvent('window:opened', { detail: { id: 'settingsPanel' } }));
    syncControls();
}

/** Closes the settings window. */
export function closeSettings() {
    playSound(SOUNDS.CLOSE);
    const panel = document.getElementById('settingsPanel');
    if (panel) panel.style.display = 'none';
    document.dispatchEvent(new CustomEvent('window:closed', { detail: { id: 'settingsPanel' } }));
}

/**
 * Loads and applies settings, then wires the panel controls.
 * Called before first paint so the desktop never flashes the wrong accent.
 */
export function initSettings() {
    settings = read();

    // Respect the OS-level motion preference unless the visitor has chosen.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches
        && localStorage.getItem(STORAGE_KEY) === null) {
        settings.motion = false;
    }

    apply();

    document.querySelectorAll('[data-theme-option]').forEach(button => {
        button.addEventListener('click', () => {
            setTheme(button.dataset.themeOption);
            playSound(SOUNDS.CLICK);
        });
    });

    ['crt', 'sound', 'motion'].forEach(key => {
        const toggle = document.getElementById(`setting-${key}`);
        if (toggle) {
            toggle.addEventListener('change', () => setToggle(key, toggle.checked));
        }
    });

    // Populate the theme swatches if the markup left them to be generated.
    const swatches = document.getElementById('themeSwatches');
    if (swatches && swatches.childElementCount === 0) {
        Object.entries(THEMES).forEach(([name, theme]) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'theme-swatch';
            button.dataset.themeOption = name;
            button.style.setProperty('--swatch', theme.accent);
            button.textContent = theme.label;
            button.addEventListener('click', () => {
                setTheme(name);
                playSound(SOUNDS.CLICK);
            });
            swatches.appendChild(button);
        });
    }

    syncControls();
}

export { isMuted };
