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
 * one-time GYRO.SYS card asks (a rocking phone in a gyroscope ring), then
 * turns into a live spirit level while you tilt, and signs off with
 * "Depth online". Settings > Tilt asks again later. On Android the first
 * real tilt flashes a "Gyro link online" chip once.
 * Off when animations are off or the system asks for reduced motion.
 */

const PERMISSION_KEY = 'dreados.tilt.permission'; // granted | denied | dismissed
const WELCOME_KEY = 'dreados.tilt.welcomed';
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
const watchers = new Set(); // called with each change in tilt (dx, dy)
let bubble = null;          // the spirit-level bubble while calibrating
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
    if (bubble) bubble.style.translate = `${x * 24}px ${y * 24}px`;
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
    const before = { x: target.x, y: target.y };
    target.x = clamp((x - neutral.x) / RANGE_DEG);
    target.y = clamp((y - neutral.y) / RANGE_DEG);
    watchers.forEach((watch) => watch(target.x - before.x, target.y - before.y));
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

/* ------------------------------------------------ the GYRO.SYS card */

const GLYPH = `<svg class="gyro-glyph" viewBox="0 0 80 80" aria-hidden="true">
  <circle class="gyro-ring" cx="40" cy="40" r="35"/>
  <circle class="gyro-ring gyro-ring-inner" cx="40" cy="40" r="27"/>
  <g class="gyro-orbit"><circle cx="40" cy="5" r="3"/></g>
  <g class="gyro-phone">
    <rect x="29" y="22" width="22" height="36" rx="5"/>
    <path d="M36 26.5h8M33.5 44h13M33.5 49h8"/>
  </g>
</svg>`;

const LEVEL = `<div class="gyro-level" aria-hidden="true">
  <svg viewBox="0 0 80 80">
    <circle class="gyro-track" cx="40" cy="40" r="35"/>
    <circle class="gyro-progress" cx="40" cy="40" r="35" pathLength="100"/>
    <path class="gyro-cross" d="M40 12v56M12 40h56"/>
    <circle class="gyro-center" cx="40" cy="40" r="9"/>
  </svg>
  <i class="gyro-bubble"></i>
</div>`;

function leave(el) {
    el.classList.add('leaving');
    setTimeout(() => el.remove(), 420);
}

/** One-time card asking iOS visitors to sync their tilt. */
function showGyroCard() {
    if (stored() || !isPhone() || !wanted()) return;
    const card = document.createElement('section');
    card.className = 'gyro-card';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-labelledby', 'gyro-title');
    card.innerHTML = `<div class="gyro-visual">${GLYPH}</div>
        <div class="gyro-copy">
          <p class="gyro-kicker">GYRO.SYS <span>// motion link</span></p>
          <p class="gyro-title" id="gyro-title">Sync your tilt</p>
          <p class="gyro-text">Let the grid follow your hands.</p>
          <div class="gyro-actions">
            <button type="button" class="gyro-sync"><span aria-hidden="true">◉</span> Sync</button>
            <button type="button" class="gyro-later">Later</button>
          </div>
        </div>`;
    document.body.append(card);

    // Don't nag: it goes away on its own, and counts as asked.
    const idle = setTimeout(() => {
        if (!card.isConnected || card.classList.contains('calibrating')) return;
        store('dismissed');
        leave(card);
    }, 20000);

    card.querySelector('.gyro-later').addEventListener('click', () => {
        clearTimeout(idle);
        store('dismissed');
        leave(card);
    });
    card.querySelector('.gyro-sync').addEventListener('click', async () => {
        clearTimeout(idle);
        if (await askPermission()) {
            calibrate(card);
        } else {
            card.classList.add('blocked');
            card.querySelector('.gyro-kicker').innerHTML = 'GYRO.SYS <span>// link refused</span>';
            card.querySelector('.gyro-title').textContent = 'Motion blocked';
            card.querySelector('.gyro-text').textContent = 'Turn on Tilt depth in Settings any time.';
            card.querySelector('.gyro-actions').remove();
            setTimeout(() => leave(card), 2600);
        }
    });
}

/** After permission: a live spirit level that fills as you tilt around. */
function calibrate(card) {
    card.classList.add('calibrating');
    card.querySelector('.gyro-visual').innerHTML = LEVEL;
    card.querySelector('.gyro-kicker').innerHTML = 'GYRO.SYS <span>// calibrating</span>';
    card.querySelector('.gyro-title').textContent = 'Link up';
    card.querySelector('.gyro-text').textContent = 'Tilt to look around the grid.';
    card.querySelector('.gyro-actions').remove();
    bubble = card.querySelector('.gyro-bubble');
    const ring = card.querySelector('.gyro-progress');

    let progress = 0;
    let finished = false;
    const finish = () => {
        if (finished) return;
        finished = true;
        watchers.delete(watch);
        ring.style.strokeDashoffset = '0';
        card.classList.add('online');
        card.querySelector('.gyro-kicker').innerHTML = 'GYRO.SYS <span>// online</span>';
        card.querySelector('.gyro-title').textContent = 'Depth online ✦';
        card.querySelector('.gyro-text').textContent = 'The grid moves with you now.';
        setTimeout(() => {
            bubble = null;
            leave(card);
        }, 1600);
    };
    const watch = (dx, dy) => {
        // Full after roughly one good tilt each way.
        progress = Math.min(1, progress + Math.hypot(dx, dy) / 1.6);
        ring.style.strokeDashoffset = String(100 - progress * 100);
        if (progress >= 1) finish();
    };
    watchers.add(watch);
    // A phone held dead still still gets signed off.
    setTimeout(finish, 9000);
}

/** Android needs no permission: flash a chip the first time tilt is felt. */
function welcomeOnce() {
    try { if (localStorage.getItem(WELCOME_KEY)) return; } catch { return; }
    if (!isPhone()) return;
    const watch = () => {
        if (Math.abs(target.x) < 0.35 && Math.abs(target.y) < 0.35) return;
        watchers.delete(watch);
        try { localStorage.setItem(WELCOME_KEY, '1'); } catch { /* ignore */ }
        const chip = document.createElement('div');
        chip.className = 'gyro-chip';
        chip.setAttribute('role', 'status');
        chip.innerHTML = '<i aria-hidden="true"></i> GYRO LINK <b>ONLINE</b>';
        document.body.append(chip);
        setTimeout(() => leave(chip), 2600);
    };
    watchers.add(watch);
}

/** Waits until the boot screen is gone, then offers tilt on iOS. */
function offerWhenBooted() {
    const boot = document.getElementById('powerUpScreen');
    const ready = !boot || getComputedStyle(boot).display === 'none';
    if (ready) setTimeout(showGyroCard, 1800);
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
        welcomeOnce();
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
