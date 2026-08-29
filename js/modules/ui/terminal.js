/**
 * Terminal module - a working shell for {Dread_OS}.
 *
 * Commands read from js/data/site-config.js, so the terminal never drifts
 * out of sync with the rest of the desktop.
 */
import { playSound, SOUNDS } from '../sound.js';
import { SITE, LINKS, PROJECTS, TOKENS } from '../../data/site-config.js';
import { fetchXrgeMarket, MarketStatus, formatUsd, formatCompactUsd, formatChange } from '../web3/market.js';
import { setTheme, listThemes, getTheme } from './settings.js';

const HISTORY_KEY = 'dreados:term-history';
const MAX_HISTORY = 50;

let output;
let input;
let history = [];
let historyIndex = -1;
let matrixTimer = null;

/**
 * Appends a line of output. Always textContent, never innerHTML, so a
 * command echoing user input can't inject markup.
 * @param {string} text
 * @param {string} [className]
 */
function print(text = '', className = '') {
    const line = document.createElement('div');
    line.className = `term-line ${className}`.trim();
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
    return line;
}

/**
 * Prints a clickable link line.
 * @param {string} label
 * @param {string} url
 */
function printLink(label, url) {
    const line = document.createElement('div');
    line.className = 'term-line';

    const prefix = document.createElement('span');
    prefix.textContent = `  ${label.padEnd(18, ' ')}`;

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.textContent = url;

    line.append(prefix, anchor);
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

const COMMANDS = {
    help: {
        describe: 'list available commands',
        run() {
            print('Available commands:', 'term-heading');
            Object.entries(COMMANDS)
                .sort(([a], [b]) => a.localeCompare(b))
                .forEach(([name, command]) => {
                    print(`  ${name.padEnd(12, ' ')} ${command.describe}`);
                });
            print();
            print('Tab completes. Up/Down walks history.', 'term-muted');
        }
    },

    about: {
        describe: 'who runs this box',
        run() {
            SITE.bio.forEach(line => print(line));
        }
    },

    whoami: {
        describe: 'print the current user',
        run() {
            print(`${SITE.handle} -- ${SITE.tagline}`);
        }
    },

    projects: {
        describe: 'list current projects',
        run() {
            PROJECTS.forEach(project => {
                print(`[${project.status}] ${project.name}`, 'term-heading');
                print(`  ${project.blurb}`, 'term-muted');
                printLink('', project.url);
            });
        }
    },

    links: {
        describe: 'where else to find me',
        run() {
            LINKS.forEach(link => printLink(link.label, link.url));
        }
    },

    xrge: {
        describe: 'live RougeCoin market data',
        async run() {
            const pending = print('querying DEXScreener...', 'term-muted');
            const { status, data: market } = await fetchXrgeMarket();
            pending.remove();

            if (status === MarketStatus.NO_PAIR) {
                print('no indexed liquidity pool for XRGE yet.', 'term-error');
                print(`contract: ${TOKENS.XRGE.address}`, 'term-muted');
                return;
            }
            if (status !== MarketStatus.OK) {
                print('market data source unreachable.', 'term-error');
                return;
            }

            print('XRGE / RougeCoin', 'term-heading');
            print(`  price       ${formatUsd(market.priceUsd)}`);
            print(`  24h         ${formatChange(market.change24h)}`,
                market.change24h >= 0 ? 'term-ok' : 'term-error');
            print(`  market cap  ${formatCompactUsd(market.marketCap)}`);
            print(`  liquidity   ${formatCompactUsd(market.liquidityUsd)}`);
            print(`  24h volume  ${formatCompactUsd(market.volume24h)}`);
            print(`  venue       ${market.dex}`, 'term-muted');
        }
    },

    neofetch: {
        describe: 'system summary',
        run() {
            const art = [
                '   ______            ',
                '  /|_||_\\`.__        ',
                ' (   _    _ _\\       ',
                ' =`-(_)--(_)-\'       '
            ];
            const facts = [
                `${SITE.handle}@dread`,
                '-----------------',
                `OS       ${SITE.os} ${SITE.version}`,
                `Shell    dsh`,
                `Theme    ${getTheme()}`,
                `Engine   ${navigator.userAgent.includes('Firefox') ? 'Gecko' : 'Blink/WebKit'}`,
                `Screen   ${window.screen.width}x${window.screen.height}`,
                `Uptime   ${Math.floor(performance.now() / 1000)}s`
            ];
            const rows = Math.max(art.length, facts.length);
            for (let i = 0; i < rows; i += 1) {
                print(`${(art[i] || '').padEnd(22, ' ')}${facts[i] || ''}`);
            }
        }
    },

    theme: {
        describe: 'switch accent theme (theme <name>)',
        run(args) {
            const themes = listThemes();
            if (args.length === 0) {
                print(`current: ${getTheme()}`);
                print(`available: ${themes.join(', ')}`, 'term-muted');
                return;
            }
            const requested = args[0].toLowerCase();
            if (!themes.includes(requested)) {
                print(`unknown theme "${requested}". try: ${themes.join(', ')}`, 'term-error');
                return;
            }
            setTheme(requested);
            print(`theme set to ${requested}`, 'term-ok');
        }
    },

    matrix: {
        describe: 'toggle the digital rain',
        run() {
            const canvas = document.getElementById('matrixCanvas');
            if (!canvas) return;
            if (matrixTimer) {
                stopMatrix();
                print('rain stopped.');
            } else {
                startMatrix(canvas);
                print('follow the white rabbit. run `matrix` again to stop.', 'term-ok');
            }
        }
    },

    date: {
        describe: 'current system time',
        run() {
            print(new Date().toString());
        }
    },

    echo: {
        describe: 'print arguments',
        run(args) {
            print(args.join(' '));
        }
    },

    sudo: {
        describe: 'elevate privileges',
        run() {
            print(`${SITE.handle} is not in the sudoers file. This incident has been reported.`, 'term-error');
            playSound(SOUNDS.ERROR);
        }
    },

    clear: {
        describe: 'clear the screen',
        run() {
            output.textContent = '';
        }
    },

    exit: {
        describe: 'close the terminal',
        run() {
            closeTerminal();
        }
    }
};

/* ------------------------------------------------------------------ */
/* Matrix rain                                                         */
/* ------------------------------------------------------------------ */

/**
 * @param {HTMLCanvasElement} canvas
 */
function startMatrix(canvas) {
    const context = canvas.getContext('2d');
    const glyphs = 'アカサタナハマヤラワ0123456789ABCDEF'.split('');
    let columns;
    let drops;

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / 16);
        drops = new Array(columns).fill(1);
    };
    resize();
    canvas.dataset.listening = 'true';
    window.addEventListener('resize', resize);

    canvas.style.display = 'block';
    const accent = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent').trim() || '#00ffff';

    matrixTimer = setInterval(() => {
        context.fillStyle = 'rgba(0, 0, 0, 0.06)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = accent;
        context.font = '15px monospace';

        drops.forEach((y, i) => {
            const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
            context.fillText(glyph, i * 16, y * 16);
            if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i] += 1;
        });
    }, 50);

    canvas._matrixResize = resize;
}

function stopMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    clearInterval(matrixTimer);
    matrixTimer = null;
    if (canvas) {
        canvas.style.display = 'none';
        if (canvas._matrixResize) {
            window.removeEventListener('resize', canvas._matrixResize);
            delete canvas._matrixResize;
        }
    }
}

/* ------------------------------------------------------------------ */
/* Shell plumbing                                                      */
/* ------------------------------------------------------------------ */

/**
 * Parses and runs one command line.
 * @param {string} line
 */
async function execute(line) {
    const trimmed = line.trim();
    print(`${SITE.handle}@dread:~$ ${trimmed}`, 'term-prompt-echo');

    if (!trimmed) return;

    history.push(trimmed);
    history = history.slice(-MAX_HISTORY);
    historyIndex = history.length;
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch { /* private mode */ }

    const [name, ...args] = trimmed.split(/\s+/);
    const command = COMMANDS[name.toLowerCase()];

    if (!command) {
        print(`dsh: command not found: ${name}`, 'term-error');
        print("type `help` for the list.", 'term-muted');
        return;
    }

    try {
        await command.run(args);
    } catch (error) {
        console.error(error);
        print(`dsh: ${name} failed: ${error.message}`, 'term-error');
    }
}

/**
 * Completes the current word against known command names.
 */
function completeInput() {
    const value = input.value.trim();
    if (!value || value.includes(' ')) return;

    const matches = Object.keys(COMMANDS).filter(name => name.startsWith(value.toLowerCase()));
    if (matches.length === 1) {
        input.value = `${matches[0]} `;
    } else if (matches.length > 1) {
        print(matches.join('  '), 'term-muted');
    }
}

/**
 * @param {KeyboardEvent} event
 */
function handleKey(event) {
    if (event.key === 'Enter') {
        const line = input.value;
        input.value = '';
        execute(line);
    } else if (event.key === 'Tab') {
        event.preventDefault();
        completeInput();
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (historyIndex > 0) {
            historyIndex -= 1;
            input.value = history[historyIndex];
        }
    } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (historyIndex < history.length - 1) {
            historyIndex += 1;
            input.value = history[historyIndex];
        } else {
            historyIndex = history.length;
            input.value = '';
        }
    } else if (event.key === 'l' && event.ctrlKey) {
        event.preventDefault();
        output.textContent = '';
    }
}

/** Opens the terminal window and focuses the prompt. */
export function openTerminal() {
    playSound(SOUNDS.OPEN);
    const panel = document.getElementById('terminal');
    if (!panel) return;

    panel.style.display = 'block';
    document.dispatchEvent(new CustomEvent('window:opened', { detail: { id: 'terminal' } }));

    if (output && output.childElementCount === 0) banner();
    input?.focus();
}

/** Closes the terminal window. */
export function closeTerminal() {
    playSound(SOUNDS.CLOSE);
    const panel = document.getElementById('terminal');
    if (panel) panel.style.display = 'none';
    document.dispatchEvent(new CustomEvent('window:closed', { detail: { id: 'terminal' } }));
}

function banner() {
    print(`${SITE.os} ${SITE.version} -- dsh shell`, 'term-heading');
    print(`Connected as ${SITE.handle}. Type \`help\` to get started.`, 'term-muted');
    print();
}

/** Wires up the terminal DOM. */
export function initTerminal() {
    output = document.getElementById('termOutput');
    input = document.getElementById('termInput');
    if (!output || !input) return;

    try {
        const saved = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
        if (Array.isArray(saved)) {
            history = saved.slice(-MAX_HISTORY);
            historyIndex = history.length;
        }
    } catch { /* ignore malformed history */ }

    input.addEventListener('keydown', handleKey);

    // Clicking anywhere in the window focuses the prompt, like a real terminal.
    document.getElementById('terminal')?.addEventListener('click', event => {
        if (!event.target.closest('a, button')) input.focus();
    });
}
