/**
 * Main JavaScript file - Imports and initializes all modules
 */
import { playSound, SOUNDS } from './modules/sound.js';
import { startSystem, showShutdownModal, closeShutdownModal, initiateShutdown } from './modules/system.js';
import { initUIEventListeners, toggleStartMenu, dragElement } from './modules/ui/common.js';
import { openExplorer, closeExplorer, showContent, hideContent, initExplorerResize, initTouchResize } from './modules/ui/explorer.js';
import { toggleMusicPlayer, playTrack, togglePlay, nextTrack, previousTrack, initMusicPlayerEventListeners } from './modules/ui/music-player.js';
import { openRougeCoin, closeRougeCoin } from './modules/ui/rouge-coin.js';
import { connectWallet, performSwap, initWalletEventListeners } from './modules/web3/wallet.js';
import { calculateSwapEstimate, redirectToUniswap, initSwapEventListeners } from './modules/web3/swap.js';
import { loadChatMessages, sendMessage } from './modules/ui/chat.js';

// Make functions globally available for HTML event handlers
window.startSystem = startSystem;
window.openExplorer = openExplorer;
window.closeExplorer = closeExplorer;
window.showContent = showContent;
window.hideContent = hideContent;
window.toggleMusicPlayer = toggleMusicPlayer;
window.playTrack = playTrack;
window.togglePlay = togglePlay;
window.nextTrack = nextTrack;
window.previousTrack = previousTrack;
window.showShutdownModal = showShutdownModal;
window.closeShutdownModal = closeShutdownModal;
window.initiateShutdown = initiateShutdown;
window.toggleStartMenu = toggleStartMenu;
window.openRougeCoin = openRougeCoin;
window.closeRougeCoin = closeRougeCoin;
window.connectWallet = connectWallet;
window.performSwap = performSwap;
window.redirectToUniswap = redirectToUniswap;

// Make dragElement globally accessible
window.dragElement = dragElement;

// Initialize sound event listener for playing sounds from other modules
document.addEventListener('playSound', (event) => {
    if (event.detail && event.detail.id) {
        playSound(event.detail.id);
    }
});

// Update clock
function updateClock() {
    const clock = document.getElementById('clock');
    if (clock) {
        const now = new Date();
        clock.textContent = now.toLocaleTimeString();
    }
}

/**
 * Initialize all modules and set up event handlers
 */
function initializeApp() {
    console.log('Initializing DreadOS...');
    
    // Initialize common UI components
    initUIEventListeners();
    
    // Initialize explorer functionality
    initExplorerResize();
    initTouchResize();
    
    // Initialize music player
    initMusicPlayerEventListeners();
    
    // Initialize wallet functionality
    initWalletEventListeners();
    
    // Initialize swap functionality
    initSwapEventListeners();
    
    // Start clock updates
    setInterval(updateClock, 1000);
    updateClock();
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Make chat functions globally accessible
window.loadChatMessages = loadChatMessages;
window.sendMessage = sendMessage;

// Load chat messages when the DOM is ready
document.addEventListener('DOMContentLoaded', loadChatMessages);
