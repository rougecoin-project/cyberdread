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
 * Connect to Ethereum wallet (MetaMask or similar)
 * @returns {Promise<boolean>} Success status of wallet connection
 */
export async function connectWallet() {
    playSound(SOUNDS.CLICK);
    
    try {
        // Check if MetaMask is installed
        if (window.ethereum) {
            try {
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
                console.error("User denied account access:", error);
                showWalletError("Connection rejected. Please try again.");
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
            showWalletError("No Ethereum wallet detected. Please install MetaMask.");
            return false;
        }
    } catch (error) {
        console.error("Error connecting wallet:", error);
        showWalletError("Failed to connect wallet. Please try again.");
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
    }
}

/**
 * Get token balance for the currently selected token
 */
export async function getTokenBalance() {
    if (!isWalletConnected || !web3) return;
    
    try {
        // Get selected token
        const selectedToken = document.getElementById('fromToken').value;
        
        // Get balance based on token type
        let balance;
        
        if (selectedToken === 'ETH') {
            // Get ETH balance
            balance = await web3.eth.getBalance(userAccount);
            balance = web3.utils.fromWei(balance, 'ether');
        } else {
            // Get ERC20 token balance
            const tokenAddress = TOKEN_ADDRESSES[selectedToken];
            const tokenContract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
            
            balance = await tokenContract.methods.balanceOf(userAccount).call();
            
            // Get decimals
            const decimals = await tokenContract.methods.decimals().call();
            
            // Convert based on decimals
            balance = balance / Math.pow(10, decimals);
        }
        
        // Display balance (optional)
        console.log(`${selectedToken} Balance: ${balance}`);
        
        // You could add a balance display in the UI here if desired
    } catch (error) {
        console.error("Error fetching balance:", error);
    }
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
