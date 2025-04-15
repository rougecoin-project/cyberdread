/**
 * Music Player module - Handles music playback and visualization
 */
import { playSound, SOUNDS } from '../sound.js';

// Music player state variables
let currentTrack = null;
let audioContext = null;
let analyser = null;
let isPlaying = false;

/**
 * Toggles the visibility of the music player
 */
export function toggleMusicPlayer() {
    const player = document.getElementById('musicPlayer');
    if (player.style.display === 'none') {
        player.style.display = 'block';
        // Set initial position if not already set
        if (!player.style.left) {
            player.style.left = '200px';
            player.style.top = '100px';
            playSound(SOUNDS.OPEN);
        }
        if (!audioContext) {
            initAudio();
        }
    } else {
        player.style.display = 'none';
    }
}

/**
 * Initializes the audio context and analyzer
 */
function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    
    setupVisualizer();
}

/**
 * Sets up the audio visualizer using canvas
 */
function setupVisualizer() {
    const canvas = document.getElementById('visualizer');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
        const width = canvas.width;
        const height = canvas.height;
        
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, width, height);
        
        const barWidth = (width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;
        
        for(let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 2;
            ctx.fillStyle = `rgb(0, ${barHeight + 100}, 0)`;
            ctx.fillRect(x, height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
        }
    }
    
    draw();
}

/**
 * Updates the music player interface
 * @param {string} songTitle - The title of the current song
 * @param {boolean} isPlaying - Whether the music is playing
 */
function updateMusicInterface(songTitle, isPlaying) {
    // Update both player displays
    const titleElement = document.getElementById('songTitle');
    const startMenuTitleElement = document.getElementById('startMenuSongTitle');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const mainPlayBtn = document.querySelector('.controls button:nth-child(2)');
    
    if (titleElement) titleElement.textContent = songTitle;
    if (startMenuTitleElement) startMenuTitleElement.textContent = songTitle;
    
    // Update play/pause buttons in both places
    if (playPauseBtn && mainPlayBtn) {
        if (isPlaying) {
            playPauseBtn.textContent = '⏸';
            mainPlayBtn.textContent = '⏸';
        } else {
            playPauseBtn.textContent = '▶';
            mainPlayBtn.textContent = '▶';
        }
    }
}

/**
 * Plays a track from the playlist
 * @param {Element} element - The playlist item element to play
 */
export function playTrack(element) {
    if (currentTrack) {
        currentTrack.pause();
    }
    
    document.querySelectorAll('.playlist-item').forEach(item => {
        item.classList.remove('active');
    });
    
    element.classList.add('active');
    const src = element.dataset.src;
    
    currentTrack = new Audio(src);
    currentTrack.addEventListener('loadeddata', () => {
        if (!audioContext) {
            initAudio();
        }
        const source = audioContext.createMediaElementSource(currentTrack);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        const songTitle = element.textContent;
        updateMusicInterface(songTitle, true);
        currentTrack.play();
        isPlaying = true;
    });
}

/**
 * Toggles play/pause of the current track
 */
export function togglePlay() {
    if (!currentTrack) {
        const firstTrack = document.querySelector('.playlist-item');
        if (firstTrack) {
            playTrack(firstTrack);
            playSound(SOUNDS.OPEN);
        }
        return;
    }
    
    if (isPlaying) {
        currentTrack.pause();
        isPlaying = false;
    } else {
        currentTrack.play();
        isPlaying = true;
    }
    
    updateMusicInterface(currentTrack ? document.querySelector('.playlist-item.active').textContent : 'No track playing', isPlaying);
}

/**
 * Plays the next track in the playlist
 */
export function nextTrack() {
    const current = document.querySelector('.playlist-item.active');
    const next = current?.nextElementSibling || document.querySelector('.playlist-item');
    if (next) {
        playTrack(next);
        playSound(SOUNDS.OPEN);
    }
}

/**
 * Plays the previous track in the playlist
 */
export function previousTrack() {
    const current = document.querySelector('.playlist-item.active');
    const prev = current?.previousElementSibling || document.querySelector('.playlist-item:last-child');
    if (prev) {
        playTrack(prev);
        playSound(SOUNDS.OPEN);
    }
}

/**
 * Initializes all music player event listeners
 */
export function initMusicPlayerEventListeners() {
    // Add volume control
    document.getElementById('volumeSlider')?.addEventListener('input', (e) => {
        if (currentTrack) {
            currentTrack.volume = e.target.value;
        }
    });

    // Make playlist items clickable
    document.querySelectorAll('.playlist-item').forEach(item => {
        item.addEventListener('click', () => playTrack(item));
    });
}
