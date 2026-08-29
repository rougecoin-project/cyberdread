/**
 * Wallet module - EIP-1193 wallet connection with no external dependencies.
 *
 * This used to load web3.js 1.8.0 and WalletConnect v1 from a CDN. The
 * WalletConnect v1 bridge network was shut down in 2023 and the library was
 * never actually called, so both are gone; everything here talks to the
 * injected provider directly, which is ~400KB less to download.
 */
import { playSound, SOUNDS } from '../sound.js';
import { redirectToUniswap } from './swap.js';
import { TOKENS, CHAIN } from '../../data/site-config.js';

let provider = null;
let userAccount = null;

// Minimal ERC-20 call selectors (first 4 bytes of the keccak hash of the
// signature). Hardcoding them avoids pulling in an ABI encoder.
const SELECTOR = {
    balanceOf: '0x70a08231',
    decimals: '0x313ce567'
};

/** @returns {boolean} whether a wallet is currently connected */
export function isConnected() {
    return Boolean(userAccount);
}

/** @returns {string|null} the connected address, if any */
export function getAccount() {
    return userAccount;
}

/**
 * Pads an address to a 32-byte ABI word.
 * @param {string} address
 * @returns {string}
 */
function encodeAddress(address) {
    return address.toLowerCase().replace(/^0x/, '').padStart(64, '0');
}

/**
 * Performs a read-only contract call through the injected provider.
 * @param {string} to - contract address
 * @param {string} data - ABI-encoded calldata
 * @returns {Promise<string>} hex result
 */
function ethCall(to, data) {
    return provider.request({ method: 'eth_call', params: [{ to, data }, 'latest'] });
}

/**
 * Converts a base-unit BigInt amount to a human-readable decimal string.
 * @param {bigint} value
 * @param {number} decimals
 * @param {number} precision - digits to keep after the point
 * @returns {string}
 */
export function formatUnits(value, decimals, precision = 4) {
    const base = 10n ** BigInt(decimals);
    const whole = value / base;
    const fraction = value % base;
    const fractionDigits = fraction.toString().padStart(decimals, '0').slice(0, precision);
    const trimmed = fractionDigits.replace(/0+$/, '');
    const wholeText = whole.toLocaleString('en-US');
    return trimmed ? `${wholeText}.${trimmed}` : wholeText;
}

/**
 * Ensures the wallet is on Ethereum mainnet, prompting a switch if not.
 */
async function ensureMainnet() {
    const currentChainId = await provider.request({ method: 'eth_chainId' });
    if (currentChainId === CHAIN.hexId) return;

    await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CHAIN.hexId }]
    });
}

/**
 * Connects to the injected Ethereum wallet.
 * @returns {Promise<boolean>} success status
 */
export async function connectWallet() {
    playSound(SOUNDS.CLICK);

    if (!window.ethereum) {
        showWalletError('No Ethereum wallet detected. Install MetaMask, Rabby or another EIP-1193 wallet.');
        return false;
    }

    provider = window.ethereum;

    try {
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        await ensureMainnet();
        handleAccountsChanged(accounts);

        provider.removeListener?.('accountsChanged', handleAccountsChanged);
        provider.removeListener?.('chainChanged', handleChainChanged);
        provider.on?.('accountsChanged', handleAccountsChanged);
        provider.on?.('chainChanged', handleChainChanged);

        return true;
    } catch (error) {
        // 4001 is the standard "user rejected request" code.
        if (error?.code === 4001) {
            showWalletError('Connection rejected.');
        } else if (error?.code === 4902) {
            showWalletError(`${CHAIN.name} is not configured in your wallet.`);
        } else {
            console.error('Error connecting wallet:', error);
            showWalletError('Failed to connect wallet. Please try again.');
        }
        return false;
    }
}

/**
 * Reconnects silently if the wallet has already authorized this site,
 * so a returning visitor doesn't have to click Connect again.
 */
export async function restoreConnection() {
    if (!window.ethereum) return;
    provider = window.ethereum;
    try {
        const accounts = await provider.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            handleAccountsChanged(accounts);
            provider.on?.('accountsChanged', handleAccountsChanged);
            provider.on?.('chainChanged', handleChainChanged);
        }
    } catch (error) {
        console.error('Could not restore wallet connection:', error);
    }
}

/**
 * @param {string[]} accounts
 */
function handleAccountsChanged(accounts) {
    userAccount = accounts && accounts.length > 0 ? accounts[0] : null;
    updateWalletUI();
}

function handleChainChanged() {
    window.location.reload();
}

/** Repaints the wallet area of the swap panel. */
function updateWalletUI() {
    const addressElement = document.getElementById('walletAddress');
    const connectButton = document.getElementById('connectWalletBtn');
    const swapButton = document.getElementById('swapButton');
    const balances = document.getElementById('walletBalances');

    if (!addressElement || !connectButton || !swapButton) return;

    if (userAccount) {
        addressElement.textContent = `${userAccount.slice(0, 6)}...${userAccount.slice(-4)}`;
        addressElement.classList.add('wallet-connected');
        connectButton.textContent = 'Connected';
        swapButton.textContent = 'Swap on Uniswap';
        swapButton.disabled = false;
        if (balances) balances.style.display = 'flex';
        getTokenBalance();
    } else {
        addressElement.textContent = 'Wallet not connected';
        addressElement.classList.remove('wallet-connected');
        connectButton.textContent = 'Connect Wallet';
        swapButton.textContent = 'Connect Wallet to Swap';
        swapButton.disabled = true;
        if (balances) balances.style.display = 'none';
    }
}

/**
 * Reads the ETH and XRGE balances for the connected account.
 * @returns {Promise<Object|undefined>}
 */
export async function getTokenBalance() {
    if (!userAccount || !provider) return;

    const container = document.getElementById('walletBalances');
    if (container) container.textContent = 'Loading balances...';

    const balances = {};

    try {
        const wei = await provider.request({
            method: 'eth_getBalance',
            params: [userAccount, 'latest']
        });
        balances.ETH = formatUnits(BigInt(wei), 18, 4);
    } catch (error) {
        console.error('Error fetching ETH balance:', error);
        balances.ETH = 'unavailable';
    }

    try {
        const { address } = TOKENS.XRGE;
        const raw = await ethCall(address, SELECTOR.balanceOf + encodeAddress(userAccount));
        const decimalsHex = await ethCall(address, SELECTOR.decimals);
        const decimals = Number(BigInt(decimalsHex || '0x12'));
        balances.XRGE = formatUnits(BigInt(raw), decimals, 0);
    } catch (error) {
        console.error('Error fetching XRGE balance:', error);
        balances.XRGE = 'unavailable';
    }

    updateBalanceDisplay(balances);
    return balances;
}

/**
 * @param {Object<string,string>} balances
 */
function updateBalanceDisplay(balances) {
    const container = document.getElementById('walletBalances');
    if (!container) return;

    container.textContent = '';

    Object.entries(balances).forEach(([token, amount]) => {
        const item = document.createElement('div');
        item.className = 'balance-item';

        const label = document.createElement('span');
        label.className = 'balance-token';
        label.textContent = `${token}:`;

        const value = document.createElement('span');
        value.className = 'balance-amount';
        value.textContent = amount;

        item.append(label, value);
        container.appendChild(item);
    });
}

/**
 * @param {string} message
 */
function showWalletError(message) {
    playSound(SOUNDS.ERROR);
    const addressElement = document.getElementById('walletAddress');
    if (addressElement) {
        addressElement.textContent = message;
        addressElement.classList.add('wallet-error');
        setTimeout(() => addressElement.classList.remove('wallet-error'), 4000);
    } else {
        alert(message);
    }
}

/**
 * Hands the swap off to Uniswap with the entered amounts pre-filled.
 *
 * This site does not execute swaps itself: routing, slippage and approvals
 * are Uniswap's job, and pretending otherwise with a fake progress spinner
 * (what the old code did) is misleading.
 */
export async function performSwap() {
    if (!userAccount) {
        connectWallet();
        return;
    }

    playSound(SOUNDS.CLICK);
    redirectToUniswap();
}

/** Wires up inputs that should refresh balances/estimates. */
export function initWalletEventListeners() {
    const fromToken = document.getElementById('fromToken');
    if (fromToken) {
        fromToken.addEventListener('change', () => {
            if (userAccount) getTokenBalance();
        });
    }
    restoreConnection();
}

// Kept for backwards compatibility with modules that imported the old constant.
export const TOKEN_ADDRESSES = {
    ETH: TOKENS.ETH.address,
    USDT: TOKENS.USDT.address,
    USDC: TOKENS.USDC.address,
    ROUGE: TOKENS.XRGE.address
};
