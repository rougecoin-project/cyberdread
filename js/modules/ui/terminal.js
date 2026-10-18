/**
 * Terminal module - a working shell for {Dread_OS}.
 *
 * Commands read from js/data/site-config.js, so the terminal never drifts
 * out of sync with the rest of the desktop.
 */
import { playSound, SOUNDS } from '../sound.js';
import { SITE, LINKS, PROJECTS, TOKENS, ROUGECHAIN, REPOS, GITHUB_USER } from '../../data/site-config.js';
import { fetchXrgeMarket, MarketStatus, formatUsd, formatCompactUsd, formatChange } from '../web3/market.js';
import { fetchChainStatus, formatInt, formatXrge } from '../web3/rougechain.js';
import { setTheme, listThemes, getTheme } from './settings.js';
import { t, num, LANG, LANGS, LOCALE, switchLanguage } from '../../i18n/i18n.js';

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

/**
 * Prints `  label  value` rows with the values lined up in one column,
 * however long the labels run in the active language.
 * @param {Array<[string, string, string?]>} rows  label, value, className
 */
function printFields(rows) {
    const width = Math.max(...rows.map(([label]) => label.length)) + 2;
    rows.forEach(([label, value, className]) => print(`  ${label.padEnd(width, ' ')}${value}`, className));
}

/**
 * A project's status badge in the active language; the raw id if the
 * dictionary has no word for it.
 * @param {string} status
 */
function statusLabel(status) {
    const key = `term.projects.status.${status}`;
    const label = t(key);
    return label === key ? status : label;
}

const COMMANDS = {
    help: {
        describe: t('term.commands.help'),
        run() {
            print(t('term.help.heading'), 'term-heading');
            Object.entries(COMMANDS)
                .sort(([a], [b]) => a.localeCompare(b))
                .forEach(([name, command]) => {
                    print(`  ${name.padEnd(12, ' ')} ${command.describe}`);
                });
            print();
            print(t('term.help.hint'), 'term-muted');
        }
    },

    about: {
        describe: t('term.commands.about'),
        run() {
            SITE.bio.forEach(line => print(line));
        }
    },

    whoami: {
        describe: t('term.commands.whoami'),
        run() {
            print(`${SITE.handle} -- ${SITE.tagline}`);
        }
    },

    projects: {
        describe: t('term.commands.projects'),
        run() {
            PROJECTS.forEach(project => {
                print(`[${statusLabel(project.status)}] ${project.name}`, 'term-heading');
                print(`  ${project.blurb}`, 'term-muted');
                printLink('', project.url);
            });
        }
    },

    repos: {
        describe: t('term.commands.repos'),
        run() {
            REPOS.forEach(repo => {
                const tags = [repo.lang, repo.license, repo.stars && t('term.repos.stars', { n: repo.stars })]
                    .filter(Boolean).join(' - ');
                print(repo.name, 'term-heading');
                if (repo.desc) print(`  ${repo.desc}`, 'term-muted');
                if (tags) print(`  ${tags}`, 'term-muted');
                printLink('', `https://github.com/${GITHUB_USER}/${repo.name}`);
            });
            print();
            print(t('term.repos.footer'), 'term-muted');
            printLink('', `https://github.com/${GITHUB_USER}`);
        }
    },

    links: {
        describe: t('term.commands.links'),
        run() {
            LINKS.forEach(link => printLink(link.label, link.url));
        }
    },

    chain: {
        describe: t('term.commands.chain'),
        async run() {
            print(`${ROUGECHAIN.name} -- ${ROUGECHAIN.tagline} (${ROUGECHAIN.status})`, 'term-heading');
            print(ROUGECHAIN.summary);
            print();

            const pending = print(t('term.chain.querying'), 'term-muted');
            const status = await fetchChainStatus();
            pending.remove();
            if (status) {
                printFields([
                    [t('term.chain.chain'), status.chainId],
                    [t('term.chain.height'), t('term.chain.heightValue', {
                        height: formatInt(status.height),
                        finalized: formatInt(status.finalized)
                    })],
                    [t('term.chain.validators'), status.validators === null ? '--' : formatInt(status.validators)],
                    [t('term.chain.peers'), formatInt(status.peers)],
                    [t('term.chain.burned'), formatXrge(status.feesBurned), 'term-muted']
                ]);
            } else {
                print(`  ${t('term.chain.unreachable')}`, 'term-error');
            }
            print();

            ROUGECHAIN.ecosystem.forEach(({ group, items }) => {
                print(`  ${group.toLowerCase()}: ${items.map(item => item.name).join(', ')}`, 'term-muted');
            });
            print();
            printLink(t('term.chain.site'), ROUGECHAIN.url);
            printLink(t('term.chain.explorer'), ROUGECHAIN.explorer);
            printLink(t('term.chain.buy'), ROUGECHAIN.buyUrl);
            printLink(t('term.chain.coinbase'), ROUGECHAIN.coinbaseUrl);
        }
    },

    xrge: {
        describe: t('term.commands.xrge'),
        async run() {
            const pending = print(t('term.xrge.querying'), 'term-muted');
            const { status, data: market } = await fetchXrgeMarket();
            pending.remove();

            if (status === MarketStatus.NO_PAIR) {
                print(t('term.xrge.noPair'), 'term-error');
                print(t('term.xrge.contract', { address: TOKENS.XRGE.address }), 'term-muted');
                return;
            }
            if (status !== MarketStatus.OK) {
                print(t('term.xrge.unreachable'), 'term-error');
                return;
            }

            print(t('term.xrge.heading'), 'term-heading');
            printFields([
                [t('term.xrge.price'), formatUsd(market.priceUsd)],
                [t('term.xrge.change'), formatChange(market.change24h),
                    market.change24h >= 0 ? 'term-ok' : 'term-error'],
                [t('term.xrge.marketCap'), formatCompactUsd(market.marketCap)],
                [t('term.xrge.liquidity'), formatCompactUsd(market.liquidityUsd)],
                [t('term.xrge.volume'), formatCompactUsd(market.volume24h)],
                [t('term.xrge.venue'), market.dex, 'term-muted']
            ]);
        }
    },

    neofetch: {
        describe: t('term.commands.neofetch'),
        run() {
            const art = [
                '   ______            ',
                '  /|_||_\\`.__        ',
                ' (   _    _ _\\       ',
                ' =`-(_)--(_)-\'       '
            ];
            const fields = [
                [t('term.neofetch.os'), `${SITE.os} ${SITE.version}`],
                [t('term.neofetch.shell'), 'dsh'],
                [t('term.neofetch.theme'), getTheme()],
                [t('term.neofetch.engine'), navigator.userAgent.includes('Firefox') ? 'Gecko' : 'Blink/WebKit'],
                [t('term.neofetch.screen'), `${window.screen.width}x${window.screen.height}`],
                [t('term.neofetch.uptime'), t('term.neofetch.uptimeValue', { n: num(Math.floor(performance.now() / 1000)) })]
            ];
            const width = Math.max(...fields.map(([label]) => label.length)) + 3;
            const facts = [
                `${SITE.handle}@dread`,
                '-----------------',
                ...fields.map(([label, value]) => `${label.padEnd(width, ' ')}${value}`)
            ];
            const rows = Math.max(art.length, facts.length);
            for (let i = 0; i < rows; i += 1) {
                print(`${(art[i] || '').padEnd(22, ' ')}${facts[i] || ''}`);
            }
        }
    },

    theme: {
        describe: t('term.commands.theme'),
        run(args) {
            const themes = listThemes();
            if (args.length === 0) {
                print(t('term.theme.current', { theme: getTheme() }));
                print(t('term.theme.available', { list: themes.join(', ') }), 'term-muted');
                return;
            }
            const requested = args[0].toLowerCase();
            if (!themes.includes(requested)) {
                print(t('term.theme.unknown', { name: requested, list: themes.join(', ') }), 'term-error');
                return;
            }
            setTheme(requested);
            print(t('term.theme.set', { name: requested }), 'term-ok');
        }
    },

    matrix: {
        describe: t('term.commands.matrix'),
        run() {
            const canvas = document.getElementById('matrixCanvas');
            if (!canvas) return;
            if (matrixTimer) {
                stopMatrix();
                print(t('term.matrix.stopped'));
            } else {
                startMatrix(canvas);
                print(t('term.matrix.started'), 'term-ok');
            }
        }
    },

    netrun: {
        describe: t('term.commands.netrun'),
        run() {
            print(t('term.netrun.launching'), 'term-ok');
            window.openNetrun?.();
        }
    },

    date: {
        describe: t('term.commands.date'),
        run() {
            const now = new Date();
            // English keeps the classic Date string; other languages get their own words.
            print(LANG === 'en' ? now.toString() : now.toLocaleString(LOCALE, { dateStyle: 'full', timeStyle: 'long' }));
        }
    },

    echo: {
        describe: t('term.commands.echo'),
        run(args) {
            print(args.join(' '));
        }
    },

    sudo: {
        describe: t('term.commands.sudo'),
        run() {
            print(t('term.sudo.denied', { user: SITE.handle }), 'term-error');
            playSound(SOUNDS.ERROR);
        }
    },

    clear: {
        describe: t('term.commands.clear'),
        run() {
            output.textContent = '';
        }
    },

    exit: {
        describe: t('term.commands.exit'),
        run() {
            closeTerminal();
        }
    },

    lang: {
        describe: t('term.commands.lang'),
        run(args) {
            const codes = LANGS.map(lang => lang.code);
            if (args.length === 0) {
                const current = LANGS.find(lang => lang.code === LANG) ?? LANGS[0];
                const other = LANGS.find(lang => lang.code !== LANG) ?? current;
                print(t('term.lang.current', { code: current.code, name: current.name }));
                print(t('term.lang.available'), 'term-muted');
                LANGS.forEach(lang => print(`  ${lang.code.padEnd(4, ' ')}${lang.name}`, 'term-muted'));
                print(t('term.lang.usage', { example: other.code }), 'term-muted');
                return;
            }
            const requested = args[0].toLowerCase();
            const target = LANGS.find(lang => lang.code === requested);
            if (!target) {
                print(t('term.lang.unknown', { code: requested, list: codes.join(', ') }), 'term-error');
                return;
            }
            if (target.code === LANG) {
                print(t('term.lang.already', { name: target.name }), 'term-muted');
                return;
            }
            print(t('term.lang.switching', { name: target.name }), 'term-ok');
            switchLanguage(target.code);
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
        print(t('term.shell.notFound', { name }), 'term-error');
        print(t('term.shell.notFoundHint'), 'term-muted');
        return;
    }

    try {
        await command.run(args);
    } catch (error) {
        console.error(error);
        print(t('term.shell.failed', { name, error: error.message }), 'term-error');
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
    print(t('term.banner.title', { os: SITE.os, version: SITE.version }), 'term-heading');
    print(t('term.banner.connected', { handle: SITE.handle }), 'term-muted');
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
