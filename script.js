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
    const target = event.target.closest('.explorer, .music-player');
    if (!target) return;

    let pos = { x: 0, y: 0 };
    let startPos = { x: 0, y: 0 };

    if (event.type === 'mousedown') {
        event.preventDefault();
        startPos.x = event.clientX;
        startPos.y = event.clientY;
        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', stopHandler);
    } else if (event.type === 'touchstart') {
        event.preventDefault();
        startPos.x = event.touches[0].clientX;
        startPos.y = event.touches[0].clientY;
        document.addEventListener('touchmove', moveHandler);
        document.addEventListener('touchend', stopHandler);
    }

    function moveHandler(e) {
        if (e.type === 'mousemove') {
            pos.x = startPos.x - e.clientX;
            pos.y = startPos.y - e.clientY;
            startPos.x = e.clientX;
            startPos.y = e.clientY;
        } else {
            pos.x = startPos.x - e.touches[0].clientX;
            pos.y = startPos.y - e.touches[0].clientY;
            startPos.x = e.touches[0].clientX;
            startPos.y = e.touches[0].clientY;
        }

        target.style.top = (target.offsetTop - pos.y) + "px";
        target.style.left = (target.offsetLeft - pos.x) + "px";
    }

    function stopHandler() {
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseup', stopHandler);
        document.removeEventListener('touchmove', moveHandler);
        document.removeEventListener('touchend', stopHandler);
    }
}

// Add touch event listeners
document.addEventListener('DOMContentLoaded', function() {
    const draggableElements = document.querySelectorAll('.explorer-header, .player-header');
    draggableElements.forEach(el => {
        el.addEventListener('touchstart', dragElement);
        el.addEventListener('mousedown', dragElement);
    });
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

// Add custom resize functionality for touch devices
document.addEventListener('DOMContentLoaded', function() {
    const explorer = document.getElementById('explorer');
    const resizeHandle = document.querySelector('.explorer::after');
    
    let startHeight, startWidth, startX, startY;
    
    function initResize(e) {
        e.preventDefault();
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        startHeight = explorer.offsetHeight;
        startWidth = explorer.offsetWidth;
        
        document.addEventListener('touchmove', resizeMove);
        document.addEventListener('touchend', stopResize);
    }
    
    function resizeMove(e) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        
        const newWidth = Math.max(300, startWidth + deltaX);
        const newHeight = Math.max(200, startHeight + deltaY);
        
        explorer.style.width = `${newWidth}px`;
        explorer.style.height = `${newHeight}px`;
    }
    
    function stopResize() {
        document.removeEventListener('touchmove', resizeMove);
        document.removeEventListener('touchend', stopResize);
    }
    
    // Add touch event listeners for the resize handle
    explorer.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        const rect = explorer.getBoundingClientRect();
        const isInResizeArea = (
            touch.clientX >= rect.right - 44 && 
            touch.clientY >= rect.bottom - 44
        );
        
        if (isInResizeArea) {
            initResize(e);
        }
    });
});

// RougeCoin functions
function openRougeCoin() {
    playSound('openSound');
    document.getElementById('rougeCoinInterface').style.display = 'block';
    
    // Setup the RougeCoin interface position
    const rougeCoinInterface = document.getElementById('rougeCoinInterface');
    rougeCoinInterface.style.width = '600px';
    rougeCoinInterface.style.height = '500px';
    rougeCoinInterface.style.top = '100px';
    rougeCoinInterface.style.left = '200px';
    
    // Fetch market data
    simulateMarketData();
}

function closeRougeCoin() {
    playSound('closeSound');
    document.getElementById('rougeCoinInterface').style.display = 'none';
}

function simulateMarketData() {
    // Show loading state
    document.getElementById('rougePrice').textContent = "Loading...";
    document.getElementById('rougeChange').textContent = "Loading...";
    document.getElementById('rougeCap').textContent = "Loading...";
    
    // Fetch real market data for RougeCoin from DEXScreener API
    fetch('https://api.dexscreener.com/latest/dex/tokens/0xA1c7D450130bb77c6a23DdFAeCbC4a060215384b')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("DEXScreener data:", data);
            // Extract the most recent pair data
            if (data.pairs && data.pairs.length > 0) {
                const tokenData = data.pairs[0];
                
                // Update price
                const price = tokenData.priceUsd;
                document.getElementById('rougePrice').textContent = `$${parseFloat(price).toFixed(8)}`;
                
                // Update 24h change
                const change = tokenData.priceChange.h24;
                const changeElement = document.getElementById('rougeChange');
                changeElement.textContent = `${change}%`;
                changeElement.style.color = parseFloat(change) >= 0 ? '#00ff00' : '#ff4444';
                
                // Update market cap
                const marketCap = tokenData.fdv;
                document.getElementById('rougeCap').textContent = `$${parseInt(marketCap).toLocaleString()}`;
            } else {
                throw new Error('No token data found');
            }
        })
        .catch(error => {
            console.error('Error fetching token data:', error);
            // Fallback to simulated data if API fails
            const price = (Math.random() * 0.5 + 0.1).toFixed(8);
            const change = (Math.random() * 20 - 10).toFixed(2);
            const marketCap = (price * 1000000000).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
            });
            
            document.getElementById('rougePrice').textContent = `$${price}`;
            
            const changeElement = document.getElementById('rougeChange');
            changeElement.textContent = `${change}%`;
            changeElement.style.color = parseFloat(change) >= 0 ? '#00ff00' : '#ff4444';
            
            document.getElementById('rougeCap').textContent = marketCap;
        });
}

// Web3 Integration Variables
let web3;
let userAccount;
let isWalletConnected = false;
let chainId;

// Token addresses
const TOKEN_ADDRESSES = {
    ETH: 'ETH', // Native ETH
    USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    ROUGE: '0xA1c7D450130bb77c6a23DdFAeCbC4a060215384b'
};

// ABI for ERC20 tokens - minimal interface for checking balances and approving tokens
const ERC20_ABI = [
    {
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {"name": "_spender", "type": "address"},
            {"name": "_value", "type": "uint256"}
        ],
        "name": "approve",
        "outputs": [{"name": "", "type": "bool"}],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{"name": "", "type": "uint8"}],
        "type": "function"
    }
];

// Connect to wallet function
async function connectWallet() {
    playSound('clickSound');
    
    try {
        // Check if MetaMask is installed
        if (window.ethereum) {
            try {
                // Request account access
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                handleAccountsChanged(accounts);
                
                // Create Web3 instance
                web3 = new Web3(window.ethereum);
                
                // Get chain ID
                chainId = await web3.eth.getChainId();
                
                // Setup event listeners
                window.ethereum.on('accountsChanged', handleAccountsChanged);
                window.ethereum.on('chainChanged', handleChainChanged);
                
                // Update UI
                updateWalletUI();
                
                return true;
            } catch (error) {
                console.error("User denied account access:", error);
                showWalletError("Connection rejected. Please try again.");
                return false;
            }
        } else if (window.web3) {
            // Legacy web3 provider
            web3 = new Web3(window.web3.currentProvider);
            
            // Get accounts
            const accounts = await web3.eth.getAccounts();
            handleAccountsChanged(accounts);
            
            // Get chain ID
            chainId = await web3.eth.getChainId();
            
            // Update UI
            updateWalletUI();
            
            return true;
        } else {
            showWalletError("No Ethereum wallet detected. Please install MetaMask.");
            return false;
        }
    } catch (error) {
        console.error("Error connecting wallet:", error);
        showWalletError("Failed to connect wallet. Please try again.");
        return false;
    }
}

// Handle accounts changed
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // User logged out
        userAccount = null;
        isWalletConnected = false;
    } else {
        // User logged in or changed accounts
        userAccount = accounts[0];
        isWalletConnected = true;
    }
    
    // Update UI
    updateWalletUI();
}

// Handle chain changed
function handleChainChanged(newChainId) {
    // Reload the page when the chain changes
    window.location.reload();
}

// Update wallet UI
function updateWalletUI() {
    const walletAddressElement = document.getElementById('walletAddress');
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const swapButton = document.getElementById('swapButton');
    
    if (isWalletConnected && userAccount) {
        // Format account address for display
        const formattedAddress = `${userAccount.substring(0, 6)}...${userAccount.substring(userAccount.length - 4)}`;
        walletAddressElement.textContent = formattedAddress;
        walletAddressElement.classList.add('wallet-connected');
        
        // Update connect button
        connectWalletBtn.innerHTML = '<i class="fas fa-wallet"></i> Connected';
        
        // Update swap button
        swapButton.textContent = 'Swap';
        swapButton.disabled = false;
        
        // Get token balances
        getTokenBalance();
    } else {
        walletAddressElement.textContent = 'Wallet not connected';
        walletAddressElement.classList.remove('wallet-connected');
        
        // Update connect button
        connectWalletBtn.innerHTML = '<i class="fas fa-wallet"></i> Connect Wallet';
        
        // Update swap button
        swapButton.textContent = 'Connect Wallet to Swap';
        swapButton.disabled = true;
    }
}

// Get token balance
async function getTokenBalance() {
    if (!isWalletConnected || !web3) return;
    
    try {
        // Get selected token
        const selectedToken = document.getElementById('fromToken').value;
        
        // Get balance based on token type
        let balance;
        
        if (selectedToken === 'ETH') {
            // Get ETH balance
            balance = await web3.eth.getBalance(userAccount);
            balance = web3.utils.fromWei(balance, 'ether');
        } else {
            // Get ERC20 token balance
            const tokenAddress = TOKEN_ADDRESSES[selectedToken];
            const tokenContract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
            
            balance = await tokenContract.methods.balanceOf(userAccount).call();
            
            // Get decimals
            const decimals = await tokenContract.methods.decimals().call();
            
            // Convert based on decimals
            balance = balance / Math.pow(10, decimals);
        }
        
        // Display balance (optional)
        console.log(`${selectedToken} Balance: ${balance}`);
        
        // You could add a balance display in the UI here if desired
    } catch (error) {
        console.error("Error fetching balance:", error);
    }
}

// Show wallet error
function showWalletError(message) {
    playSound('errorSound');
    
    // You could implement a more sophisticated error UI
    alert(message);
}

// Perform swap (this would connect to Uniswap's smart contracts in a full implementation)
async function performSwap() {
    if (!isWalletConnected) {
        connectWallet();
        return;
    }
    
    playSound('clickSound');
    
    const fromAmount = document.getElementById('fromAmount').value;
    const fromToken = document.getElementById('fromToken').value;
    
    if (!fromAmount || fromAmount <= 0) {
        alert('Please enter an amount to swap');
        return;
    }
    
    // In a full implementation, this would interact with Uniswap contracts
    // For now, we'll show a simulated transaction and then redirect
    
    // Update button to show loading state
    const swapButton = document.getElementById('swapButton');
    const buttonText = swapButton.textContent;
    swapButton.innerHTML = 'Preparing Swap <span class="loading-spinner"></span>';
    swapButton.disabled = true;
    
    try {
        // Simulate transaction preparation delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // For now, redirect to Uniswap with the parameters
        redirectToUniswap();
    } catch (error) {
        console.error("Error in swap:", error);
        swapButton.textContent = buttonText;
        swapButton.disabled = false;
        showWalletError("Swap failed. Please try again.");
    }
}

// Update token listeners when the fromToken changes
window.addEventListener('DOMContentLoaded', () => {
    const fromTokenField = document.getElementById('fromToken');
    if (fromTokenField) {
        fromTokenField.addEventListener('change', () => {
            if (isWalletConnected) {
                getTokenBalance();
            }
            calculateSwapEstimate();
        });
    }
});
