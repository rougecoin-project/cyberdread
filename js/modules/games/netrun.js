/**
 * netrun.exe — a breach-protocol hacking game.
 *
 * Practice runs are free and local. Live runs are on RougeChain: the player pays the entry fee to
 * the NETRUN contract at block H, the board is generated from the hash of block H+1 (which nobody
 * knew when they paid), and the contract re-checks every move before paying SCRAP and minting
 * Implants. See netrun/README.md.
 */
import { playSound, SOUNDS } from '../sound.js';
import { NETRUN, ROUGECHAIN } from '../../data/site-config.js';
import {
    BUFFER, DAEMON_NAMES, DAEMON_REWARD, GRID, IMPLANTS, SYMBOLS,
    allowedCells, boardFromChain, makeBoard, practiceSeed, progress, rewardFor, score
} from './netrun-rules.js';
import * as chain from './netrun-chain.js';
import { t, list, num } from '../../i18n/i18n.js';

const EXTENSION_URL = ROUGECHAIN.ecosystem.flatMap((g) => g.items).find((i) => /chromewebstore|addons\.mozilla/i.test(i.url))?.url
    || 'https://chromewebstore.google.com/detail/rougechain-wallet/ilkbgjgphhaolfdjkfefdfiifipmhakj';
const QWALLA_URL = 'https://qwalla.io';
const isPhone = () => matchMedia('(pointer: coarse)').matches;
const NUDGE_AFTER_MS = 8000;
const NETRUN_TOP = 10;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const short = (pk) => (pk ? `${pk.slice(0, 6)}…${pk.slice(-4)}` : '');

// Display names only: the rules module keeps the canonical lists.
const DAEMON_LABELS = list('netrun.daemons');
const daemonName = (d) => DAEMON_LABELS[d] ?? DAEMON_NAMES[d];
/** A network id as wallets name it ('testnet'), in the active language. */
const netName = (id) => (id === 'testnet' || id === 'mainnet' ? t(`netrun.net.${id}`) : id);
const ONE_DECIMAL = { minimumFractionDigits: 1, maximumFractionDigits: 1 };
const TWO_DECIMALS = { minimumFractionDigits: 2, maximumFractionDigits: 2 };

const state = {
    mode: 'practice',
    player: null,
    inventory: null,
    info: null,
    practice: null,   // { board, path, deadline, result }
    live: { phase: 'idle' }, // idle | paying | sealing | board | submitting | result | expired | error
    timer: null,
    poll: null
};

let root = null;

/* ---------------------------------------------------------------- timing */

function startTimer(game) {
    stopTimer();
    state.timer = setInterval(() => {
        const left = Math.max(0, game.deadline - Date.now());
        const el = root?.querySelector('[data-nr-timer]');
        if (el) {
            el.textContent = num(left / 1000, ONE_DECIMAL);
            el.classList.toggle('nr-hot', left < 15_000);
        }
        if (left === 0) {
            stopTimer();
            onTraceComplete(game);
        }
    }, 100);
}

function stopTimer() {
    clearInterval(state.timer);
    state.timer = null;
}

function stopPoll() {
    clearTimeout(state.poll);
    state.poll = null;
}

function onTraceComplete(game) {
    if (game === state.practice && !game.result) return finishPractice();
    if (state.mode === 'live' && state.live.phase === 'board') {
        if (state.live.path.length && !state.live.retry) submitBreach();
        else {
            state.live.note = t('netrun.game.traceComplete');
            render();
        }
    }
}

/* -------------------------------------------------------------- practice */

function newPractice() {
    state.practice = {
        board: makeBoard(practiceSeed()),
        path: [],
        deadline: Date.now() + NETRUN.traceSeconds * 1000,
        result: null
    };
    startTimer(state.practice);
    render();
}

function finishPractice() {
    const p = state.practice;
    stopTimer();
    const up = score(p.board, p.path);
    p.result = { up, scrap: rewardFor(up), full: up.every(Boolean) };
    playSound(p.result.scrap ? SOUNDS.OPEN : SOUNDS.ERROR);
    render();
}

/* ------------------------------------------------------------------ live */

async function connect() {
    try {
        state.player = await chain.connect();
        playSound(SOUNDS.OPEN);
        render();
        if (state.mode === 'top') return refreshTop();
        await refreshLive();
    } catch (error) {
        state.live = { phase: error.message === 'no-wallet' ? 'no-wallet' : 'idle', note: error.message === 'no-wallet' ? '' : t('netrun.wallet.error', { message: error.message }) };
        render();
    }
}

async function refreshInventory() {
    if (!state.player || !chain.isConfigured()) return;
    state.inventory = await chain.inventory(state.player).catch(() => state.inventory);
}

/* ----------------------------------------------------------- leaderboard */

/** Loads the on-chain top list and, if connected, the player's own totals. */
async function refreshTop() {
    if (!chain.isConfigured()) return render();
    state.top = { ...(state.top || {}), loading: true };
    render();
    try {
        const [board, mine, myHash] = await Promise.all([
            chain.leaderboard(),
            state.player ? chain.stats(state.player).catch(() => null) : null,
            state.player ? chain.addressHash(state.player).catch(() => null) : null
        ]);
        state.top = { board, mine, myHash, at: Date.now() };
    } catch (error) {
        state.top = { error: t('netrun.status.unreachable', { message: error.message }) };
    }
    if (state.mode === 'top') render();
}

function renderLeaderboard() {
    const T = state.top;
    if (!chain.isConfigured()) return panel(t('netrun.top.title'), `<p>${t('netrun.top.notLive')}</p>`);
    if (!T || (T.loading && !T.board)) return panel(t('netrun.top.title'), `<p class="nr-wait"><span class="nr-spin"></span><span>${t('netrun.top.reading')}</span></p>`);
    if (T.error) return panel(t('netrun.live.linkDown'), `<p>${esc(T.error)}</p><button type="button" class="nr-btn" data-act="to-top">${t('netrun.live.retry')}</button>`);
    const rows = T.board.top || [];
    const addrShort = (a) => `${a.slice(0, 10)}…${a.slice(-6)}`;
    const list = rows.length
        ? rows.map((r, i) => {
            const address = chain.toAddress(r.addr);
            const me = T.myHash === r.addr;
            return `<li class="${me ? 'nr-me' : ''}${i < 3 ? ` nr-podium nr-p${i + 1}` : ''}">
                <span class="nr-rank">${i + 1}</span>
                <span class="nr-who" title="${address}"><span class="nr-addr">${addrShort(address)}</span>${me ? `<em>${t('netrun.top.you')}</em>` : ''}</span>
                <span class="nr-full" title="${t('netrun.top.fullTitle')}">${r.full ? `◆ ${r.full}` : ''}</span>
                <b class="nr-score">${num(r.scrap)} <small>SCRAP</small></b>
            </li>`;
        }).join('')
        : `<li class="nr-empty">${t('netrun.top.empty')}</li>`;
    const m = T.mine;
    const mine = !state.player
        ? `<p class="nr-fine">${t('netrun.top.connect')}</p>`
        : m ? `<p class="nr-mine">${t('netrun.top.mine', {
            scrap: num(m.scrap),
            runs: t('netrun.runs', { n: m.runs }),
            full: t('netrun.fullBreaches', { n: m.full }),
            rank: m.rank ? t('netrun.top.rank', { rank: m.rank }) : t('netrun.top.outside', { top: NETRUN_TOP })
        })}</p>` : '';
    return panel(t('netrun.top.titleScrap'), `
        <p class="nr-fine">${t('netrun.top.intro', { players: t('netrun.runners', { n: T.board.players }) })}</p>
        <ol class="nr-board">${list}</ol>
        ${mine}
        <button type="button" class="nr-btn" data-act="to-top">${t('netrun.top.refresh')}</button>`);
}

/** Reads the player's run from the contract and resumes wherever it is. */
async function refreshLive() {
    if (!chain.isConfigured()) return render();
    stopPoll();
    try {
        const [info, run] = await Promise.all([chain.info().catch(() => null), state.player ? chain.board(state.player) : null]);
        state.info = info;
        await refreshInventory();
        if (!run || !run.open) {
            if (!['result', 'error'].includes(state.live.phase)) state.live = { phase: 'idle', note: state.live.phase === 'idle' ? state.live.note : undefined };
        } else if (run.expired) {
            state.live = { phase: 'expired', height: run.height };
        } else if (!run.ready) {
            beginSealing(run.height);
            return;
        } else {
            loadBoard(run);
        }
    } catch (error) {
        state.live = { phase: 'error', note: t('netrun.status.unreachable', { message: error.message }) };
    }
    render();
}

function loadBoard(run) {
    const key = `netrun:deadline:${state.player?.slice(-16)}:${run.height}`;
    let deadline = Number(sessionStorage.getItem(key));
    if (!deadline) {
        deadline = Date.now() + NETRUN.traceSeconds * 1000;
        try { sessionStorage.setItem(key, String(deadline)); } catch { /* private mode */ }
    }
    const keep = state.live.phase === 'board' && state.live.height === run.height ? state.live.path : [];
    state.live = { phase: 'board', height: run.height, expires: run.expires, board: boardFromChain(run), path: keep, deadline };
    startTimer(state.live);
    playSound(SOUNDS.OPEN);
}

function beginSealing(height) {
    const started = Date.now();
    state.live = { phase: 'sealing', height, started };
    render();
    const tick = async () => {
        if (state.mode !== 'live' || state.live.phase !== 'sealing') return;
        try {
            const run = await chain.board(state.player);
            if (run?.open && run.ready) { loadBoard(run); render(); return; }
        } catch { /* keep polling */ }
        if (Date.now() - started > NUDGE_AFTER_MS && !state.live.canNudge) {
            state.live.canNudge = true;
            render();
        }
        state.poll = setTimeout(tick, 1500);
    };
    state.poll = setTimeout(tick, 1200);
}

async function jackIn() {
    state.live = { phase: 'paying', note: t('netrun.status.approveFee', { wallet: chain.walletName() }) };
    render();
    try {
        const tx = await chain.jackIn();
        state.live.note = t('netrun.status.paymentSent');
        state.live.txId = tx.txId;
        render();
        const r = await chain.receipt(tx.txId);
        if (!r.ok) throw new Error(r.error || t('netrun.status.refused'));
        await refreshInventory();
        beginSealing(r.height);
    } catch (error) {
        state.live = { phase: 'idle', note: friendly(error) };
        render();
    }
}

async function nudge() {
    state.live.canNudge = false;
    state.live.note = t('netrun.status.sealing');
    render();
    try {
        const tx = await chain.nudge();
        await chain.receipt(tx.txId, { timeoutMs: 30_000 }).catch(() => {});
    } catch (error) {
        state.live.note = friendly(error);
        state.live.canNudge = true;
        render();
    }
}

async function submitBreach() {
    const run = state.live;
    if (!run.path.length) return;
    stopTimer();
    const path = [...run.path];
    state.live = { ...run, phase: 'submitting', note: t('netrun.status.approveUpload', { wallet: chain.walletName() }) };
    render();
    let tx = null;
    try {
        tx = await chain.breach(path);
        state.live.note = t('netrun.status.checking');
        state.live.txId = tx.txId;
        render();
        const r = await chain.receipt(tx.txId);
        if (!r.ok) {
            // The chain refused it: say so, never "cancelled in the wallet".
            const refused = new Error(r.error || t('netrun.status.rejected'));
            refused.fromChain = true;
            throw refused;
        }
        await showBreachResult(run, path, tx.txId);
    } catch (error) {
        // Once submitted, the chain decides: if the run closed, the upload went through.
        const open = tx ? await chain.board(state.player).then((b) => b?.open).catch(() => true) : true;
        if (!open) return showBreachResult(run, path, tx.txId);
        // The run is still open on-chain: back to the board. Never re-submit on its own.
        state.live = { ...run, phase: 'board', note: friendly(error), retry: true };
        if (run.deadline > Date.now()) startTimer(state.live);
    }
    render();
}

async function showBreachResult(run, path, txId) {
    const up = score(run.board, path);
    await refreshInventory();
    state.live = { ...run, phase: 'result', txId, result: { up, scrap: rewardFor(up), full: up.every(Boolean) } };
    playSound(SOUNDS.OPEN);
    render();
}

async function runSetup() {
    state.live = { phase: 'paying', title: t('netrun.status.switchingTitle'), note: t('netrun.status.approveSetup', { wallet: chain.walletName() }) };
    render();
    try {
        const tx = await chain.setup();
        state.live.note = t('netrun.status.switching');
        render();
        const r = await chain.receipt(tx.txId);
        if (!r.ok) throw new Error(r.error || t('netrun.status.setupFailed'));
        state.live = { phase: 'idle', note: t('netrun.status.isLive') };
    } catch (error) {
        const m = friendly(error);
        state.live = { phase: 'idle', note: /unreachable|would fail/i.test(m) ? t('netrun.status.notOwner') : m };
    }
    await refreshLive();
}

async function abandonRun() {
    stopTimer();
    try {
        const tx = await chain.abandon();
        await chain.receipt(tx.txId, { timeoutMs: 30_000 });
        state.live = { phase: 'idle', note: t('netrun.status.abandoned') };
    } catch (error) {
        state.live.note = friendly(error);
    }
    render();
}

function friendly(error) {
    const m = String(error?.message || error);
    if (!error?.fromChain && /reject|denied|cancel/i.test(m)) return t('netrun.errors.cancelled');
    if (/insufficient|balance/i.test(m)) {
        // The node says what it saw ("have 0.000000, need 0.140000"). If the wallet shows more than
        // that, it signed for a different network than NETRUN runs on.
        const seen = m.match(/have ([\d.]+)/);
        return t('netrun.errors.funds', { network: netName(NETRUN.networkId), need: num(NETRUN.entryXrge + 0.12, TWO_DECIMALS) })
            + (seen ? t('netrun.errors.fundsSeen', { seen: num(Number(seen[1]), { maximumFractionDigits: 6 }), api: NETRUN.api }) : t('netrun.errors.fundsEnd'));
    }
    if (m === 'receipt-timeout') return t('netrun.errors.timeout');
    if (m === 'no-wallet') return t('netrun.errors.noWallet');
    if (/contract not found/i.test(m)) return t('netrun.errors.otherNetwork', { wallet: chain.walletName(), network: netName(NETRUN.networkId) });
    return m.length > 160 ? `${m.slice(0, 160)}…` : m;
}

/* ------------------------------------------------------------- rendering */

const current = () => (state.mode === 'practice' ? state.practice : state.live.board ? state.live : null);
const playing = () => (state.mode === 'practice' ? !state.practice?.result : state.live.phase === 'board');

function cell(board, path, i, allowed) {
    const picked = path.indexOf(i);
    const r = Math.floor(i / GRID);
    const c = i % GRID;
    const cls = ['nr-cell'];
    if (picked >= 0) cls.push('nr-used');
    if (allowed.has(i)) cls.push('nr-open');
    return `<button type="button" class="${cls.join(' ')}" data-cell="${i}" ${allowed.has(i) && playing() ? '' : 'disabled'}
        aria-label="${t('netrun.game.cell', { row: r + 1, col: c + 1, code: SYMBOLS[board.grid[i]] })}${picked >= 0 ? t('netrun.game.cellUsed') : ''}">${SYMBOLS[board.grid[i]]}${picked >= 0 ? `<i>${picked + 1}</i>` : ''}</button>`;
}

function renderGame(game, { live }) {
    const { board, path } = game;
    const allowed = new Set(playing() ? allowedCells(path) : []);
    const last = path[path.length - 1];
    const axis = path.length === 0 ? 'row' : path.length % 2 === 1 ? 'col' : 'row';
    const line = path.length === 0 ? 0 : axis === 'col' ? last % GRID : Math.floor(last / GRID);
    const up = score(board, path);
    const result = game.result;

    const daemons = board.daemons.map((want, d) => {
        const done = up[d];
        const got = done ? want.length : progress(board, path, d);
        const codes = want.map((s, j) => `<span class="${j < got ? 'nr-hit' : ''}">${SYMBOLS[s]}</span>`).join('');
        return `<li class="${done ? 'nr-done' : ''}">
            <div class="nr-dname">${daemonName(d)}<small>+${DAEMON_REWARD[d]} SCRAP</small></div>
            <div class="nr-codes">${codes}</div>
            <b class="nr-dstate">${done ? t('netrun.game.uploaded') : ''}</b>
        </li>`;
    }).join('');

    const buffer = Array.from({ length: BUFFER }, (_, i) =>
        `<span class="${i < path.length ? 'nr-filled' : ''}">${i < path.length ? SYMBOLS[board.grid[path[i]]] : ''}</span>`).join('');

    const counts = result && { n: result.up.filter(Boolean).length, scrap: num(result.scrap), implant: esc(IMPLANTS[board.implant]) };
    const summary = result && (live ? t('netrun.result.summaryLive', counts) : t('netrun.result.summaryPractice', counts));
    const implant = result && (live ? t('netrun.result.implantLive', counts) : t('netrun.result.implantPractice', counts));
    const overlay = result ? `
        <div class="nr-result ${result.full ? 'nr-full' : result.scrap ? 'nr-partial' : 'nr-fail'}" role="status">
            <p class="nr-result-kicker">${live ? t('netrun.result.verified') : t('netrun.result.practiceRun')}</p>
            <h3>${result.full ? t('netrun.result.full') : result.scrap ? t('netrun.result.partial') : t('netrun.result.fail')}</h3>
            <p>${summary}${result.full ? implant : ''}</p>
            <div class="nr-result-actions">
                ${live
                    ? `<button type="button" class="nr-btn nr-primary" data-act="again-live">${t('netrun.result.again')}</button>${game.txId ? `<a class="nr-btn" href="${chain.explorerTx(game.txId)}" target="_blank" rel="noopener noreferrer">${t('netrun.result.viewTx')}</a>` : ''}`
                    : `<button type="button" class="nr-btn nr-primary" data-act="practice">${t('netrun.result.newBoard')}</button>`}
            </div>
        </div>` : '';

    return `
    <div class="nr-main">
        <div class="nr-matrix-wrap">
            <div class="nr-label"><span>${t('netrun.game.matrix')}</span><span class="nr-timer" aria-label="${t('netrun.game.traceLabel')}">${t('netrun.game.trace')} <b data-nr-timer>${num(playing() ? Math.max(0, (game.deadline - Date.now()) / 1000) : 0, ONE_DECIMAL)}</b></span></div>
            <div class="nr-matrix nr-axis-${axis}" style="--nr-line:${line}">
                ${board.grid.map((_, i) => cell(board, path, i, allowed)).join('')}
            </div>
            ${overlay}
        </div>
        <aside class="nr-side">
            <div class="nr-label"><span>${t('netrun.game.buffer')}</span><span>${path.length}/${BUFFER}</span></div>
            <div class="nr-buffer">${buffer}</div>
            <div class="nr-label"><span>${t('netrun.game.daemons')}</span><span>${live ? t('netrun.game.paidByContract') : t('netrun.game.practice')}</span></div>
            <ol class="nr-daemons">${daemons}</ol>
            <p class="nr-implant">${t('netrun.game.implant', { implant: esc(IMPLANTS[board.implant]) })}</p>
            ${playing() ? `
            <div class="nr-actions">
                <button type="button" class="nr-btn" data-act="undo" ${path.length ? '' : 'disabled'}>${t('netrun.game.undo')}</button>
                <button type="button" class="nr-btn nr-primary" data-act="${live ? 'breach' : 'finish'}" ${path.length ? '' : 'disabled'}>${live ? t('netrun.game.uploadLive') : t('netrun.game.upload')}</button>
            </div>
            ${live ? `<button type="button" class="nr-link" data-act="abandon">${t('netrun.game.abandon')}</button>` : ''}` : ''}
        </aside>
    </div>`;
}

function renderLiveScreen() {
    const L = state.live;
    if (!chain.isConfigured()) {
        return panel(t('netrun.live.soonTitle'), `
            <p>${t('netrun.live.soon')}</p>
            <p>${t('netrun.live.notDeployed')}</p>
            <button type="button" class="nr-btn nr-primary" data-act="to-practice">${t('netrun.live.practice')}</button>`);
    }
    if (L.phase === 'no-wallet' || (!state.player && !chain.wallet())) {
        const phone = isPhone();
        const qwalla = phone
            ? `<a class="nr-btn nr-primary" href="${chain.qwallaLink()}">${t('netrun.live.openQwalla')}</a><a class="nr-btn" href="${QWALLA_URL}" target="_blank" rel="noopener noreferrer">${t('netrun.live.getQwalla')}</a>`
            : `<a class="nr-btn" href="${QWALLA_URL}" target="_blank" rel="noopener noreferrer">${t('netrun.live.qwallaApp')}</a>`;
        const extension = `<a class="nr-btn${phone ? '' : ' nr-primary'}" href="${EXTENSION_URL}" target="_blank" rel="noopener noreferrer">${t('netrun.live.extension')}</a>`;
        return panel(t('netrun.live.walletTitle'), `
            <p>${t('netrun.live.walletText')}</p>
            <div class="nr-row">${phone ? qwalla + extension : extension + qwalla}</div>
            <div class="nr-row"><button type="button" class="nr-btn" data-act="connect">${t('netrun.live.haveOne')}</button></div>`);
    }
    if (!state.player) {
        return panel(t('netrun.live.jackInTitle'), `
            <p>${t('netrun.live.connectText', { wallet: chain.walletName() })}</p>
            <button type="button" class="nr-btn nr-primary" data-act="connect">${chain.walletKind() === 'qwalla' ? t('netrun.live.connectQwalla') : t('netrun.live.connectWallet')}</button>`);
    }
    if (chain.wrongNetwork() && !['board', 'submitting', 'result'].includes(L.phase)) {
        const want = NETRUN.networkId;
        return panel(t('netrun.live.wrongTitle'), `
            <p>${t('netrun.live.wrongText', { wallet: chain.walletName(), have: esc(netName(chain.connectedNetwork())), want: esc(netName(want)) })}</p>
            <p>${t('netrun.live.switchText', { wallet: chain.walletName(), faucet: want === 'testnet' ? t('netrun.live.faucet') : '' })}</p>
            <button type="button" class="nr-btn nr-primary" data-act="connect">${t('netrun.live.reconnect')}</button>`);
    }
    if (L.phase === 'paying' || L.phase === 'submitting') {
        return panel(L.title || (L.phase === 'paying' ? t('netrun.live.openingTitle') : t('netrun.live.uploadingTitle')), `<p class="nr-wait"><span class="nr-spin"></span><span>${esc(L.note || '')}</span></p>${L.txId ? `<a class="nr-link" href="${chain.explorerTx(L.txId)}" target="_blank" rel="noopener noreferrer">${t('netrun.live.transaction', { id: esc(L.txId.slice(0, 12)) })}</a>` : ''}`);
    }
    if (L.phase === 'sealing') {
        return panel(t('netrun.live.sealingTitle'), `
            <p class="nr-wait"><span class="nr-spin"></span><span>${t('netrun.live.sealing', { height: L.height, next: L.height + 1 })}</span></p>
            ${L.note ? `<p class="nr-note">${esc(L.note)}</p>` : ''}
            ${L.canNudge ? `<p>${t('netrun.live.quiet')}</p><button type="button" class="nr-btn" data-act="nudge">${t('netrun.live.nudge')}</button>` : ''}`);
    }
    if (L.phase === 'expired') {
        return panel(t('netrun.live.expiredTitle'), `
            <p>${t('netrun.live.expired', { height: L.height })}</p>
            ${jackInButton()}`);
    }
    if (L.phase === 'error') {
        return panel(t('netrun.live.linkDown'), `<p>${esc(L.note)}</p><button type="button" class="nr-btn" data-act="retry">${t('netrun.live.retry')}</button>`);
    }
    // idle
    const info = state.info;
    if (info && info.setup === false) {
        return panel(t('netrun.live.ownerTitle'), `
            <p>${t('netrun.live.owner')}</p>
            ${L.note ? `<p class="nr-note">${esc(L.note)}</p>` : ''}
            <button type="button" class="nr-btn nr-primary" data-act="setup">${t('netrun.live.runSetup')}</button>`);
    }
    return panel(t('netrun.live.jackInTitle'), `
        <p>${t('netrun.live.jackInText', { fee: num(NETRUN.entryXrge), seconds: NETRUN.traceSeconds })}</p>
        <ul class="nr-pays">
            ${DAEMON_NAMES.map((_, d) => `<li><span>${daemonName(d)}</span><b>+${DAEMON_REWARD[d]} SCRAP</b></li>`).join('')}
            <li><span>${t('netrun.live.allThree')}</span><b>${t('netrun.live.implantNft')}</b></li>
        </ul>
        ${L.note ? `<p class="nr-note">${esc(L.note)}</p>` : ''}
        ${jackInButton()}
        ${info ? `<p class="nr-fine">${t('netrun.runs', { n: info.runs })} · ${t('netrun.fullBreaches', { n: info.full_breaches })} · <a href="${chain.explorerContract()}" target="_blank" rel="noopener noreferrer">${t('netrun.live.contract')}</a></p>` : ''}
        <p class="nr-fine">${t('netrun.live.fine', { gas: num((NETRUN.gas.jackIn + NETRUN.gas.breach) / 1e6, TWO_DECIMALS) })}</p>`);
}

const jackInButton = () => `<button type="button" class="nr-btn nr-primary nr-big" data-act="jack-in">${t('netrun.live.jackIn', { fee: num(NETRUN.entryXrge) })}</button>`;

const panel = (title, body) => `<div class="nr-panel"><h3>${title}</h3>${body}</div>`;

function render() {
    if (!root) return;
    const live = state.mode === 'live';
    const inv = state.inventory;
    const walletChip = state.player
        ? `<span class="nr-chip" title="${esc(chain.walletName())}: ${esc(state.player)}"><i></i>${short(state.player)}${inv ? `${inv.scrap !== null ? ` · <b>${num(inv.scrap)}</b> SCRAP` : ''}${inv.implants ? ` · ${t('netrun.wallet.implants', { n: inv.implants.length })}` : ''}` : ''}</span>`
        : (live || state.mode === 'top') && chain.isConfigured() ? `<button type="button" class="nr-chip nr-chip-btn" data-act="connect">${t('netrun.wallet.connect')}</button>` : '';

    let body;
    if (state.mode === 'top') {
        body = renderLeaderboard();
    } else if (!live) {
        if (!state.practice) newPractice();
        body = renderGame(state.practice, { live: false });
    } else if (['board', 'result'].includes(state.live.phase) && state.live.board) {
        body = renderGame(state.live, { live: true })
            + (state.live.note ? `<p class="nr-note nr-note-bar">${esc(state.live.note)}</p>` : '');
    } else {
        body = renderLiveScreen();
    }

    root.innerHTML = `
    <div class="nr-top">
        <div class="nr-tabs" role="tablist" aria-label="${t('netrun.tabs.label')}">
            <button type="button" role="tab" aria-selected="${state.mode === 'practice'}" data-act="to-practice">${t('netrun.tabs.practice')}</button>
            <button type="button" role="tab" aria-selected="${live}" data-act="to-live">${t('netrun.tabs.live')} <small>${esc(netName(NETRUN.network.replace('RougeChain ', '')))}</small></button>
            <button type="button" role="tab" aria-selected="${state.mode === 'top'}" data-act="to-top">${t('netrun.tabs.top')}</button>
        </div>
        ${walletChip}
    </div>
    ${body}`;
}

/* -------------------------------------------------------------- events */

function onClick(event) {
    const cellEl = event.target.closest('[data-cell]');
    if (cellEl) {
        const game = current();
        const i = Number(cellEl.dataset.cell);
        if (!game || !playing() || !allowedCells(game.path).includes(i)) return;
        game.path.push(i);
        document.dispatchEvent(new CustomEvent('playSound', { detail: { id: 'clickSound' } }));
        if (game.path.length === BUFFER) {
            if (state.mode === 'practice') return finishPractice();
        }
        return render();
    }
    const act = event.target.closest('[data-act]')?.dataset.act;
    if (!act) return;
    const game = current();
    switch (act) {
        case 'to-practice':
            state.mode = 'practice';
            stopPoll();
            if (state.practice && !state.practice.result) startTimer(state.practice);
            return render();
        case 'to-top':
            state.mode = 'top';
            stopTimer();
            return refreshTop();
        case 'to-live':
            state.mode = 'live';
            stopTimer();
            render();
            return refreshLive();
        case 'practice': return newPractice();
        case 'undo': game?.path.pop(); return render();
        case 'finish': return finishPractice();
        case 'breach': return submitBreach();
        case 'abandon': return abandonRun();
        case 'setup': return runSetup();
        case 'connect': return connect();
        case 'jack-in': case 'again-live': return jackIn();
        case 'nudge': return nudge();
        case 'retry': return refreshLive();
        default: return undefined;
    }
}

/* -------------------------------------------------------------- window */

export function openNetrun() {
    playSound(SOUNDS.OPEN);
    const win = document.getElementById('netrun');
    if (!win) return;
    win.style.display = 'block';
    document.dispatchEvent(new CustomEvent('window:opened', { detail: { id: 'netrun' } }));
    render();
    if (state.mode === 'practice' && state.practice && !state.practice.result) startTimer(state.practice);
    if (state.mode === 'live') refreshLive();
}

export function closeNetrun() {
    playSound(SOUNDS.CLOSE);
    stopTimer();
    stopPoll();
    const win = document.getElementById('netrun');
    if (win) win.style.display = 'none';
    document.dispatchEvent(new CustomEvent('window:closed', { detail: { id: 'netrun' } }));
}

export function initNetrun() {
    root = document.getElementById('netrunBody');
    root?.addEventListener('click', onClick);
    // Reconnect silently if the wallet already approved this site.
    chain.whenWalletReady().then((w) => {
        if (!w || !chain.isConfigured()) return;
        w.on?.('accountsChanged', () => { state.player = null; state.inventory = null; if (state.mode === 'live') refreshLive(); });
    });
}
