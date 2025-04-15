/**
 * Sound module - Handles all audio-related functionality
 */

/**
 * Plays a sound by its ID
 * @param {string} id - The ID of the audio element to play
 */
export function playSound(id) {
    const sound = document.getElementById(id);
    if (sound) {
        console.log(`Playing sound: ${id}`);
        if (sound.readyState === 0) {
            console.log(`Loading sound: ${id}`);
            sound.load();
        }
        sound.currentTime = 0;
        sound.play().catch(error => {
            console.error(`Audio playback failed for ${id}:`, error);
        });
    } else {
        console.error(`Sound element not found: ${id}`);
    }
}

// Export sound IDs for easy access
export const SOUNDS = {
    STARTUP: 'startupSound',
    CLICK: 'clickSound',
    OPEN: 'openSound',
    CLOSE: 'closeSound',
    ERROR: 'errorSound',
    SHUTDOWN: 'shutdownSound',
    MESSAGE: 'messageSound',
    LOADING: 'loadingSound'
};
