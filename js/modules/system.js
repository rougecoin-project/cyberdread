/**
 * System module - Handles system startup, shutdown, and power functions
 */
import { playSound, SOUNDS } from './sound.js';
import { showTooltips } from './ui/tooltips.js';

/**
 * Starts the system with animated text and sound effects
 */
export function startSystem() {
    playSound(SOUNDS.STARTUP);
    const lines = [
        'Initializing neural interface...',
        'Connecting to cyberspace...',
        'Loading ICE protocols...',
        'Bypassing security...',
        'Accessing {Dread_OS}...'
    ];
    
    const bios = document.querySelector('.bios-text');
    let delay = 0;
    
    lines.forEach((line, i) => {
        setTimeout(() => {
            bios.innerHTML += line + '<br>';
            if (i === lines.length - 1) {
                setTimeout(() => {
                    document.getElementById('powerUpScreen').style.display = 'none';
                    showTooltips(); // Show tooltips after system starts
                }, 500);
            }
        }, delay);
        delay += 500;
    });
}

/**
 * Shows the shutdown confirmation modal
 */
export function showShutdownModal() {
    document.getElementById('shutdownModal').style.display = 'block';
    document.getElementById('startMenu').style.display = 'none';
}

/**
 * Closes the shutdown confirmation modal
 */
export function closeShutdownModal() {
    document.getElementById('shutdownModal').style.display = 'none';
}

/**
 * Initiates the shutdown sequence with animation and redirection
 */
export function initiateShutdown() {
    playSound(SOUNDS.SHUTDOWN);
    document.getElementById('shutdownModal').style.display = 'none';
    const shutdownScreen = document.getElementById('shutdownScreen');
    shutdownScreen.style.display = 'flex';
    
    // Create matrix rain
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    shutdownScreen.appendChild(canvas);
    
    // Redirect after short delay
    setTimeout(() => {
        window.location.href = 'https://cyberpunk.fandom.com/wiki/Netrunner';
    }, 2000);
}
