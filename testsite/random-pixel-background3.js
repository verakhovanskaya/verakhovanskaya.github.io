const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

// Define main content width and transition parameters
const mainWidth = 800;  // Fixed width of the white center column
const transitionWidth = 200; // Controls the blue-to-white fade on the sides
const topFadeHeight = 40; // Height of the top blue transition

// Resize canvas to fill the screen
function initializeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateRandomPixels();
}

// Generate random pixels with a left-right transition effect
function generateRandomPixels() {
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    
    const leftBound = centerX - mainWidth / 2;
    const rightBound = centerX + mainWidth / 2;

    const imageData = ctx.createImageData(width, height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        const x = (i / 4) % width;
        const y = Math.floor(i / 4 / width);
        
        let isWhite = x >= leftBound && x <= rightBound;

        if (!isWhite) {
            // Calculate horizontal fade effect
            const distanceX = Math.min(Math.abs(x - leftBound), Math.abs(x - rightBound));
            const probabilityX = Math.max(0, distanceX / transitionWidth);
            
            // Calculate vertical fade effect at the top
            const probabilityY = y < topFadeHeight ? 1 - (y / topFadeHeight) : 0;

            // Combine probabilities (top fade and left-right fade)
            const probability = Math.max(probabilityX, probabilityY);

            const isPixelColored = Math.random() < probability;

            if (isPixelColored) {
                imageData.data[i] = 0;       // Red (set to 0 for blue)
                imageData.data[i + 1] = 51;  // Green (set to 0 for blue)
                imageData.data[i + 2] = 204; // Blue (full intensity)
            } else {
                isWhite = true; // Keep some white noise
            }
        }

        if (isWhite) {
            imageData.data[i] = 255;     // White background
            imageData.data[i + 1] = 255;
            imageData.data[i + 2] = 255;
        }

        imageData.data[i + 3] = 255; // Alpha (fully opaque)
    }

    ctx.putImageData(imageData, 0, 0);
}

// Update canvas size on window resize
window.addEventListener("resize", initializeCanvas);

// Initialize the random pixel canvas
initializeCanvas();
