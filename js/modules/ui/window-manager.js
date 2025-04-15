// js/modules/ui/window-manager.js

export function initWindowManager() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Set initial window positions
    document.querySelectorAll('.explorer, .music-player, #rougeCoinInterface').forEach(window => {
        // Add window class for consistent styling
        window.classList.add('app-window');
        
        if (!isMobile) {
            window.style.transform = 'translate(-50%, -50%)';
            window.style.left = '50%';
            window.style.top = '50%';
        } else {
            // Mobile-friendly positioning
            window.style.width = '90%';
            window.style.left = '5%';
            window.style.height = '80vh';
            window.style.top = '10vh';
        }
    });

    // Handle touch events for mobile
    if (isMobile) {
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
        setupMobileResizing();
    }
    
    // Stack management for windows
    setupWindowFocus();
    
    // Handle resize events
    window.addEventListener('resize', handleWindowResize);
}

function setupWindowFocus() {
    // Bring window to front when clicked
    document.addEventListener('mousedown', bringWindowToFront);
    document.addEventListener('touchstart', bringWindowToFront);
}

function bringWindowToFront(e) {
    const window = e.target.closest('.app-window');
    if (!window) return;
    
    // Reset z-index for all windows
    document.querySelectorAll('.app-window').forEach(w => {
        w.style.zIndex = '100';
    });
    
    // Set higher z-index for the clicked window
    window.style.zIndex = '101';
}

function handleTouchMove(e) {
    const touchElement = e.target.closest('.window-header, .explorer-header, .player-header');
    if (touchElement) {
        e.preventDefault();
        const touch = e.touches[0];
        const window = e.target.closest('.app-window');
        if (window) {
            const bounds = document.body.getBoundingClientRect();
            const x = Math.max(0, Math.min(touch.clientX - window.offsetWidth / 2, bounds.width - window.offsetWidth));
            const y = Math.max(0, Math.min(touch.clientY - 20, bounds.height - window.offsetHeight));
            window.style.left = `${x}px`;
            window.style.top = `${y}px`;
        }
    }
}

function handleTouchEnd() {
    // Any cleanup needed after touch ends
}

function setupMobileResizing() {
    // Add touch events for the resize handle
    document.querySelectorAll('.app-window').forEach(window => {
        const resizeHandle = document.createElement('div');
        resizeHandle.className = 'resize-handle';
        window.appendChild(resizeHandle);
        
        let startX, startY, startWidth, startHeight;
        
        resizeHandle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            startWidth = window.offsetWidth;
            startHeight = window.offsetHeight;
            
            document.addEventListener('touchmove', handleResizeMove);
            document.addEventListener('touchend', handleResizeEnd);
        });
        
        function handleResizeMove(e) {
            const dx = e.touches[0].clientX - startX;
            const dy = e.touches[0].clientY - startY;
            
            window.style.width = `${startWidth + dx}px`;
            window.style.height = `${startHeight + dy}px`;
        }
        
        function handleResizeEnd() {
            document.removeEventListener('touchmove', handleResizeMove);
            document.removeEventListener('touchend', handleResizeEnd);
        }
    });
}

function handleWindowResize() {
    // Ensure windows stay within viewport when browser resizes
    document.querySelectorAll('.app-window').forEach(window => {
        if (window.classList.contains('fullscreen')) return;
        
        const bounds = document.body.getBoundingClientRect();
        const windowRect = window.getBoundingClientRect();
        
        // Keep window within horizontal bounds
        if (windowRect.right > bounds.width) {
            window.style.left = `${bounds.width - windowRect.width}px`;
        }
        if (windowRect.left < 0) {
            window.style.left = '0px';
        }
        
        // Keep window within vertical bounds
        if (windowRect.bottom > bounds.height) {
            window.style.top = `${bounds.height - windowRect.height}px`;
        }
        if (windowRect.top < 0) {
            window.style.top = '0px';
        }
    });
}

export function toggleFullScreenWindow(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Check if on mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Save previous position and size for restoring later
    if (!element.dataset.prevStyles && !element.classList.contains('fullscreen')) {
        element.dataset.prevStyles = JSON.stringify({
            width: element.style.width,
            height: element.style.height,
            top: element.style.top,
            left: element.style.left,
            transform: element.style.transform,
            position: element.style.position
        });
    }

    if (element.classList.contains('fullscreen')) {
        // Exit fullscreen
        element.classList.remove('fullscreen');
        
        // Restore previous styles
        if (element.dataset.prevStyles) {
            const prevStyles = JSON.parse(element.dataset.prevStyles);
            Object.assign(element.style, prevStyles);
            delete element.dataset.prevStyles;
        }
    } else {
        // Enter fullscreen
        element.classList.add('fullscreen');
        element.style.position = 'fixed';
        element.style.width = '100%';
        element.style.height = '100%';
        element.style.top = '0';
        element.style.left = '0';
        element.style.transform = 'none';
        element.style.zIndex = '9999';
    }
}