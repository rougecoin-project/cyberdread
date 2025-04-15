/**
 * Chat module - Handles secret chat functionality with persistence using localStorage
 */

const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:8888/.netlify/functions' : '/.netlify/functions';

/**
 * Loads chat messages from the server and displays them in the chat interface
 */
export async function loadChatMessages() {
    const messageList = document.getElementById('messageList');
    if (!messageList) return;

    // Clear existing messages
    messageList.innerHTML = '';

    try {
        // Fetch messages from the server
        const response = await fetch(`${API_BASE_URL}/getMessages`);
        const messages = await response.json();

        // Display each message
        messages.forEach(({ name, message, timestamp }) => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.innerHTML = `<strong>${name}:</strong> ${message} <span class="timestamp">(${new Date(timestamp).toLocaleTimeString()})</span>`;
            messageList.appendChild(messageElement);
        });

        // Scroll to the bottom of the chat
        messageList.scrollTop = messageList.scrollHeight;
    } catch (error) {
        console.error('Error loading messages:', error);
    }
}

/**
 * Sends a new chat message to the server
 */
export async function sendMessage() {
    const nameInput = document.getElementById('nameInput');
    const messageInput = document.getElementById('messageInput');
    const messageList = document.getElementById('messageList');

    if (!nameInput || !messageInput || !messageList) return;

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
        alert('Please enter both a name and a message.');
        return;
    }

    try {
        // Send the message to the server
        const response = await fetch(`${API_BASE_URL}/postMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, message }),
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        // Add the message to the chat interface
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `<strong>${name}:</strong> ${message}`;
        messageList.appendChild(messageElement);

        // Scroll to the bottom of the chat
        messageList.scrollTop = messageList.scrollHeight;

        // Clear the input fields
        messageInput.value = '';
    } catch (error) {
        console.error('Error sending message:', error);
    }
}
