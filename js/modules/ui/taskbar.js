/**
 * Taskbar module - clock, open-window buttons and a live XRGE ticker.
 */
import { fetchXrgeMarket, MarketStatus, formatUsd, formatChange } from '../web3/market.js';

const TICKER_REFRESH_MS = 60_000;

// Windows that can appear as taskbar buttons, with their display names.
const WINDOW_TITLES = {
    explorer: 'Files',
    musicPlayer: 'Music',
    rougeCoinInterface: 'RougeCoin',
    terminal: 'term.exe',
    settingsPanel: 'Settings'
};

const openWindows = new Set();

/** Updates the taskbar clock with time and date. */
function updateClock() {
    const clock = document.getElementById('clock');
    if (!clock) return;

    const now = new Date();
    clock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    clock.title = now.toLocaleDateString([], {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const date = document.getElementById('taskbarDate');
    if (date) {
        date.textContent = now.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
}

/** Repaints the row of buttons for currently open windows. */
function renderWindowButtons() {
    const container = document.getElementById('taskbarWindows');
    if (!container) return;

    container.textContent = '';

    openWindows.forEach(id => {
        const element = document.getElementById(id);
        if (!element) return;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'taskbar-window';
        button.textContent = WINDOW_TITLES[id] || id;
        button.classList.toggle('minimized', element.classList.contains('minimized'));
        button.addEventListener('click', () => toggleMinimize(id));
        container.appendChild(button);
    });
}

/**
 * Minimizes or restores a window from its taskbar button.
 * @param {string} id
 */
function toggleMinimize(id) {
    const element = document.getElementById(id);
    if (!element) return;

    element.classList.toggle('minimized');
    if (!element.classList.contains('minimized')) {
        document.dispatchEvent(new CustomEvent('window:focus', { detail: { id } }));
    }
    renderWindowButtons();
}

/** Fetches the token price for the taskbar ticker. */
async function updateTicker() {
    const ticker = document.getElementById('taskbarTicker');
    if (!ticker) return;

    const { status, data: market } = await fetchXrgeMarket();
    ticker.textContent = '';

    if (status !== MarketStatus.OK) {
        ticker.textContent = 'XRGE --';
        ticker.className = 'taskbar-ticker';
        ticker.title = status === MarketStatus.NO_PAIR
            ? 'No indexed liquidity pool for XRGE yet.'
            : 'Market data source unreachable.';
        return;
    }

    const symbol = document.createElement('span');
    symbol.textContent = 'XRGE ';

    const price = document.createElement('span');
    price.textContent = formatUsd(market.priceUsd);

    const change = document.createElement('span');
    change.className = market.change24h >= 0 ? 'ticker-up' : 'ticker-down';
    change.textContent = ` ${formatChange(market.change24h)}`;

    ticker.append(symbol, price, change);
    ticker.title = 'RougeCoin, live from DEXScreener. Click to open the panel.';
}

/** Wires the taskbar up to window open/close events. */
export function initTaskbar() {
    updateClock();
    setInterval(updateClock, 1000);

    updateTicker();
    setInterval(updateTicker, TICKER_REFRESH_MS);

    document.addEventListener('window:opened', event => {
        openWindows.add(event.detail.id);
        document.getElementById(event.detail.id)?.classList.remove('minimized');
        renderWindowButtons();
    });

    document.addEventListener('window:closed', event => {
        openWindows.delete(event.detail.id);
        renderWindowButtons();
    });

    document.getElementById('taskbarTicker')?.addEventListener('click', () => {
        window.openRougeCoin?.();
    });
}
