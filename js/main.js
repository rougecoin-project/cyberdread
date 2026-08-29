/**
 * Main entry point - imports and initializes all modules.
 */
import { playSound, SOUNDS } from './modules/sound.js';
import {
    startSystem, showShutdownModal, closeShutdownModal, initiateShutdown, initBootScreen
} from './modules/system.js';
import { initUIEventListeners, toggleStartMenu } from './modules/ui/common.js';
import {
    openExplorer, closeExplorer, showContent, hideContent,
    initExplorerResize, renderExplorerContent, openImageViewer, closeImageViewer
} from './modules/ui/explorer.js';
import {
    toggleMusicPlayer, playTrack, togglePlay, nextTrack, previousTrack,
    initMusicPlayerEventListeners
} from './modules/ui/music-player.js';
import { openRougeCoin, closeRougeCoin, copyContractAddress } from './modules/ui/rouge-coin.js';
import { connectWallet, performSwap, initWalletEventListeners } from './modules/web3/wallet.js';
import { calculateSwapEstimate, redirectToUniswap, initSwapEventListeners } from './modules/web3/swap.js';
import { loadChatMessages, sendMessage, initChat } from './modules/ui/chat.js';
import { initWindowManager, toggleFullScreenWindow } from './modules/ui/window-manager.js';
import { initTerminal, openTerminal, closeTerminal } from './modules/ui/terminal.js';
import { initSettings, openSettings, closeSettings } from './modules/ui/settings.js';
import { initTaskbar } from './modules/ui/taskbar.js';

/**
 * Opens the encrypted-access modal.
 *
 * This lived in an inline <script> in index.html and called playSound and
 * SOUNDS, neither of which is a global -- so every click threw a
 * ReferenceError. It belongs in a module where those imports exist.
 */
function showAccessModal() {
    const modal = document.getElementById('accessModal');
    if (modal) modal.style.display = 'block';
    playSound(SOUNDS.OPEN);
}

/**
 * @param {boolean} confirmed
 */
function handleAccess(confirmed) {
    if (confirmed) {
        window.open('https://t.me/rougecoinv3', '_blank', 'noopener,noreferrer');
    }
    const modal = document.getElementById('accessModal');
    if (modal) modal.style.display = 'none';
    playSound(confirmed ? SOUNDS.OPEN : SOUNDS.CLOSE);
}

// Expose the handlers still referenced by inline onclick attributes.
Object.assign(window, {
    startSystem,
    showShutdownModal,
    closeShutdownModal,
    initiateShutdown,
    toggleStartMenu,
    openExplorer,
    closeExplorer,
    showContent,
    hideContent,
    openImageViewer,
    closeImageViewer,
    toggleMusicPlayer,
    playTrack,
    togglePlay,
    nextTrack,
    previousTrack,
    openRougeCoin,
    closeRougeCoin,
    copyContractAddress,
    connectWallet,
    performSwap,
    calculateSwapEstimate,
    redirectToUniswap,
    loadChatMessages,
    sendMessage,
    toggleFullScreenWindow,
    openTerminal,
    closeTerminal,
    openSettings,
    closeSettings,
    showAccessModal,
    handleAccess
});

// Lets modules request a sound without importing the sound module.
document.addEventListener('playSound', event => {
    if (event.detail?.id) playSound(event.detail.id);
});

/** Boots the desktop. */
function initializeApp() {
    // Settings first: it sets the accent tokens before anything paints.
    initSettings();
    initBootScreen();

    initWindowManager();
    initUIEventListeners();
    initTaskbar();

    renderExplorerContent();
    initExplorerResize();
    initMusicPlayerEventListeners();
    initTerminal();
    initChat();

    initWalletEventListeners();
    initSwapEventListeners();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
