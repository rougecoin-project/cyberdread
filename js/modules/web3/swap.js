/**
 * Swap module - Handles token swap calculations and redirects
 */
import { TOKEN_ADDRESSES } from './wallet.js';

/**
 * Ensure the price of RougeCoin (XRGE) is fetched and used correctly
 */
export async function fetchRougePrice() {
    try {
        const rougePriceText = document.getElementById('rougePrice').textContent;
        if (rougePriceText && rougePriceText !== 'Loading...') {
            return parseFloat(rougePriceText.replace('$', ''));
        } else {
            // Fetch the price from an external API as a fallback
            const response = await fetch('https://api.dexscreener.com/latest/dex/tokens/0xA1c7D450130bb77c6a23DdFAeCbC4a060215384b');
            const data = await response.json();
            if (data.pairs && data.pairs.length > 0) {
                const price = parseFloat(data.pairs[0].priceUsd);
                document.getElementById('rougePrice').textContent = `$${price.toFixed(8)}`;
                return price;
            }
        }
    } catch (error) {
        console.error('Error fetching RougeCoin price:', error);
    }
    // Fallback price if fetching fails
    return 0.0000015;
}

/**
 * Calculates estimated swap amounts based on input
 */
export async function calculateSwapEstimate() {
    const fromAmount = document.getElementById('fromAmount').value;
    const fromToken = document.getElementById('fromToken').value;
    const toAmountField = document.getElementById('toAmount');
    const swapRateField = document.getElementById('swapRate');

    if (fromAmount && fromAmount > 0) {
        // Fetch the current price of RougeCoin
        const rougePrice = await fetchRougePrice();

        let conversionRate = 0;

        // Set different conversion rates based on the selected token
        switch (fromToken) {
            case 'ETH':
                // Assuming ETH is around $3000 (adjust as needed)
                conversionRate = 3000 / rougePrice;
                break;
            default:
                conversionRate = 1 / rougePrice;
        }

        // Calculate the estimated ROUGE amount
        const estimatedRouge = parseFloat(fromAmount) * conversionRate;

        // Apply a 0.5% slippage to make the estimate more realistic
        const slippageAdjusted = estimatedRouge * 0.995;

        // Update the UI
        toAmountField.value = slippageAdjusted.toLocaleString(undefined, {
            maximumFractionDigits: 0,
        });

        // Update the rate display (how much 1 unit of fromToken is worth in ROUGE)
        swapRateField.textContent = `1 ${fromToken} ≈ ${conversionRate.toLocaleString(undefined, {
            maximumFractionDigits: 0,
        })} ROUGE`;

        // Update price impact
        const priceImpactElement = document.getElementById('priceImpact');
        if (priceImpactElement) priceImpactElement.textContent = '~0.5%';

        // Update network fee (gas estimate)
        const networkFeeElement = document.getElementById('networkFee');
        if (networkFeeElement) networkFeeElement.textContent = fromToken === 'ETH' ? '~0.002 ETH' : '~$5-10';
    } else {
        toAmountField.value = '';
        swapRateField.textContent = '-';
        const priceImpactElement = document.getElementById('priceImpact');
        if (priceImpactElement) priceImpactElement.textContent = '-';
        const networkFeeElement = document.getElementById('networkFee');
        if (networkFeeElement) networkFeeElement.textContent = '-';
    }
}

/**
 * Redirects to Uniswap with appropriate parameters for the swap
 */
export function redirectToUniswap() {
    const fromAmount = document.getElementById('fromAmount').value;
    const fromToken = document.getElementById('fromToken').value;

    if (!fromAmount || fromAmount <= 0) {
        alert('Please enter an amount to swap');
        return;
    }

    // Determine the token address based on the selected token
    let inputTokenAddress = '';
    switch (fromToken) {
        case 'ETH':
            inputTokenAddress = 'ETH'; // Uniswap uses 'ETH' for Ethereum
            break;
        case 'USDT':
            inputTokenAddress = TOKEN_ADDRESSES.USDT;
            break;
        case 'USDC':
            inputTokenAddress = TOKEN_ADDRESSES.USDC;
            break;
    }

    // RougeCoin contract address
    const rougeAddress = TOKEN_ADDRESSES.ROUGE;

    // Construct the Uniswap URL with the from token, to token, and amount
    let uniswapUrl = `https://app.uniswap.org/#/swap?exactField=input&exactAmount=${fromAmount}`;

    // Add the input token if it's not ETH
    if (fromToken === 'ETH') {
        uniswapUrl += `&inputCurrency=ETH`;
    } else {
        uniswapUrl += `&inputCurrency=${inputTokenAddress}`;
    }

    // Add the output token (RougeCoin)
    uniswapUrl += `&outputCurrency=${rougeAddress}`;

    // Open Uniswap in a new tab
    window.open(uniswapUrl, '_blank');
}

/**
 * Initialize swap event listeners
 */
export function initSwapEventListeners() {
    // Add event listeners for the swap functionality once the window is loaded
    window.addEventListener('DOMContentLoaded', () => {
        // Add event listeners to the swap interface fields
        const fromAmountField = document.getElementById('fromAmount');
        const fromTokenField = document.getElementById('fromToken');

        if (fromAmountField && fromTokenField) {
            fromAmountField.addEventListener('input', calculateSwapEstimate);
            fromTokenField.addEventListener('change', calculateSwapEstimate);
        }
    });

    // Make calculateSwapEstimate globally accessible for other modules that need it
    window.calculateSwapEstimate = calculateSwapEstimate;
}
