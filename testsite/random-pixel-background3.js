const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

// Main white rectangle parameters
const mainWidth = 800;  // Fixed width of the white area
const mainHeight = 400; // Fixed height of the white area

// Padding defines how far the gradient spreads outward
const paddingX = 40;  // Horizontal gradient spread
const paddingY = 20;  // Vertical gradient spread

// Resize canvas to fill the screen
function initializeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateRandomPixels();
}

// Generate random pixels with a rectangular fade effect
function generateRandomPixels() {
    const width = canvas.width;
    const height = canvas.height;

    const centerX = width / 2;
    const centerY = height / 2;

    const leftBound = centerX - mainWidth / 2;
    const rightBound = centerX + mainWidth / 2;
    const topBound = centerY - mainHeight / 2;
    const bottomBound = centerY + mainHeight / 2;

    const imageData = ctx.createImageData(width, height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        const x = (i / 4) % width;
        const y = Math.floor(i / 4 / width);

        let isWhite = x >= leftBound && x <= rightBound && y >= topBound && y <= bottomBound;

        if (!isWhite) {
            // Compute distance from the white rectangle's edge
            const distanceX = Math.max(0, Math.min(Math.abs(x - leftBound), Math.abs(x - rightBound)));
            const distanceY = Math.max(0, Math.min(Math.abs(y - topBound), Math.abs(y - bottomBound)));

            // Normalize distances based on padding
            const probabilityX = Math.min(1, distanceX / paddingX);
            const probabilityY = Math.min(1, distanceY / paddingY);
            
            // Blue density increases farther from the white area
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
