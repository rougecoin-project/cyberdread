/**
 * Swap module - estimates and Uniswap hand-off.
 */
import { TOKENS, CHAIN } from '../../data/site-config.js';
import { fetchXrgeMarket, fetchEthPrice, MarketStatus } from './market.js';

/**
 * USD value of one unit of the selected input token.
 * ETH is quoted live; the stablecoins are treated as $1, which is close
 * enough for an indicative estimate.
 * @param {string} symbol
 * @returns {Promise<number|null>}
 */
async function inputTokenUsd(symbol) {
    if (symbol === 'ETH') return fetchEthPrice();
    if (symbol === 'USDT' || symbol === 'USDC') return 1;
    return null;
}

/**
 * Recalculates the estimated XRGE output for the entered amount.
 *
 * Everything here is indicative only -- the real quote comes from Uniswap's
 * router when the swap is executed.
 */
export async function calculateSwapEstimate() {
    const amountField = document.getElementById('fromAmount');
    const tokenField = document.getElementById('fromToken');
    const toAmountField = document.getElementById('toAmount');
    const rateField = document.getElementById('swapRate');
    const impactField = document.getElementById('priceImpact');
    const feeField = document.getElementById('networkFee');

    if (!amountField || !tokenField || !toAmountField || !rateField) return;

    const amount = parseFloat(amountField.value);
    const symbol = tokenField.value;

    const clear = (message = '-') => {
        toAmountField.value = '';
        rateField.textContent = message;
        if (impactField) impactField.textContent = '-';
        if (feeField) feeField.textContent = '-';
    };

    if (!Number.isFinite(amount) || amount <= 0) {
        clear();
        return;
    }

    rateField.textContent = 'Fetching rate...';

    const [{ status, data: market }, inputUsd] = await Promise.all([
        fetchXrgeMarket(),
        inputTokenUsd(symbol)
    ]);

    // No invented numbers: if either leg is unpriced, say so.
    if (status !== MarketStatus.OK || !market?.priceUsd || !inputUsd) {
        clear(status === MarketStatus.NO_PAIR
            ? 'No liquidity pool indexed'
            : 'Rate unavailable');
        return;
    }

    const xrgePerUnit = inputUsd / market.priceUsd;
    const estimated = amount * xrgePerUnit;

    toAmountField.value = estimated.toLocaleString('en-US', { maximumFractionDigits: 0 });
    rateField.textContent = `1 ${symbol} ~ ${xrgePerUnit.toLocaleString('en-US', {
        maximumFractionDigits: 0
    })} XRGE`;

    if (impactField) {
        // Rough proxy: trade size against the pool's liquidity.
        const notional = amount * inputUsd;
        const impact = market.liquidityUsd > 0
            ? (notional / market.liquidityUsd) * 100
            : null;
        impactField.textContent = impact === null
            ? 'unknown'
            : `~${impact.toFixed(2)}%`;
        impactField.classList.toggle('impact-high', impact !== null && impact > 5);
    }

    if (feeField) feeField.textContent = 'quoted by Uniswap';
}

/**
 * Opens Uniswap pre-filled with the entered swap.
 *
 * Targets Base, where the XRGE pool lives. Uses the current (non-hash)
 * app.uniswap.org route; the old `/#/swap` format dates from Uniswap v2's
 * interface.
 */
export function redirectToUniswap() {
    const amountField = document.getElementById('fromAmount');
    const tokenField = document.getElementById('fromToken');

    const amount = parseFloat(amountField?.value);
    const symbol = tokenField?.value || 'ETH';

    const params = new URLSearchParams({
        chain: 'base',
        inputCurrency: symbol === 'ETH' ? 'ETH' : TOKENS[symbol].address,
        outputCurrency: TOKENS.XRGE.address
    });

    if (Number.isFinite(amount) && amount > 0) {
        params.set('exactField', 'input');
        params.set('exactAmount', String(amount));
    }

    window.open(`https://app.uniswap.org/swap?${params}`, '_blank', 'noopener,noreferrer');
}

/** Debounces estimate recalculation while typing. */
export function initSwapEventListeners() {
    const amountField = document.getElementById('fromAmount');
    const tokenField = document.getElementById('fromToken');
    if (!amountField || !tokenField) return;

    let timer;
    const schedule = () => {
        clearTimeout(timer);
        timer = setTimeout(calculateSwapEstimate, 300);
    };

    amountField.addEventListener('input', schedule);
    tokenField.addEventListener('change', calculateSwapEstimate);
}
