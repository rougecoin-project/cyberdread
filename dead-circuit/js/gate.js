/**
 * /dead-circuit/gate/ -- the operators' puzzle terminal. `submit` sends the
 * token to the claim function, which checks it and hands back a download link.
 * A cleared token is remembered so the prize survives a reload.
 */
import { html } from './dom.js';

const CLAIM_URL = '/.netlify/functions/dc-claim';
const MORSE = '.--. .- -.. / ...- --- .-.. -';
const LOCK_HEX =
    '222a34203420233f5c7c7d626f7e7f6765777c61647d786067777f64637a7964677c7e60667f7b5e607a796761457e6d657f7466637a7d64607d746564767560667e7467617e7863647e7f5e';
const STORAGE_KEY = 'dc-box-clearance';

const BOOT = [
    { kind: 'out', text: 'DEAD CIRCUIT GATE' },
    { kind: 'out', text: 'The issue is for sale on the floor. This room is not.' },
    { kind: 'out', text: 'Type help.' }
];

const FILES = {
    'README': [
        'Operators derive the clearance token, then submit it.',
        'Tourists use the door on the floor.',
        'man gate — if you are actually lost.'
    ].join('\n'),
    'note.txt': 'password: apocalypse\nif that worked, everyone would already be inside.',
    'capture.sig': MORSE
};

function xxd(hex) {
    const bytes = hex.match(/.{2}/g) ?? [];
    const lines = [];
    for (let i = 0; i < bytes.length; i += 16) {
        const slice = bytes.slice(i, i + 16);
        const offset = i.toString(16).padStart(8, '0');
        lines.push(`${offset}  ${slice.slice(0, 8).join(' ').padEnd(23, ' ')}  ${slice.slice(8).join(' ')}`);
    }
    return lines.join('\n');
}

/** @returns {Promise<string | null>} a download url, or null if rejected */
async function redeem(token) {
    try {
        const response = await fetch(CLAIM_URL, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ method: 'gate', token })
        });
        const result = await response.json();
        return result.ok ? result.url : null;
    } catch {
        return null;
    }
}

function answer(text) {
    const [cmd, ...rest] = text.split(/\s+/);
    const arg = rest.join(' ');
    switch (cmd.toLowerCase()) {
        case 'help': return 'ls   cat <file>   xxd <file>   man gate   submit <token>   clear';
        case 'ls': return 'README\ncapture.sig\nlock.bin\nnote.txt';
        case 'whoami': return 'guest';
        case 'man':
            return arg === 'gate'
                ? ['Three layers, in order.', 'The capture is sound.', 'That sound is the repeating pad.',
                    'What it opens is a textbook seal.', "The seal's plaintext is the token."].join('\n')
                : 'man gate';
        case 'cat':
            if (!arg) return 'cat what';
            if (arg === 'lock.bin') return 'lock.bin: not text. xxd it.';
            return FILES[arg] ?? `no such file: ${arg}`;
        case 'xxd':
            if (arg !== 'lock.bin') return arg ? `xxd: ${arg}: not a binary we keep` : 'xxd what';
            return xxd(LOCK_HEX);
        case 'submit': return 'submit <token>';
        default: return `unknown: ${cmd}`;
    }
}

function remembered() {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
}

const root = document.getElementById('app');
root.innerHTML = String(html`
  <div class="gate">
    <header class="gate-bar">
      <p>dc@gate <span>:~$</span></p>
      <a href="/dead-circuit/">Leave</a>
    </header>
    <div class="gate-scroll">
      <div data-ref="log"></div>
      <form class="gate-form">
        <label for="gate-cmd">guest$</label>
        <input id="gate-cmd" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" autofocus>
      </form>
    </div>
  </div>`);

const scroller = root.querySelector('.gate-scroll');
const log = root.querySelector('[data-ref="log"]');
const form = root.querySelector('.gate-form');
const field = root.querySelector('#gate-cmd');
let busy = false;

function print(kind, text) {
    const pre = document.createElement('pre');
    pre.className = kind === 'in' ? 'gate-in' : 'gate-out';
    pre.textContent = kind === 'in' ? `guest$ ${text}` : text;
    log.append(pre);
    scroller.scrollTo({ top: scroller.scrollHeight });
}

function boot() {
    log.replaceChildren();
    BOOT.forEach((line) => print(line.kind, line.text));
}

function grant(url) {
    form.remove();
    scroller.insertAdjacentHTML('beforeend', String(html`
      <a class="buy buy-volt gate-prize" href="${url}">Take the issue</a>`));
    scroller.scrollTo({ top: scroller.scrollHeight });
}

scroller.addEventListener('click', () => field.focus());

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const text = field.value.trim();
    if (busy || !text) return;
    field.value = '';
    const [cmd, ...rest] = text.split(/\s+/);

    if (cmd.toLowerCase() === 'clear') {
        boot();
        return;
    }
    print('in', text);

    if (cmd.toLowerCase() === 'submit' && rest.length) {
        busy = true;
        const token = rest.join(' ').trim();
        const url = await redeem(token);
        busy = false;
        if (url) {
            try { localStorage.setItem(STORAGE_KEY, token); } catch { /* private mode */ }
            print('out', 'clearance granted. the manual is yours.');
            grant(url);
        } else {
            print('out', 'rejected.');
        }
        return;
    }
    print('out', answer(text));
});

boot();
const saved = remembered();
if (saved) redeem(saved).then((url) => url && grant(url));
