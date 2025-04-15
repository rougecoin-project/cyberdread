/**
 * Web3 module - Handles Web3 wallet connection and swap functionality
 */
import { playSound, SOUNDS } from '../sound.js';
import { redirectToUniswap } from './swap.js';

// Web3 Integration Variables
let web3;
let userAccount;
let isWalletConnected = false;
let chainId;

// Token addresses
export const TOKEN_ADDRESSES = {
    ETH: 'ETH', // Native ETH
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    ROUGE: '0xA1c7D450130bb77c6a23DdFAeCbC4a060215384b'
};

// ABI for ERC20 tokens - minimal interface for checking balances and approving tokens
export const ERC20_ABI = [
    {
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {"name": "_spender", "type": "address"},
            {"name": "_value", "type": "uint256"}
        ],
        "name": "approve",
        "outputs": [{"name": "", "type": "bool"}],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{"name": "", "type": "uint8"}],
        "type": "function"
    }
];

/**
 * Ensure the wallet is connected to the Ethereum mainnet
 */
async function ensureEthereumNetwork() {
    try {
        // Ethereum mainnet chain ID is 1
        const ethereumMainnetChainId = '0x1';

        // Check the current chain ID
        const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });

        if (currentChainId !== ethereumMainnetChainId) {
            // Request to switch to Ethereum mainnet
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: ethereumMainnetChainId }],
            });
        }
    } catch (error) {
        if (error.code === 4902) {
            console.error('Ethereum mainnet is not added to the wallet.');
        } else {
            console.error('Error switching to Ethereum mainnet:', error);
        }
        throw error; // Re-throw the error to handle it in the calling function
    }
}

/**
 * Connect to Ethereum wallet (MetaMask or similar)
 * @returns {Promise<boolean>} Success status of wallet connection
 */
export async function connectWallet() {
    playSound(SOUNDS.CLICK);

    try {
        // Check if MetaMask is installed
        if (window.ethereum) {
            try {
                // Ensure the wallet is on the Ethereum mainnet
                await ensureEthereumNetwork();

                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                handleAccountsChanged(accounts);

                // Create Web3 instance
                web3 = new Web3(window.ethereum);

                // Get chain ID
                chainId = await web3.eth.getChainId();

                // Setup event listeners
                window.ethereum.on('accountsChanged', handleAccountsChanged);
                window.ethereum.on('chainChanged', handleChainChanged);

                // Update UI
                updateWalletUI();

                return true;
            } catch (error) {
                console.error('User denied account access or network switch:', error);
                showWalletError('Connection rejected or network switch failed. Please try again.');
                return false;
            }
        } else if (window.web3) {
            // Legacy web3 provider
            web3 = new Web3(window.web3.currentProvider);

            // Get accounts
            const accounts = await web3.eth.getAccounts();
            handleAccountsChanged(accounts);

            // Get chain ID
            chainId = await web3.eth.getChainId();

            // Update UI
            updateWalletUI();

            return true;
        } else {
            showWalletError('No Ethereum wallet detected. Please install MetaMask.');
            return false;
        }
    } catch (error) {
        console.error('Error connecting wallet:', error);
        showWalletError('Failed to connect wallet. Please try again.');
        return false;
    }
}

/**
 * Handle accounts changed in wallet
 * @param {string[]} accounts - Array of wallet addresses
 */
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // User logged out
        userAccount = null;
        isWalletConnected = false;
    } else {
        // User logged in or changed accounts
        userAccount = accounts[0];
        isWalletConnected = true;
    }

    // Update UI
    updateWalletUI();
}

/**
 * Handle chain changed in wallet
 */
function handleChainChanged() {
    // Reload the page when the chain changes
    window.location.reload();
}

/**
 * Update wallet UI elements after connection changes
 */
function updateWalletUI() {
    const walletAddressElement = document.getElementById('walletAddress');
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const swapButton = document.getElementById('swapButton');
    const walletBalancesContainer = document.getElementById('walletBalances');

    if (!walletAddressElement || !connectWalletBtn || !swapButton) return;

    if (isWalletConnected && userAccount) {
        // Format account address for display
        const formattedAddress = `${userAccount.substring(0, 6)}...${userAccount.substring(userAccount.length - 4)}`;
        walletAddressElement.textContent = formattedAddress;
        walletAddressElement.classList.add('wallet-connected');

        // Update connect button
        connectWalletBtn.innerHTML = '<i class="fas fa-wallet"></i> Connected';

        // Update swap button
        swapButton.textContent = 'Swap';
        swapButton.disabled = false;

        // Show the balances container if it exists
        if (walletBalancesContainer) {
            walletBalancesContainer.style.display = 'flex';
        }

        // Get token balances
        getTokenBalance();
    } else {
        walletAddressElement.textContent = 'Wallet not connected';
        walletAddressElement.classList.remove('wallet-connected');

        // Update connect button
        connectWalletBtn.innerHTML = '<i class="fas fa-wallet"></i> Connect Wallet';

        // Update swap button
        swapButton.textContent = 'Connect Wallet to Swap';
        swapButton.disabled = true;

        // Hide the balances container if it exists
        if (walletBalancesContainer) {
            walletBalancesContainer.style.display = 'none';
        }
    }
}

/**
 * Get ETH and XRGE (RougeCoin) balances for the connected wallet
 */
export async function getTokenBalance() {
    if (!isWalletConnected || !web3) return;

    const balancesContainer = document.getElementById('walletBalances');
    if (balancesContainer) {
        balancesContainer.innerHTML = '<div class="loading-balance">Loading balances...</div>';
    }

    // Get only ETH and XRGE balances
    const balances = {};

    try {
        // Get ETH balance (native token should always work)
        const ethBalance = await web3.eth.getBalance(userAccount);
        balances.ETH = Number(web3.utils.fromWei(ethBalance, 'ether')).toFixed(4);
    } catch (error) {
        console.error("Error fetching ETH balance:", error);
        balances.ETH = "Error";
    }

    try {
        // Get XRGE balance using the provided ABI
        const rougeAddress = TOKEN_ADDRESSES.ROUGE;
        const rougeABI = [
            { "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" },
            { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "tokens", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" },
            { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" },
            { "constant": true, "inputs": [{ "name": "tokenOwner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" },
            { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }
        ];

        try {
            console.log("Using XRGE contract address:", rougeAddress);
            console.log("Using ABI:", rougeABI);

            const rougeContract = new web3.eth.Contract(rougeABI, rougeAddress);
            const rougeBalance = await rougeContract.methods.balanceOf(userAccount).call();
            const decimals = await rougeContract.methods.decimals().call();

            // XRGE typically has 18 decimals
            balances.XRGE = (rougeBalance / Math.pow(10, decimals)).toLocaleString(undefined, {
                maximumFractionDigits: 0
            });
        } catch (error) {
            console.error("Error fetching XRGE balance:", error);
            balances.XRGE = "Error";
        }
    } catch (error) {
        console.error("Error fetching XRGE balance:", error);
        balances.XRGE = "Error";
    }

    // Update UI with balances
    updateBalanceDisplay(balances);

    return balances;
}

/**
 * Update the UI with token balances
 * @param {Object} balances - Object containing token balances
 */
function updateBalanceDisplay(balances) {
    const balancesContainer = document.getElementById('walletBalances');
    if (!balancesContainer) return;

    // Clear previous balances
    balancesContainer.innerHTML = '';

    // Create balance items for each token
    Object.entries(balances).forEach(([token, amount]) => {
        const balanceItem = document.createElement('div');
        balanceItem.className = 'balance-item';

        // Format the amount with commas for thousands
        let formattedAmount = amount;
        if (token === 'ROUGE') {
            formattedAmount = parseInt(amount).toLocaleString();
        }

        balanceItem.innerHTML = `
            <span class="balance-token">${token}:</span>
            <span class="balance-amount">${formattedAmount}</span>
        `;

        balancesContainer.appendChild(balanceItem);
    });
}

/**
 * Show wallet error with sound effect
 * @param {string} message - Error message to display
 */
function showWalletError(message) {
    playSound(SOUNDS.ERROR);
    alert(message);
}

/**
 * Perform token swap after connecting wallet
 */
export async function performSwap() {
    if (!isWalletConnected) {
        connectWallet();
        return;
    }

    playSound(SOUNDS.CLICK);

    const fromAmount = document.getElementById('fromAmount').value;
    const fromToken = document.getElementById('fromToken').value;

    if (!fromAmount || fromAmount <= 0) {
        alert('Please enter an amount to swap');
        return;
    }

    // In a full implementation, this would interact with Uniswap contracts
    // For now, we'll show a simulated transaction and then redirect

    // Update button to show loading state
    const swapButton = document.getElementById('swapButton');
    const buttonText = swapButton.textContent;
    swapButton.innerHTML = 'Preparing Swap <span class="loading-spinner"></span>';
    swapButton.disabled = true;

    try {
        // Simulate transaction preparation delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // For now, redirect to Uniswap with the parameters
        redirectToUniswap();
    } catch (error) {
        console.error("Error in swap:", error);
        swapButton.textContent = buttonText;
        swapButton.disabled = false;
        showWalletError("Swap failed. Please try again.");
    }
}

/**
 * Initialize wallet event listeners
 */
export function initWalletEventListeners() {
    window.addEventListener('DOMContentLoaded', () => {
        const fromTokenField = document.getElementById('fromToken');
        if (fromTokenField) {
            fromTokenField.addEventListener('change', () => {
                if (isWalletConnected) {
                    getTokenBalance();
                }
                if (window.calculateSwapEstimate) {
                    window.calculateSwapEstimate();
                }
            });
        }
    });
}
