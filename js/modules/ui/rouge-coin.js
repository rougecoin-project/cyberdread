/**
 * RougeCoin module - Handles RougeCoin interface and market data
 */
import { playSound, SOUNDS } from '../sound.js';

/**
 * Opens the RougeCoin interface window
 */
export function openRougeCoin() {
    playSound(SOUNDS.OPEN);
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

/**
 * Closes the RougeCoin interface window
 */
export function closeRougeCoin() {
    playSound(SOUNDS.CLOSE);
    document.getElementById('rougeCoinInterface').style.display = 'none';
}

/**
 * Fetches and displays market data for RougeCoin
 */
export function simulateMarketData() {
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
