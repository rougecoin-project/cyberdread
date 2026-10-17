/**
 * Tilt parallax - the home screen gets depth, like iOS.
 *
 * The wallpaper sits on its own layer (.wall), a little larger than the
 * screen. Tilting the phone (device orientation) or moving the mouse on a
 * desktop shifts the wallpaper one way and the icons and clock a little the
 * other way, at different depths. The motion is smoothed, and the neutral
 * position slowly follows however the phone is being held.
 *
 * iOS only reports orientation after the visitor allows it, from a tap: a
 * one-time "Enable tilt" pill asks, and Settings > Tilt asks again later.
 * Off when animations are off or the system asks for reduced motion.
 */

const PERMISSION_KEY = 'dreados.tilt.permission'; // granted | denied | dismissed
const RANGE_DEG = 18;      // tilt that counts as "all the way"
const RECENTER = 0.004;    // how fast neutral follows the grip, per reading
const EASE = 0.12;         // smoothing per frame

// Max travel in px at full tilt; sign gives the direction.
const DEPTH = { wall: -22, icons: 7, widget: 11 };

const root = document.documentElement;
const isPhone = () => window.matchMedia('(max-width: 720px)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const needsPermission = () => typeof window.DeviceOrientationEvent?.requestPermission === 'function';
const clamp = (v) => Math.max(-1, Math.min(1, v));

const stored = () => { try { return localStorage.getItem(PERMISSION_KEY); } catch { return null; } };
const store = (value) => { try { localStorage.setItem(PERMISSION_KEY, value); } catch { /* private mode */ } };

let layers = null;
const target = { x: 0, y: 0 };
const current = { x: 0, y: 0 };
let neutral = null;
let raf = 0;
let listening = false;

/** Tilt is wanted: the setting is on and motion is allowed. */
function wanted() {
    return !root.classList.contains('no-tilt')
        && !root.classList.contains('no-motion')
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function paint() {
    const { x, y } = current;
    // Icons stay put while they are being rearranged.
    const editing = root.classList.contains('home-editing');
    layers.wall.style.translate = `${DEPTH.wall * x}px ${DEPTH.wall * y}px`;
    if (layers.icons) layers.icons.style.translate = editing ? '' : `${DEPTH.icons * x}px ${DEPTH.icons * y}px`;
    if (layers.widget) layers.widget.style.translate = `${DEPTH.widget * x}px ${DEPTH.widget * y}px`;
}

function frame() {
    current.x += (target.x - current.x) * EASE;
    current.y += (target.y - current.y) * EASE;
    paint();
    const settled = Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001;
    raf = settled ? 0 : requestAnimationFrame(frame);
}

function kick() {
    if (!raf) raf = requestAnimationFrame(frame);
}

/* ------------------------------------------------------------ sources */

function onOrientation(event) {
    if (event.beta == null || event.gamma == null) return;
    // Map the sensor to the screen as the visitor sees it.
    const angle = ((screen.orientation?.angle ?? window.orientation ?? 0) + 360) % 360;
    let x;
    let y;
    if (angle === 90) { x = event.beta; y = -event.gamma; }
    else if (angle === 270) { x = -event.beta; y = event.gamma; }
    else if (angle === 180) { x = -event.gamma; y = -event.beta; }
    else { x = event.gamma; y = event.beta; }

    if (!neutral) neutral = { x, y };
    neutral.x += (x - neutral.x) * RECENTER;
    neutral.y += (y - neutral.y) * RECENTER;
    target.x = clamp((x - neutral.x) / RANGE_DEG);
    target.y = clamp((y - neutral.y) / RANGE_DEG);
    kick();
}

function onPointer(event) {
    if (event.pointerType !== 'mouse') return;
    target.x = clamp((event.clientX / window.innerWidth) * 2 - 1) * 0.6;
    target.y = clamp((event.clientY / window.innerHeight) * 2 - 1) * 0.6;
    kick();
}

function recenter() {
    target.x = 0;
    target.y = 0;
    kick();
}

/** The mouse left the window. */
function onMouseOut(event) {
    if (!event.relatedTarget) recenter();
}

function start() {
    if (listening || !wanted()) return;
    listening = true;
    neutral = null;
    window.addEventListener('deviceorientation', onOrientation);
    if (finePointer()) {
        window.addEventListener('pointermove', onPointer, { passive: true });
        document.addEventListener('mouseout', onMouseOut);
    }
}

function stop() {
    if (!listening) return;
    listening = false;
    window.removeEventListener('deviceorientation', onOrientation);
    window.removeEventListener('pointermove', onPointer);
    document.removeEventListener('mouseout', onMouseOut);
    recenter();
}

/** Asks iOS for orientation access. Must run inside a tap. */
async function askPermission() {
    try {
        const answer = await window.DeviceOrientationEvent.requestPermission();
        store(answer === 'granted' ? 'granted' : 'denied');
        if (answer === 'granted') start();
        return answer === 'granted';
    } catch {
        return false;
    }
}

/* -------------------------------------------------------- the iOS ask */

function offerTilt() {
    if (stored() || !isPhone() || !wanted()) return;
    const pill = document.createElement('div');
    pill.className = 'tilt-offer';
    pill.setAttribute('role', 'dialog');
    pill.setAttribute('aria-label', 'Tilt effect');
    pill.innerHTML = '<button type="button" class="tilt-yes"><span aria-hidden="true">✦</span> Tilt for depth · <b>Enable</b></button>'
        + '<button type="button" class="tilt-no" aria-label="No thanks">✕</button>';
    document.body.append(pill);
    const close = () => {
        pill.classList.add('leaving');
        setTimeout(() => pill.remove(), 250);
    };
    pill.querySelector('.tilt-yes').addEventListener('click', async () => {
        close();
        await askPermission();
    });
    pill.querySelector('.tilt-no').addEventListener('click', () => {
        store('dismissed');
        close();
    });
    // Don't nag: it goes away on its own, and counts as asked.
    setTimeout(() => {
        if (!pill.isConnected) return;
        store('dismissed');
        close();
    }, 15000);
}

/** Waits until the boot screen is gone, then offers tilt on iOS. */
function offerWhenBooted() {
    const boot = document.getElementById('powerUpScreen');
    const ready = !boot || getComputedStyle(boot).display === 'none';
    if (ready) setTimeout(offerTilt, 1800);
    else setTimeout(offerWhenBooted, 800);
}

/* ---------------------------------------------------------------- init */

export function initTilt() {
    const desktop = document.querySelector('.desktop');
    if (!desktop) return;

    const wall = document.createElement('div');
    wall.className = 'wall';
    wall.setAttribute('aria-hidden', 'true');
    desktop.prepend(wall);
    root.classList.add('has-wall');
    layers = {
        wall,
        icons: document.querySelector('.desktop-icons'),
        widget: document.querySelector('.home-widget')
    };

    if (!needsPermission()) {
        start();
    } else if (stored() === 'granted') {
        // Already allowed once: this resolves without a prompt if iOS still
        // remembers; otherwise the next tap asks again.
        window.DeviceOrientationEvent.requestPermission()
            .then((answer) => (answer === 'granted' ? start() : null))
            .catch(() => document.addEventListener('click', () => askPermission(), { once: true }));
    } else {
        offerWhenBooted();
    }

    // Settings > Tilt: turning it on asks iOS (the change event is a tap).
    document.getElementById('setting-tilt')?.addEventListener('change', (event) => {
        if (event.target.checked && needsPermission() && stored() !== 'granted') askPermission();
    });

    // Follow the Tilt and Animations settings as they change.
    // (Also catches edit mode starting, so the icons settle at once.)
    new MutationObserver(() => {
        if (!wanted()) stop();
        else if (!needsPermission() || stored() === 'granted') start();
        kick();
    }).observe(root, { attributes: true, attributeFilter: ['class'] });

    // Rearranging icons: drop them back to rest so slots line up.
    document.addEventListener('home:gesture', recenter);
}
