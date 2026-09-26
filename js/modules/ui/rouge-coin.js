/**
 * RougeChain panel - the post-quantum L1 and its token, XRGE.
 *
 * Live network stats come from the RougeChain node API, market data from
 * DEXScreener/GeckoTerminal. The ecosystem and community lists render from
 * ROUGECHAIN in site-config.js, so one edit there updates the panel.
 */
import { playSound, SOUNDS } from '../sound.js';
import { TOKENS, CHAIN, XRGE_POOL, ROUGECHAIN } from '../../data/site-config.js';
import {
    fetchXrgeMarket,
    MarketStatus,
    formatUsd,
    formatCompactUsd,
    formatChange
} from '../web3/market.js';
import { fetchChainStatus, formatInt, formatXrge } from '../web3/rougechain.js';

const FIELDS = ['rougePrice', 'rougeChange', 'rougeCap', 'rougeLiquidity', 'rougeVolume'];
const CHAIN_FIELDS = ['chainHeight', 'chainFinalized', 'chainValidators', 'chainPeers', 'chainBurned'];

const REFRESH_MS = 60_000;
const CHAIN_REFRESH_MS = 15_000;
let refreshTimer = null;
let chainTimer = null;
let rendered = false;

/** Builds an external link element; textContent keeps config text inert. */
function link(url, className, children) {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = className;
    a.append(...children);
    return a;
}

function icon(id) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'ico');
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS(svgNS, 'use');
    use.setAttribute('href', `#${id}`);
    svg.append(use);
    return svg;
}

function text(tag, value, className) {
    const el = document.createElement(tag);
    el.textContent = value;
    if (className) el.className = className;
    return el;
}

/** Fills the parts of the panel that come from site-config, once. */
function renderStatic() {
    if (rendered) return;
    rendered = true;

    const set = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };
    set('chainSummary', ROUGECHAIN.summary);
    set('xrgeNative', ROUGECHAIN.xrge.native);
    set('xrgeBase', ROUGECHAIN.xrge.base);

    document.getElementById('chainCrypto')?.replaceChildren(
        ...ROUGECHAIN.crypto.map(item => text('li', item))
    );

    document.getElementById('chainEcosystem')?.replaceChildren(
        ...ROUGECHAIN.ecosystem.map(({ group, items }) => {
            const block = document.createElement('div');
            block.className = 'eco-group';
            const grid = document.createElement('div');
            grid.className = 'eco-grid';
            grid.append(...items.map(item => link(item.url, 'eco-item', [
                text('strong', item.name),
                text('span', item.desc)
            ])));
            block.append(text('h4', group), grid);
            return block;
        })
    );

    document.getElementById('chainCommunity')?.replaceChildren(
        ...ROUGECHAIN.community.map(item => link(item.url, 'rougecoin-link', [
            icon(item.icon),
            text('span', item.label)
        ]))
    );

    document.querySelectorAll('[data-buy-xrge]').forEach(a => { a.href = ROUGECHAIN.buyUrl; });
}

/** Loads live network stats from the RougeChain node. */
export async function loadChainStatus() {
    const status = await fetchChainStatus();
    const set = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    if (!status) {
        CHAIN_FIELDS.forEach(id => set(id, '--'));
        set('chainUpdated', 'The public node did not answer. That does not mean the chain is down; try the explorer.');
        return;
    }

    set('chainHeight', formatInt(status.height));
    set('chainFinalized', formatInt(status.finalized));
    set('chainValidators', status.validators === null ? '--' : formatInt(status.validators));
    set('chainPeers', formatInt(status.peers));
    set('chainBurned', formatXrge(status.feesBurned));
    set('chainUpdated', `${status.chainId} - updated ${new Date().toLocaleTimeString()}`);
}

/** Opens the RougeChain window and starts polling chain and market data. */
export function openRougeCoin() {
    playSound(SOUNDS.OPEN);
    const panel = document.getElementById('rougeCoinInterface');
    if (!panel) return;

    renderStatic();
    panel.style.display = 'block';
    document.dispatchEvent(new CustomEvent('window:opened', { detail: { id: 'rougeCoinInterface' } }));

    loadChainStatus();
    loadMarketData();
    clearInterval(refreshTimer);
    clearInterval(chainTimer);
    refreshTimer = setInterval(loadMarketData, REFRESH_MS);
    chainTimer = setInterval(loadChainStatus, CHAIN_REFRESH_MS);
}

/** Closes the window and stops polling. */
export function closeRougeCoin() {
    playSound(SOUNDS.CLOSE);
    const panel = document.getElementById('rougeCoinInterface');
    if (panel) panel.style.display = 'none';
    document.dispatchEvent(new CustomEvent('window:closed', { detail: { id: 'rougeCoinInterface' } }));

    clearInterval(refreshTimer);
    clearInterval(chainTimer);
    refreshTimer = null;
    chainTimer = null;
}

/**
 * @param {string} id
 * @param {string} text
 */
function setField(id, text) {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
}

/**
 * Loads live market data into the panel.
 *
 * If the API is unreachable the fields read "unavailable". The previous
 * implementation generated a random price and market cap here, which meant
 * an outage silently showed visitors invented numbers.
 */
export async function loadMarketData() {
    const changeElement = document.getElementById('rougeChange');
    FIELDS.forEach(id => setField(id, 'Loading...'));

    const { status, data: market } = await fetchXrgeMarket();

    if (status !== MarketStatus.OK) {
        FIELDS.forEach(id => setField(id, '--'));
        if (changeElement) changeElement.style.color = '';
        setField('rougeUpdated', status === MarketStatus.NO_PAIR
            ? `No price data for the ${XRGE_POOL.pair} pool on ${CHAIN.name} yet.`
            : 'Market data sources unreachable. Retrying shortly.');
        return;
    }

    setField('rougePrice', formatUsd(market.priceUsd));
    setField('rougeChange', formatChange(market.change24h));
    setField('rougeCap', formatCompactUsd(market.marketCap));
    setField('rougeLiquidity', formatCompactUsd(market.liquidityUsd));
    setField('rougeVolume', formatCompactUsd(market.volume24h));
    setField('rougeUpdated', [
        market.pairLabel || XRGE_POOL.pair,
        `on ${market.dex}`,
        `via ${market.source}`,
        `updated ${new Date(market.updatedAt).toLocaleTimeString()}`
    ].join(' - '));

    const link = document.getElementById('marketPairLink');
    if (link && market.pairUrl) {
        link.href = market.pairUrl;
        link.hidden = false;
    }

    if (changeElement) {
        changeElement.style.color = market.change24h >= 0
            ? 'var(--ok, #00ff88)'
            : 'var(--danger, #ff4466)';
    }
}

/** Copies the token contract address to the clipboard. */
export async function copyContractAddress() {
    const { address } = TOKENS.XRGE;
    const status = document.getElementById('contractCopyStatus');
    try {
        await navigator.clipboard.writeText(address);
        playSound(SOUNDS.CLICK);
        if (status) {
            status.textContent = 'copied';
            setTimeout(() => { status.textContent = ''; }, 2000);
        }
    } catch (error) {
        console.error('Clipboard write failed:', error);
        if (status) status.textContent = address;
    }
}
