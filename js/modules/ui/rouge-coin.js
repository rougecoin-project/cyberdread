/**
 * RougeCoin module - token panel backed by live market data.
 */
import { playSound, SOUNDS } from '../sound.js';
import { TOKENS } from '../../data/site-config.js';
import {
    fetchXrgeMarket,
    MarketStatus,
    formatUsd,
    formatCompactUsd,
    formatChange
} from '../web3/market.js';

const FIELDS = ['rougePrice', 'rougeChange', 'rougeCap', 'rougeLiquidity', 'rougeVolume'];

const REFRESH_MS = 60_000;
let refreshTimer = null;

/** Opens the RougeCoin window and starts polling market data. */
export function openRougeCoin() {
    playSound(SOUNDS.OPEN);
    const panel = document.getElementById('rougeCoinInterface');
    if (!panel) return;

    panel.style.display = 'block';
    document.dispatchEvent(new CustomEvent('window:opened', { detail: { id: 'rougeCoinInterface' } }));

    loadMarketData();
    clearInterval(refreshTimer);
    refreshTimer = setInterval(loadMarketData, REFRESH_MS);
}

/** Closes the window and stops polling. */
export function closeRougeCoin() {
    playSound(SOUNDS.CLOSE);
    const panel = document.getElementById('rougeCoinInterface');
    if (panel) panel.style.display = 'none';
    document.dispatchEvent(new CustomEvent('window:closed', { detail: { id: 'rougeCoinInterface' } }));

    clearInterval(refreshTimer);
    refreshTimer = null;
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
            ? 'No indexed liquidity pool for this token yet. Verify the contract on a block explorer.'
            : 'Market data source unreachable. Retrying shortly.');
        return;
    }

    setField('rougePrice', formatUsd(market.priceUsd));
    setField('rougeChange', formatChange(market.change24h));
    setField('rougeCap', formatCompactUsd(market.marketCap));
    setField('rougeLiquidity', formatCompactUsd(market.liquidityUsd));
    setField('rougeVolume', formatCompactUsd(market.volume24h));
    setField('rougeUpdated', `${market.dex} - updated ${new Date(market.updatedAt).toLocaleTimeString()}`);

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
