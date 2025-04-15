/**
 * Explorer module - Handles file explorer window functionality
 */
import { playSound, SOUNDS } from '../sound.js';

/**
 * Opens the file explorer window
 */
export function openExplorer() {
    playSound(SOUNDS.OPEN);
    document.getElementById('explorer').style.display = 'block';
}

/**
 * Closes the file explorer window
 */
export function closeExplorer() {
    playSound(SOUNDS.CLOSE);
    document.getElementById('explorer').style.display = 'none';
}

/**
 * Shows specific content within the explorer
 * @param {string} id - The ID of the content to show
 */
export function showContent(id) {
    playSound(SOUNDS.CLICK);
    document.querySelector('.folder-container').style.display = 'none';
    const content = document.getElementById(id);
    content.classList.add('active');
    
    // Play loading sound when "About Me" section is displayed
    if (id === 'about-me') {
        playSound(SOUNDS.LOADING);
    }
}

/**
 * Hides specific content within the explorer
 * @param {string} id - The ID of the content to hide
 */
export function hideContent(id) {
    playSound(SOUNDS.CLICK);
    document.querySelector('.folder-container').style.display = 'flex';
    const content = document.getElementById(id);
    content.classList.remove('active');
}

/**
 * Initialize explorer resizing functionality
 */
export function initExplorerResize() {
    const explorer = document.getElementById('explorer');
    
    // Create a ResizeObserver to update content height when explorer is resized
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            if (entry.target.id === 'explorer') {
                const content = entry.target.querySelector('.explorer-content');
                if (content) {
                    content.style.height = `calc(${entry.target.style.height} - 40px)`;
                }
            }
        }
    });
    
    // Start observing the explorer window
    if (explorer) {
        resizeObserver.observe(explorer);
    }
}

/**
 * Initialize touch resize functionality for explorer windows
 */
export function initTouchResize() {
    const explorer = document.getElementById('explorer');
    if (!explorer) return;
    
    let startHeight, startWidth, startX, startY;
    
    function initResize(e) {
        e.preventDefault();
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        startHeight = explorer.offsetHeight;
        startWidth = explorer.offsetWidth;
        
        document.addEventListener('touchmove', resizeMove);
        document.addEventListener('touchend', stopResize);
    }
    
    function resizeMove(e) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        
        const newWidth = Math.max(300, startWidth + deltaX);
        const newHeight = Math.max(200, startHeight + deltaY);
        
        explorer.style.width = `${newWidth}px`;
        explorer.style.height = `${newHeight}px`;
    }
    
    function stopResize() {
        document.removeEventListener('touchmove', resizeMove);
        document.removeEventListener('touchend', stopResize);
    }
    
    // Add touch event listeners for the resize handle
    explorer.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        const rect = explorer.getBoundingClientRect();
        const isInResizeArea = (
            touch.clientX >= rect.right - 44 && 
            touch.clientY >= rect.bottom - 44
        );
        
        if (isInResizeArea) {
            initResize(e);
        }
    });
}
