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

const EXTENSION_URL = ROUGECHAIN.ecosystem.flatMap((g) => g.items).find((i) => /extension/i.test(i.name))?.url
    || 'https://chromewebstore.google.com/detail/rougechain-wallet/ilkbgjgphhaolfdjkfefdfiifipmhakj';
const QWALLA_URL = 'https://qwalla.io';
const isPhone = () => matchMedia('(pointer: coarse)').matches;
const NUDGE_AFTER_MS = 8000;
const NETRUN_TOP = 10;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const short = (pk) => (pk ? `${pk.slice(0, 6)}…${pk.slice(-4)}` : '');

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
            el.textContent = (left / 1000).toFixed(1);
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
            state.live.note = 'Trace complete. Upload at least one code, or abandon the run.';
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
        state.live = { phase: error.message === 'no-wallet' ? 'no-wallet' : 'idle', note: error.message === 'no-wallet' ? '' : `Wallet: ${error.message}` };
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
        state.top = { error: `Could not reach RougeChain: ${error.message}` };
    }
    if (state.mode === 'top') render();
}

function renderLeaderboard() {
    const T = state.top;
    if (!chain.isConfigured()) return panel('LEADERBOARD', '<p>The leaderboard goes live with the NETRUN contract.</p>');
    if (!T || (T.loading && !T.board)) return panel('LEADERBOARD', '<p class="nr-wait"><span class="nr-spin"></span><span>Reading the chain…</span></p>');
    if (T.error) return panel('LINK DOWN', `<p>${esc(T.error)}</p><button type="button" class="nr-btn" data-act="to-top">Retry</button>`);
    const rows = T.board.top || [];
    const addrShort = (a) => `${a.slice(0, 10)}…${a.slice(-6)}`;
    const list = rows.length
        ? rows.map((r, i) => {
            const address = chain.toAddress(r.addr);
            const me = T.myHash === r.addr;
            return `<li class="${me ? 'nr-me' : ''}${i < 3 ? ` nr-podium nr-p${i + 1}` : ''}">
                <span class="nr-rank">${i + 1}</span>
                <span class="nr-who" title="${address}"><span class="nr-addr">${addrShort(address)}</span>${me ? '<em>you</em>' : ''}</span>
                <span class="nr-full" title="Full breaches">${r.full ? `◆ ${r.full}` : ''}</span>
                <b class="nr-score">${r.scrap.toLocaleString()} <small>SCRAP</small></b>
            </li>`;
        }).join('')
        : '<li class="nr-empty">No SCRAP paid out yet. Be the first on the board.</li>';
    const m = T.mine;
    const mine = !state.player
        ? '<p class="nr-fine">Connect a wallet to see your own totals.</p>'
        : m ? `<p class="nr-mine">You: <b>${m.scrap.toLocaleString()} SCRAP</b> earned · ${m.runs} run${m.runs === 1 ? '' : 's'} · ${m.full} full breach${m.full === 1 ? '' : 'es'} · ${m.rank ? `rank <b>#${m.rank}</b>` : `not in the top ${NETRUN_TOP}`}</p>` : '';
    return panel('SCRAP LEADERBOARD', `
        <p class="nr-fine">Top runners by SCRAP the NETRUN contract has paid them, kept on-chain by the contract itself. ${T.board.players} runner${T.board.players === 1 ? '' : 's'} so far.</p>
        <ol class="nr-board">${list}</ol>
        ${mine}
        <button type="button" class="nr-btn" data-act="to-top">Refresh</button>`);
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
        state.live = { phase: 'error', note: `Could not reach RougeChain: ${error.message}` };
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
    state.live = { phase: 'paying', note: `Approve the entry fee in ${chain.walletName()}…` };
    render();
    try {
        const tx = await chain.jackIn();
        state.live.note = 'Payment sent. Waiting for the block…';
        state.live.txId = tx.txId;
        render();
        const r = await chain.receipt(tx.txId);
        if (!r.ok) throw new Error(r.error || 'The contract refused the run.');
        await refreshInventory();
        beginSealing(r.height);
    } catch (error) {
        state.live = { phase: 'idle', note: friendly(error) };
        render();
    }
}

async function nudge() {
    state.live.canNudge = false;
    state.live.note = 'Sealing a block…';
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
    state.live = { ...run, phase: 'submitting', note: `Approve the upload in ${chain.walletName()}…` };
    render();
    let tx = null;
    try {
        tx = await chain.breach(path);
        state.live.note = 'Uploading. The contract is checking your moves…';
        state.live.txId = tx.txId;
        render();
        const r = await chain.receipt(tx.txId);
        if (!r.ok) throw new Error(r.error || 'The contract rejected the path.');
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
    state.live = { phase: 'paying', title: 'SWITCHING ON', note: `Approve setup in ${chain.walletName()}…` };
    render();
    try {
        const tx = await chain.setup();
        state.live.note = 'Switching the contract on…';
        render();
        const r = await chain.receipt(tx.txId);
        if (!r.ok) throw new Error(r.error || 'setup failed');
        state.live = { phase: 'idle', note: 'NETRUN is live. Jack in.' };
    } catch (error) {
        const m = friendly(error);
        state.live = { phase: 'idle', note: /unreachable|would fail/i.test(m) ? 'Setup is locked to the owner\'s wallet, and this one is not it.' : m };
    }
    await refreshLive();
}

async function abandonRun() {
    stopTimer();
    try {
        const tx = await chain.abandon();
        await chain.receipt(tx.txId, { timeoutMs: 30_000 });
        state.live = { phase: 'idle', note: 'Run abandoned.' };
    } catch (error) {
        state.live.note = friendly(error);
    }
    render();
}

function friendly(error) {
    const m = String(error?.message || error);
    if (/reject|denied|cancel/i.test(m)) return 'Cancelled in the wallet.';
    if (/insufficient|balance/i.test(m)) {
        // The node says what it saw ("have 0.000000, need 0.140000"). If the wallet shows more than
        // that, it signed for a different network than NETRUN runs on.
        const seen = m.match(/have ([\d.]+)/);
        return `Not enough XRGE on ${NETRUN.networkId} for the entry fee plus gas (about ${(NETRUN.entryXrge + 0.12).toFixed(2)} XRGE)`
            + (seen ? `: the node sees ${Number(seen[1])} XRGE. If your wallet shows more, it is sending to another network: set its node to ${NETRUN.api}.` : '.');
    }
    if (m === 'receipt-timeout') return 'The chain has not confirmed it yet. Reopen netrun.exe in a minute to resume.';
    if (m === 'no-wallet') return 'Open this page in Qwalla, or install the RougeChain Wallet extension, to play live runs.';
    if (/contract not found/i.test(m)) return `Your wallet is on a different network. Switch ${chain.walletName()} to ${NETRUN.networkId} and try again.`;
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
        aria-label="Row ${r + 1}, column ${c + 1}: ${SYMBOLS[board.grid[i]]}${picked >= 0 ? ', used' : ''}">${SYMBOLS[board.grid[i]]}${picked >= 0 ? `<i>${picked + 1}</i>` : ''}</button>`;
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
            <div class="nr-dname">${DAEMON_NAMES[d]}<small>+${DAEMON_REWARD[d]} SCRAP</small></div>
            <div class="nr-codes">${codes}</div>
            <b class="nr-dstate">${done ? 'UPLOADED' : ''}</b>
        </li>`;
    }).join('');

    const buffer = Array.from({ length: BUFFER }, (_, i) =>
        `<span class="${i < path.length ? 'nr-filled' : ''}">${i < path.length ? SYMBOLS[board.grid[path[i]]] : ''}</span>`).join('');

    const overlay = result ? `
        <div class="nr-result ${result.full ? 'nr-full' : result.scrap ? 'nr-partial' : 'nr-fail'}" role="status">
            <p class="nr-result-kicker">${live ? 'Verified on RougeChain' : 'Practice run'}</p>
            <h3>${result.full ? 'FULL BREACH' : result.scrap ? 'PARTIAL BREACH' : 'TRACE COMPLETE'}</h3>
            <p>${result.up.filter(Boolean).length} of 3 daemons uploaded · ${live ? '' : 'would pay '}<b>${result.scrap} SCRAP</b>${result.full ? ` · ${live ? '' : 'would mint '}<b>${esc(IMPLANTS[board.implant])}</b> Implant` : ''}</p>
            <div class="nr-result-actions">
                ${live
                    ? `<button type="button" class="nr-btn nr-primary" data-act="again-live">Jack in again</button>${game.txId ? `<a class="nr-btn" href="${chain.explorerTx(game.txId)}" target="_blank" rel="noopener noreferrer">View transaction</a>` : ''}`
                    : `<button type="button" class="nr-btn nr-primary" data-act="practice">New board</button>`}
            </div>
        </div>` : '';

    return `
    <div class="nr-main">
        <div class="nr-matrix-wrap">
            <div class="nr-label"><span>CODE MATRIX</span><span class="nr-timer" aria-label="Seconds until the trace completes">TRACE <b data-nr-timer>${playing() ? Math.max(0, (game.deadline - Date.now()) / 1000).toFixed(1) : '0.0'}</b></span></div>
            <div class="nr-matrix nr-axis-${axis}" style="--nr-line:${line}">
                ${board.grid.map((_, i) => cell(board, path, i, allowed)).join('')}
            </div>
            ${overlay}
        </div>
        <aside class="nr-side">
            <div class="nr-label"><span>BUFFER</span><span>${path.length}/${BUFFER}</span></div>
            <div class="nr-buffer">${buffer}</div>
            <div class="nr-label"><span>DAEMONS</span><span>${live ? 'paid by the contract' : 'practice'}</span></div>
            <ol class="nr-daemons">${daemons}</ol>
            <p class="nr-implant">Upload all three: <b>${esc(IMPLANTS[board.implant])}</b> Implant NFT</p>
            ${playing() ? `
            <div class="nr-actions">
                <button type="button" class="nr-btn" data-act="undo" ${path.length ? '' : 'disabled'}>Undo</button>
                <button type="button" class="nr-btn nr-primary" data-act="${live ? 'breach' : 'finish'}" ${path.length ? '' : 'disabled'}>${live ? 'Upload to chain' : 'Upload'}</button>
            </div>
            ${live ? '<button type="button" class="nr-link" data-act="abandon">Abandon run</button>' : ''}` : ''}
        </aside>
    </div>`;
}

function renderLiveScreen() {
    const L = state.live;
    if (!chain.isConfigured()) {
        return panel('LIVE RUNS COMING ONLINE', `
            <p>Live runs pay out on RougeChain: <b>SCRAP</b> for every daemon you upload and an <b>Implant NFT</b> for a full breach, with every move checked by the NETRUN contract.</p>
            <p>The contract is not deployed yet. Train in practice mode meanwhile.</p>
            <button type="button" class="nr-btn nr-primary" data-act="to-practice">Practice</button>`);
    }
    if (L.phase === 'no-wallet' || (!state.player && !chain.wallet())) {
        const phone = isPhone();
        const qwalla = phone
            ? `<a class="nr-btn nr-primary" href="${chain.qwallaLink()}">Open in Qwalla</a><a class="nr-btn" href="${QWALLA_URL}" target="_blank" rel="noopener noreferrer">Get Qwalla</a>`
            : `<a class="nr-btn" href="${QWALLA_URL}" target="_blank" rel="noopener noreferrer">Qwalla app</a>`;
        const extension = `<a class="nr-btn${phone ? '' : ' nr-primary'}" href="${EXTENSION_URL}" target="_blank" rel="noopener noreferrer">RougeChain Wallet extension</a>`;
        return panel('WALLET REQUIRED', `
            <p>Live runs are signed with post-quantum keys. Play in the <b>Qwalla</b> app's browser, or on desktop with the <b>RougeChain Wallet</b> extension.</p>
            <div class="nr-row">${phone ? qwalla + extension : extension + qwalla}</div>
            <div class="nr-row"><button type="button" class="nr-btn" data-act="connect">I have one, connect</button></div>`);
    }
    if (!state.player) {
        return panel('JACK IN', `
            <p>Connect ${chain.walletName()} to run live boards.</p>
            <button type="button" class="nr-btn nr-primary" data-act="connect">Connect ${chain.walletKind() === 'qwalla' ? 'Qwalla' : 'wallet'}</button>`);
    }
    if (chain.wrongNetwork() && !['board', 'submitting', 'result'].includes(L.phase)) {
        const want = NETRUN.networkId;
        return panel('WRONG NETWORK', `
            <p>${chain.walletName()} is on <b>${esc(chain.connectedNetwork())}</b>, but NETRUN runs on <b>${esc(want)}</b>.</p>
            <p>Switch the network in ${chain.walletName()}${want === 'testnet' ? ' (the testnet faucet gives free XRGE)' : ''}, then reconnect.</p>
            <button type="button" class="nr-btn nr-primary" data-act="connect">Reconnect</button>`);
    }
    if (L.phase === 'paying' || L.phase === 'submitting') {
        return panel(L.title || (L.phase === 'paying' ? 'OPENING RUN' : 'UPLOADING'), `<p class="nr-wait"><span class="nr-spin"></span><span>${esc(L.note || '')}</span></p>${L.txId ? `<a class="nr-link" href="${chain.explorerTx(L.txId)}" target="_blank" rel="noopener noreferrer">Transaction ${esc(L.txId.slice(0, 12))}…</a>` : ''}`);
    }
    if (L.phase === 'sealing') {
        return panel('SEALING THE ICE', `
            <p class="nr-wait"><span class="nr-spin"></span><span>Run opened at block <b>${L.height}</b>. Your board is cut from the hash of block <b>${L.height + 1}</b>, which does not exist yet, so nobody (not even us) can know it in advance.</span></p>
            ${L.note ? `<p class="nr-note">${esc(L.note)}</p>` : ''}
            ${L.canNudge ? `<p>RougeChain makes blocks when there is traffic. Quiet right now?</p><button type="button" class="nr-btn" data-act="nudge">Seal a block (tiny gas fee)</button>` : ''}`);
    }
    if (L.phase === 'expired') {
        return panel('RUN EXPIRED', `
            <p>Your run from block ${L.height} expired unplayed. Open a new one.</p>
            ${jackInButton()}`);
    }
    if (L.phase === 'error') {
        return panel('LINK DOWN', `<p>${esc(L.note)}</p><button type="button" class="nr-btn" data-act="retry">Retry</button>`);
    }
    // idle
    const info = state.info;
    if (info && info.setup === false) {
        return panel('AWAITING THE OWNER', `
            <p>This NETRUN contract is deployed but not switched on yet. Its owner runs setup once, which also creates the Implant NFT collection. The contract only accepts setup from the owner's wallet.</p>
            ${L.note ? `<p class="nr-note">${esc(L.note)}</p>` : ''}
            <button type="button" class="nr-btn nr-primary" data-act="setup">I'm the owner: run setup</button>`);
    }
    return panel('JACK IN', `
        <p>Pay <b>${NETRUN.entryXrge} XRGE</b> to open a run. The board comes from the next block's hash, you get <b>${NETRUN.traceSeconds}s</b> on the clock, and the contract re-checks every move before it pays.</p>
        <ul class="nr-pays">
            ${DAEMON_NAMES.map((n, d) => `<li><span>${n}</span><b>+${DAEMON_REWARD[d]} SCRAP</b></li>`).join('')}
            <li><span>All three</span><b>+ Implant NFT</b></li>
        </ul>
        ${L.note ? `<p class="nr-note">${esc(L.note)}</p>` : ''}
        ${jackInButton()}
        ${info ? `<p class="nr-fine">${info.runs} runs · ${info.full_breaches} full breaches · <a href="${chain.explorerContract()}" target="_blank" rel="noopener noreferrer">contract</a></p>` : ''}
        <p class="nr-fine">Skill game: rewards depend only on the moves you make. Not every board can be fully breached. Network fees are extra (up to ${((NETRUN.gas.jackIn + NETRUN.gas.breach) / 1e6).toFixed(2)} XRGE per run).</p>`);
}

const jackInButton = () => `<button type="button" class="nr-btn nr-primary nr-big" data-act="jack-in">Jack in · ${NETRUN.entryXrge} XRGE</button>`;

const panel = (title, body) => `<div class="nr-panel"><h3>${title}</h3>${body}</div>`;

function render() {
    if (!root) return;
    const live = state.mode === 'live';
    const inv = state.inventory;
    const walletChip = state.player
        ? `<span class="nr-chip" title="${esc(chain.walletName())}: ${esc(state.player)}"><i></i>${short(state.player)}${inv ? `${inv.scrap !== null ? ` · <b>${inv.scrap}</b> SCRAP` : ''}${inv.implants ? ` · ${inv.implants.length} Implant${inv.implants.length === 1 ? '' : 's'}` : ''}` : ''}</span>`
        : (live || state.mode === 'top') && chain.isConfigured() ? '<button type="button" class="nr-chip nr-chip-btn" data-act="connect">Connect wallet</button>' : '';

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
        <div class="nr-tabs" role="tablist" aria-label="Mode">
            <button type="button" role="tab" aria-selected="${state.mode === 'practice'}" data-act="to-practice">Practice</button>
            <button type="button" role="tab" aria-selected="${live}" data-act="to-live">Live run <small>${esc(NETRUN.network.replace('RougeChain ', ''))}</small></button>
            <button type="button" role="tab" aria-selected="${state.mode === 'top'}" data-act="to-top">Leaderboard</button>
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
