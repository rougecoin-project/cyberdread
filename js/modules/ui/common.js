/**
 * UI Module - Handles common UI interactions like dragging windows
 */

/**
 * Allows dragging elements like windows around the screen
 * @param {Event} event - The mouse or touch event
 */
export function dragElement(event) {
    const target = event.target.closest('.explorer, .music-player');
    if (!target) return;

    let pos = { x: 0, y: 0 };
    let startPos = { x: 0, y: 0 };

    if (event.type === 'mousedown') {
        event.preventDefault();
        startPos.x = event.clientX;
        startPos.y = event.clientY;
        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', stopHandler);
    } else if (event.type === 'touchstart') {
        event.preventDefault();
        startPos.x = event.touches[0].clientX;
        startPos.y = event.touches[0].clientY;
        document.addEventListener('touchmove', moveHandler);
        document.addEventListener('touchend', stopHandler);
    }

    function moveHandler(e) {
        if (e.type === 'mousemove') {
            pos.x = startPos.x - e.clientX;
            pos.y = startPos.y - e.clientY;
            startPos.x = e.clientX;
            startPos.y = e.clientY;
        } else {
            pos.x = startPos.x - e.touches[0].clientX;
            pos.y = startPos.y - e.touches[0].clientY;
            startPos.x = e.touches[0].clientX;
            startPos.y = e.touches[0].clientY;
        }

        target.style.top = (target.offsetTop - pos.y) + "px";
        target.style.left = (target.offsetLeft - pos.x) + "px";
    }

    function stopHandler() {
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseup', stopHandler);
        document.removeEventListener('touchmove', moveHandler);
        document.removeEventListener('touchend', stopHandler);
    }
}

/**
 * Adds glitch effect animation to an element
 * @param {Element} element - The element to add the effect to
 */
export function addGlitchEffect(element) {
    element.style.animation = 'none';
    element.offsetHeight; // Trigger reflow
    element.style.animation = 'glitchEffect 0.3s ease';
}

/**
 * Creates random glitch effects throughout the interface
 */
export function randomGlitch() {
    const elements = document.querySelectorAll('.folder, .icon, .start-menu');
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    addGlitchEffect(randomElement);
    
    // Schedule next glitch
    setTimeout(randomGlitch, Math.random() * 10000 + 5000);
}

/**
 * Toggles the visibility of the start menu
 */
export function toggleStartMenu() {
    const startMenu = document.getElementById('startMenu');
    const startButton = document.querySelector('.start-menu');
    
    if (startMenu.style.display === 'block') {
        document.dispatchEvent(new CustomEvent('playSound', { detail: { id: 'closeSound' } }));
        startMenu.style.display = 'none';
        startButton.classList.remove('active');
    } else {
        document.dispatchEvent(new CustomEvent('playSound', { detail: { id: 'openSound' } }));
        startMenu.style.display = 'block';
        startButton.classList.add('active');
    }
}

/**
 * Initialize UI event listeners for common interactions
 */
export function initUIEventListeners() {
    // Add click event listeners for draggable elements
    document.addEventListener('DOMContentLoaded', function() {
        const draggableElements = document.querySelectorAll('.explorer-header, .player-header');
        draggableElements.forEach(el => {
            el.addEventListener('touchstart', dragElement);
            el.addEventListener('mousedown', dragElement);
        });
        
        // Glitch effects for folders
        document.querySelectorAll('.folder').forEach(folder => {
            folder.addEventListener('click', () => addGlitchEffect(folder));
        });
        
        // Start menu click outside handler
        document.addEventListener('click', function(event) {
            const startMenu = document.getElementById('startMenu');
            const startButton = document.querySelector('.start-menu');
            
            if (startMenu && startButton && !startButton.contains(event.target) && 
                !startMenu.contains(event.target)) {
                startMenu.style.display = 'none';
                startButton.classList.remove('active');
            }
        });
        
        // Start random glitch effects after delay
        setTimeout(randomGlitch, 3000);
    });
}
