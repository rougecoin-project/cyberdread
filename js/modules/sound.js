/**
 * Sound module - handles all audio-related functionality.
 */

let muted = false;

/**
 * Mutes or unmutes all interface sounds.
 * @param {boolean} value
 */
export function setMuted(value) {
    muted = Boolean(value);
}

/** @returns {boolean} whether interface sounds are muted */
export function isMuted() {
    return muted;
}

/**
 * Plays a sound by its element ID.
 *
 * Playback failures are expected before the visitor's first interaction
 * (browsers block autoplay), so they're swallowed quietly rather than
 * logged as errors on every page load.
 * @param {string} id - The ID of the audio element to play
 */
export function playSound(id) {
    if (muted) return;

    const sound = document.getElementById(id);
    if (!sound) {
        console.warn(`Sound element not found: ${id}`);
        return;
    }

    if (sound.readyState === 0) sound.load();
    sound.currentTime = 0;
    sound.play().catch(() => { /* blocked until the first user gesture */ });
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
