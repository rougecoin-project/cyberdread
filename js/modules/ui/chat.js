/**
 * Chat module - the "secret chat" board.
 *
 * All message rendering goes through textContent. The previous version
 * interpolated the visitor-supplied name and message straight into
 * innerHTML, which let anyone who posted a message run script in every
 * later visitor's browser.
 */

const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:8888/.netlify/functions'
    : '/.netlify/functions';

const NAME_KEY = 'dreados:chat-name';
let pollTimer = null;

/**
 * Builds one message row without ever parsing user input as HTML.
 * @param {{name: string, message: string, timestamp: string}} entry
 * @returns {HTMLElement}
 */
function renderMessage({ name, message, timestamp }) {
    const row = document.createElement('div');
    row.className = 'message';

    const author = document.createElement('strong');
    author.className = 'message-name';
    author.textContent = `${name}:`;

    const body = document.createElement('span');
    body.className = 'message-body';
    body.textContent = ` ${message} `;

    const time = document.createElement('span');
    time.className = 'message-time';
    const parsed = new Date(timestamp);
    if (!Number.isNaN(parsed.getTime())) {
        time.textContent = parsed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        time.dateTime = parsed.toISOString();
    }

    row.append(author, body, time);
    return row;
}

/**
 * Loads messages from the server and paints them.
 */
export async function loadChatMessages() {
    const messageList = document.getElementById('messageList');
    if (!messageList) return;

    try {
        const response = await fetch(`${API_BASE_URL}/getMessages`);
        if (!response.ok) throw new Error(`Server responded ${response.status}`);

        const messages = await response.json();
        messageList.textContent = '';

        if (!Array.isArray(messages) || messages.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'chat-empty';
            empty.textContent = 'No transmissions yet. Say something.';
            messageList.appendChild(empty);
            return;
        }

        const fragment = document.createDocumentFragment();
        messages.forEach(entry => fragment.appendChild(renderMessage(entry)));
        messageList.appendChild(fragment);
        messageList.scrollTop = messageList.scrollHeight;
    } catch (error) {
        console.error('Error loading messages:', error);
        messageList.textContent = '';
        const failure = document.createElement('div');
        failure.className = 'chat-empty';
        failure.textContent = 'Channel offline -- could not reach the relay.';
        messageList.appendChild(failure);
    }
}

/**
 * Posts a new message.
 */
export async function sendMessage() {
    const nameInput = document.getElementById('nameInput');
    const messageInput = document.getElementById('messageInput');
    const messageList = document.getElementById('messageList');
    const sendButton = document.getElementById('chatSendBtn');

    if (!nameInput || !messageInput || !messageList) return;

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
        setChatStatus('Enter a handle and a message.');
        return;
    }

    if (sendButton) sendButton.disabled = true;
    setChatStatus('Sending...');

    try {
        const response = await fetch(`${API_BASE_URL}/postMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, message })
        });

        if (!response.ok) {
            const detail = await response.json().catch(() => ({}));
            throw new Error(detail.error || `Server responded ${response.status}`);
        }

        // Remember the handle so returning visitors don't retype it.
        try { localStorage.setItem(NAME_KEY, name); } catch { /* private mode */ }

        messageInput.value = '';
        setChatStatus('');
        await loadChatMessages();
        document.dispatchEvent(new CustomEvent('playSound', { detail: { id: 'messageSound' } }));
    } catch (error) {
        console.error('Error sending message:', error);
        setChatStatus(error.message || 'Could not send message.');
    } finally {
        if (sendButton) sendButton.disabled = false;
    }
}

/**
 * @param {string} text
 */
function setChatStatus(text) {
    const status = document.getElementById('chatStatus');
    if (status) status.textContent = text;
}

/** Starts polling while the chat is visible, and stops when it isn't. */
export function initChat() {
    const nameInput = document.getElementById('nameInput');
    const messageInput = document.getElementById('messageInput');

    if (nameInput) {
        try {
            const saved = localStorage.getItem(NAME_KEY);
            if (saved) nameInput.value = saved;
        } catch { /* private mode */ }
    }

    if (messageInput) {
        messageInput.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                sendMessage();
            }
        });
    }

    const contact = document.getElementById('contact');
    if (!contact) return;

    // Only poll while the panel is actually on screen.
    const observer = new MutationObserver(() => {
        const visible = contact.classList.contains('active');
        if (visible && !pollTimer) {
            loadChatMessages();
            pollTimer = setInterval(loadChatMessages, 15_000);
        } else if (!visible && pollTimer) {
            clearInterval(pollTimer);
            pollTimer = null;
        }
    });
    observer.observe(contact, { attributes: true, attributeFilter: ['class'] });
}
