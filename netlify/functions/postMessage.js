const fs = require('fs');
const path = require('path');

const MESSAGES_FILE = path.join(__dirname, 'messages.json');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        // Parse the incoming message
        const { name, message } = JSON.parse(event.body);

        if (!name || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Name and message are required' }),
            };
        }

        // Ensure the messages file exists
        if (!fs.existsSync(MESSAGES_FILE)) {
            fs.writeFileSync(MESSAGES_FILE, JSON.stringify([]));
        }

        // Read existing messages
        const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'));

        // Add the new message
        messages.push({ name, message, timestamp: new Date().toISOString() });

        // Save the updated messages back to the file
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));

        return {
            statusCode: 201,
            body: JSON.stringify({ success: true }),
        };
    } catch (error) {
        console.error('Error saving message:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to save message' }),
        };
    }
};
