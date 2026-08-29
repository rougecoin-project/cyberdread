/**
 * Tooltips module - the first-run interface tour.
 */

const SEEN_KEY = 'dreados:tour-seen';

/**
 * Creates and displays a tooltip with the specified text near a target element
 * @param {string} text - The text to display in the tooltip
 * @param {Element} targetElement - The element to position the tooltip near
 */
export function createTooltip(text, targetElement) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    // Clicking anywhere dismisses the tour rather than waiting it out.
    tooltip.addEventListener('click', () => tooltip.remove());
    document.body.appendChild(tooltip);

    const rect = targetElement.getBoundingClientRect();
    let left = rect.left + window.scrollX + rect.width / 2 - tooltip.offsetWidth / 2;
    let top = rect.top + window.scrollY - tooltip.offsetHeight - 10;

    // Adjust if tooltip goes off-screen
    if (left < 0) {
        left = 10;
    } else if (left + tooltip.offsetWidth > window.innerWidth) {
        left = window.innerWidth - tooltip.offsetWidth - 10;
    }

    if (top < 0) {
        top = rect.bottom + window.scrollY + 10;
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;

    setTimeout(() => {
        tooltip.classList.add('visible');
    }, 100);

    setTimeout(() => {
        tooltip.classList.remove('visible');
        setTimeout(() => {
            tooltip.remove();
        }, 300);
    }, 5000);
}

/**
 * Finds an element by its text content
 * @param {string} selector - CSS selector to match elements
 * @param {string} text - Text content to match
 * @returns {Element|null} - The matching element or null if not found
 */
function findElementByText(selector, text) {
    const elements = document.querySelectorAll(selector);
    for (let element of elements) {
        if (element.textContent.trim() === text) {
            return element;
        }
    }
    return null;
}

/**
 * Shows a sequence of tooltips introducing the interface
 */
export function showTooltips() {
    // The tour ran on every single visit, and on a phone the bubbles sat on
    // top of the windows they were describing. Show it once, on a screen
    // with room for it.
    if (window.matchMedia('(max-width: 720px)').matches) return;
    try {
        if (localStorage.getItem(SEEN_KEY) === '1') return;
        localStorage.setItem(SEEN_KEY, '1');
    } catch { /* private mode: show the tour, it just won't be remembered */ }

    const tooltips = [
        { text: 'Welcome, netrunner! Click "Start" to access the main menu.', target: '.start-menu' },
        { text: 'Open the "Files" to explore your data.', target: '.icon-label', matchText: 'Files' },
        { text: 'Check out the "Music" player for some tunes.', target: '.icon-label', matchText: 'Music' },
        { text: 'Open "term.exe" and type help -- the whole site is reachable from the shell.', target: '.icon-label', matchText: 'term.exe' },
        { text: 'Use "access.exe" to connect with other chooms.', target: '.icon-label', matchText: 'access.exe' }
    ];

    tooltips.forEach((tooltip, index) => {
        setTimeout(() => {
            let targetElement;
            if (tooltip.matchText) {
                targetElement = findElementByText(tooltip.target, tooltip.matchText);
            } else {
                targetElement = document.querySelector(tooltip.target);
            }
            if (targetElement) {
                createTooltip(tooltip.text, targetElement);
            }
        }, index * 5000);
    });
}
