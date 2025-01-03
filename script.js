// Add sound playing function at the top
function playSound(id) {
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

// Power up screen
function startSystem() {
    playSound('startupSound');
    const lines = [
        'Initializing neural interface...',
        'Connecting to cyberspace...',
        'Loading ICE protocols...',
        'Bypassing security...',
        'Accessing {Dread_OS}...'
    ];
    
    const bios = document.querySelector('.bios-text');
    let delay = 0;
    
    lines.forEach((line, i) => {
        setTimeout(() => {
            bios.innerHTML += line + '<br>';
            if (i === lines.length - 1) {
                setTimeout(() => {
                    document.getElementById('powerUpScreen').style.display = 'none';
                    showTooltips(); // Show tooltips after system starts
                }, 500);
            }
        }, delay);
        delay += 500;
    });
}

// Explorer functions
function openExplorer() {
    playSound('openSound');
    document.getElementById('explorer').style.display = 'block';
}

function closeExplorer() {
    playSound('closeSound');
    document.getElementById('explorer').style.display = 'none';
}

function dragElement(event) {
    event.preventDefault();
    const target = event.target.closest('.explorer, .music-player');
    if (!target) return;

    let shiftX = event.clientX - target.getBoundingClientRect().left;
    let shiftY = event.clientY - target.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        target.style.left = pageX - shiftX + 'px';
        target.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    });
}

// Attach drag functionality to player header
document.addEventListener('DOMContentLoaded', function() {
    const playerHeader = document.querySelector('.player-header');
    if (playerHeader) {
        playerHeader.addEventListener('mousedown', dragElement);
    }
});

// Folder content functions
function showContent(id) {
    playSound('clickSound');
    document.querySelector('.folder-container').style.display = 'none';
    const content = document.getElementById(id);
    content.classList.add('active');
    
    // Play loading sound when "About Me" section is displayed
    if (id === 'about-me') {
        playSound('loadingSound');
    }
}

function hideContent(id) {
    playSound('clickSound');
    document.querySelector('.folder-container').style.display = 'flex';
    const content = document.getElementById(id);
    content.classList.remove('active');
}

// Access modal functions
function showAccessModal() {
    playSound('openSound');
    document.getElementById('accessModal').style.display = 'block';
}

function handleAccess(accepted) {
    if (accepted) {
        playSound('openSound');
        window.open('https://rougee.io/signup', '_blank');
        document.getElementById('accessModal').style.display = 'none';
    } else {
        playSound('errorSound');
        document.getElementById('accessModal').style.display = 'none';
    }
}

// Clock functions
function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();

// Start menu functions
function toggleStartMenu() {
    const startMenu = document.getElementById('startMenu');
    const startButton = document.querySelector('.start-menu');
    
    if (startMenu.style.display === 'block') {
        playSound('closeSound');
        startMenu.style.display = 'none';
        startButton.classList.remove('active');
    } else {
        playSound('openSound');
        startMenu.style.display = 'block';
        startButton.classList.add('active');
    }
}

// Close start menu when clicking outside
document.addEventListener('click', function(event) {
    const startMenu = document.getElementById('startMenu');
    const startButton = document.querySelector('.start-menu');
    
    if (!startButton.contains(event.target) && !startMenu.contains(event.target)) {
        startMenu.style.display = 'none';
        startButton.classList.remove('active');
    }
});

// Shutdown functions
function showShutdownModal() {
    document.getElementById('shutdownModal').style.display = 'block';
    document.getElementById('startMenu').style.display = 'none';
}

function closeShutdownModal() {
    document.getElementById('shutdownModal').style.display = 'none';
}

function initiateShutdown() {
    playSound('shutdownSound');
    document.getElementById('shutdownModal').style.display = 'none';
    const shutdownScreen = document.getElementById('shutdownScreen');
    shutdownScreen.style.display = 'flex';
    
    // Create matrix rain
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    shutdownScreen.appendChild(canvas);
    
    // Matrix rain animation code here...
    // (Matrix rain implementation would go here)
    
    setTimeout(() => {
        window.location.href = 'https://cyberpunk.fandom.com/wiki/Netrunner';
    }, 2000);
}

// Chat functions
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = messages.map(msg => `
        <div class="message">
            <span class="message-name">${msg.name}:</span>
            <span class="message-text">${msg.text}</span>
            <span class="message-time">${msg.time}</span>
            <button class="delete-btn" onclick="deleteMessage(${msg.id})">×</button>
        </div>
    `).join('');
    messageList.scrollTop = messageList.scrollHeight;
}

function sendMessage() {
    const nameInput = document.getElementById('nameInput');
    const messageInput = document.getElementById('messageInput');
    const name = nameInput.value.trim() || 'Anonymous';
    const text = messageInput.value.trim();

    if (text) {
        playSound('messageSound');
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        const newMessage = {
            id: Date.now(),
            name: name,
            text: text,
            time: new Date().toLocaleTimeString()
        };
        messages.push(newMessage);
        localStorage.setItem('chatMessages', JSON.stringify(messages));
        messageInput.value = '';
        loadMessages();
    }
}

function deleteMessage(id) {
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    const updatedMessages = messages.filter(msg => msg.id !== id);
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
    loadMessages();
}

// Message input event listener
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('messageInput')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Load messages when contact folder is opened
    document.querySelector('[onclick="showContent(\'contact\')"]')
        ?.addEventListener('click', loadMessages);
});

// Resize observer
const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        if (entry.target.id === 'explorer') {
            const content = entry.target.querySelector('.explorer-content');
            if (content) {
                content.style.height = `calc(${entry.target.style.height} - 40px)`;
            }
        }
    }
});

// Start observing the explorer window when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    resizeObserver.observe(document.getElementById('explorer'));
});

// Image viewer functions
function openImageViewer(src) {
    const viewer = document.getElementById('imageViewer');
    const image = document.getElementById('viewerImage');
    image.src = src;
    viewer.style.display = 'flex';
}

function closeImageViewer() {
    document.getElementById('imageViewer').style.display = 'none';
}

// Add glitch effect on folder click
function addGlitchEffect(element) {
    element.style.animation = 'none';
    element.offsetHeight; // Trigger reflow
    element.style.animation = 'glitchEffect 0.3s ease';
}

document.querySelectorAll('.folder').forEach(folder => {
    folder.addEventListener('click', () => addGlitchEffect(folder));
});

// Random glitch effect
function randomGlitch() {
    const elements = document.querySelectorAll('.folder, .icon, .start-menu');
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    addGlitchEffect(randomElement);
    
    // Schedule next glitch
    setTimeout(randomGlitch, Math.random() * 10000 + 5000);
}

// Start random glitches after power up
setTimeout(randomGlitch, 3000);

// Music Player Functions
let currentTrack = null;
let audioContext = null;
let analyser = null;
let isPlaying = false;

function toggleMusicPlayer() {
    const player = document.getElementById('musicPlayer');
    if (player.style.display === 'none') {
        player.style.display = 'block';
        // Set initial position if not already set
        if (!player.style.left) {
            player.style.left = '200px';
            player.style.top = '100px';
            playSound('openSound');
        }
        if (!audioContext) {
            initAudio();
        }
    } else {
        player.style.display = 'none';
    }
}

function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    
    setupVisualizer();
}

function setupVisualizer() {
    const canvas = document.getElementById('visualizer');
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

// Update music player functions
function updateMusicInterface(songTitle, isPlaying) {
    // Update both player displays
    document.getElementById('songTitle').textContent = songTitle;
    document.getElementById('startMenuSongTitle').textContent = songTitle;
    
    // Update play/pause buttons in both places
    const playPauseBtn = document.getElementById('playPauseBtn');
    const mainPlayBtn = document.querySelector('.controls button:nth-child(2)');
    
    if (isPlaying) {
        playPauseBtn.textContent = '⏸';
        mainPlayBtn.textContent = '⏸';
    } else {
        playPauseBtn.textContent = '▶';
        mainPlayBtn.textContent = '▶';
    }
}

function playTrack(element) {
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

function togglePlay() {
    if (!currentTrack) {
        const firstTrack = document.querySelector('.playlist-item');
        if (firstTrack) {
            playTrack(firstTrack);
            playSound('openSound');
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

function nextTrack() {
    const current = document.querySelector('.playlist-item.active');
    const next = current?.nextElementSibling || document.querySelector('.playlist-item');
    if (next) {
        playTrack(next);
        playSound('openSound');
    }
}

function previousTrack() {
    const current = document.querySelector('.playlist-item.active');
    const prev = current?.previousElementSibling || document.querySelector('.playlist-item:last-child');
    if (prev) {
        playTrack(prev);
        playSound('openSound');
    }
}

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

// Tooltip functions
function createTooltip(text, targetElement) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerHTML = text;
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

function findElementByText(selector, text) {
    const elements = document.querySelectorAll(selector);
    for (let element of elements) {
        if (element.textContent.trim() === text) {
            return element;
        }
    }
    return null;
}

function showTooltips() {
    const tooltips = [
        { text: 'Welcome, netrunner! Click "Start" to access the main menu.', target: '.start-menu' },
        { text: 'Open the "Files" to explore your data.', target: '.icon-label', matchText: 'Files' },
        { text: 'Check out the "Music" player for some tunes.', target: '.icon-label', matchText: 'Music' },
        { text: 'Use the "access.exe" to connect with other chooms.', target: '.icon-label', matchText: 'access.exe' }
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
        }, index * 6000); // Adjust timing to ensure sequential display
    });
}

// Call showTooltips after the system starts
function startSystem() {
    playSound('startupSound');
    const lines = [
        'Initializing neural interface...',
        'Connecting to cyberspace...',
        'Loading ICE protocols...',
        'Bypassing security...',
        'Accessing {Dread_OS}...'
    ];
    
    const bios = document.querySelector('.bios-text');
    let delay = 0;
    
    lines.forEach((line, i) => {
        setTimeout(() => {
            bios.innerHTML += line + '<br>';
            if (i === lines.length - 1) {
                setTimeout(() => {
                    document.getElementById('powerUpScreen').style.display = 'none';
                    showTooltips(); // Show tooltips after system starts
                }, 500);
            }
        }, delay);
        delay += 500;
    });
}
