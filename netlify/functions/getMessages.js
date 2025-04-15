const fs = require('fs');
const path = require('path');

const MESSAGES_FILE = path.join(__dirname, 'messages.json');

exports.handler = async () => {
    try {
        // Check if the messages file exists
        if (!fs.existsSync(MESSAGES_FILE)) {
            // If not, create an empty file
            fs.writeFileSync(MESSAGES_FILE, JSON.stringify([]));
        }

        // Read messages from the file
        const messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf-8'));

        return {
            statusCode: 200,
            body: JSON.stringify(messages),
        };
    } catch (error) {
        console.error('Error reading messages:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch messages' }),
        };
    }
};
