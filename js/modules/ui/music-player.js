/**
 * Music Player module - playback, playlist and spectrum visualization.
 */
import { playSound, SOUNDS } from '../sound.js';
import { PLAYLIST } from '../../data/site-config.js';

const audio = new Audio();
audio.preload = 'metadata';
audio.crossOrigin = 'anonymous';

let audioContext = null;
let analyser = null;
let sourceNode = null;
let animationFrame = null;
let currentIndex = -1;

/** Opens or closes the music player window. */
export function toggleMusicPlayer() {
    const player = document.getElementById('musicPlayer');
    if (!player) return;

    const hidden = player.style.display === 'none' || player.style.display === '';
    if (hidden) {
        player.style.display = 'block';
        playSound(SOUNDS.OPEN);
        document.dispatchEvent(new CustomEvent('window:opened', { detail: { id: 'musicPlayer' } }));
    } else {
        player.style.display = 'none';
        playSound(SOUNDS.CLOSE);
        document.dispatchEvent(new CustomEvent('window:closed', { detail: { id: 'musicPlayer' } }));
    }
}

/**
 * Lazily creates the Web Audio graph.
 *
 * The audio element is created once and reused: the old code built a new
 * Audio object per track and called createMediaElementSource on each one,
 * which throws once the same element is connected twice and leaks a node
 * every time you skip a track.
 */
function ensureAudioGraph() {
    if (audioContext) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    audioContext = new AudioContextClass();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    sourceNode = audioContext.createMediaElementSource(audio);
    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);

    drawVisualizer();
}

/** Paints the frequency bars. */
function drawVisualizer() {
    const canvas = document.getElementById('visualizer');
    if (!canvas || !analyser) return;

    const context = canvas.getContext('2d');
    const data = new Uint8Array(analyser.frequencyBinCount);

    const render = () => {
        animationFrame = requestAnimationFrame(render);

        // Match the drawing buffer to the element's real size so the bars
        // aren't stretched on high-DPI screens.
        const { width, height } = canvas.getBoundingClientRect();
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }

        analyser.getByteFrequencyData(data);

        context.clearRect(0, 0, canvas.width, canvas.height);

        const accent = getComputedStyle(document.documentElement)
            .getPropertyValue('--accent').trim() || '#00ffff';
        const barWidth = canvas.width / data.length * 2.2;
        let x = 0;

        for (let i = 0; i < data.length; i += 1) {
            const barHeight = (data[i] / 255) * canvas.height;
            context.fillStyle = accent;
            context.globalAlpha = 0.35 + (data[i] / 255) * 0.65;
            context.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
            if (x > canvas.width) break;
        }
        context.globalAlpha = 1;
    };

    cancelAnimationFrame(animationFrame);
    render();
}

/**
 * Updates both the window and Start-menu displays.
 * @param {string} title
 */
function updateInterface(title) {
    const playing = !audio.paused;

    document.querySelectorAll('[data-song-title]').forEach(element => {
        element.textContent = title;
    });

    document.querySelectorAll('[data-play-toggle]').forEach(button => {
        button.textContent = playing ? '⏸' : '▶';
        button.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    });

    document.querySelectorAll('.playlist-item').forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex);
        item.setAttribute('aria-current', index === currentIndex ? 'true' : 'false');
    });
}

/**
 * Plays a track by playlist index.
 * @param {number} index
 */
export function playTrackAt(index) {
    const track = PLAYLIST[index];
    if (!track) return;

    ensureAudioGraph();
    // Browsers start the context suspended until a user gesture.
    if (audioContext?.state === 'suspended') audioContext.resume();

    currentIndex = index;
    audio.src = track.src;
    audio.play()
        .then(() => updateInterface(`${track.title} - ${track.artist}`))
        .catch(error => {
            console.error('Playback failed:', error);
            updateInterface('Playback blocked -- press play');
        });
}

/**
 * Kept for the click handlers bound to playlist rows.
 * @param {HTMLElement} element
 */
export function playTrack(element) {
    playTrackAt(Number(element.dataset.index));
}

/** Toggles play/pause. */
export function togglePlay() {
    if (currentIndex === -1) {
        playTrackAt(0);
        return;
    }

    if (audio.paused) {
        if (audioContext?.state === 'suspended') audioContext.resume();
        audio.play().catch(error => console.error('Playback failed:', error));
    } else {
        audio.pause();
    }

    const track = PLAYLIST[currentIndex];
    updateInterface(track ? `${track.title} - ${track.artist}` : 'No track playing');
}

/** Skips forward, wrapping at the end. */
export function nextTrack() {
    playTrackAt((currentIndex + 1) % PLAYLIST.length);
    playSound(SOUNDS.CLICK);
}

/** Skips back, wrapping at the start. */
export function previousTrack() {
    playTrackAt((currentIndex - 1 + PLAYLIST.length) % PLAYLIST.length);
    playSound(SOUNDS.CLICK);
}

/** Builds the playlist from site-config and wires up controls. */
export function initMusicPlayerEventListeners() {
    const list = document.getElementById('playlist');
    if (list) {
        list.textContent = '';
        PLAYLIST.forEach((track, index) => {
            const item = document.createElement('button');
            item.type = 'button';
            item.className = 'playlist-item';
            item.dataset.index = String(index);
            item.textContent = `${track.title} - ${track.artist}`;
            item.addEventListener('click', () => playTrackAt(index));
            list.appendChild(item);
        });
    }

    const volume = document.getElementById('volumeSlider');
    if (volume) {
        audio.volume = Number(volume.value) || 0.7;
        volume.addEventListener('input', event => {
            audio.volume = Number(event.target.value);
        });
    }

    audio.addEventListener('ended', nextTrack);
    audio.addEventListener('play', () => {
        const track = PLAYLIST[currentIndex];
        updateInterface(track ? `${track.title} - ${track.artist}` : 'No track playing');
    });
    audio.addEventListener('pause', () => {
        const track = PLAYLIST[currentIndex];
        updateInterface(track ? `${track.title} - ${track.artist}` : 'No track playing');
    });
    audio.addEventListener('error', () => {
        updateInterface('Track unavailable');
    });

    updateInterface('No track playing');
}
