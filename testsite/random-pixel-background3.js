const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

// Padding parameters: Adjust how the gradient transitions from white to blue
const paddingX = 200; // Controls horizontal white space
const paddingY = 150;  // Controls vertical white space

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

    const imageData = ctx.createImageData(width, height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        const x = (i / 4) % width;
        const y = Math.floor(i / 4 / width);

        // Compute distances from the edges
        const distanceX = Math.min(x, width - x);  // Distance to left or right edge
        const distanceY = Math.min(y, height - y); // Distance to top or bottom edge

        // Normalize distances based on padding
        const probabilityX = Math.max(0, 1 - (distanceX / paddingX));
        const probabilityY = Math.max(0, 1 - (distanceY / paddingY));

        // Combine X and Y probabilities to control density
        const probability = Math.max(probabilityX, probabilityY); // Stronger effect at edges

        const isPixelColored = Math.random() < probability;

        if (isPixelColored) {
            imageData.data[i] = 0;       // Red (set to 0 for blue)
            imageData.data[i + 1] = 51;   // Green (set to 0 for blue)
            imageData.data[i + 2] = 204; // Blue (full intensity)
        } else {
            imageData.data[i] = 255;     // Red (white background)
            imageData.data[i + 1] = 255; // Green (white background)
            imageData.data[i + 2] = 255; // Blue (white background)
        }

        imageData.data[i + 3] = 255; // Alpha (fully opaque)
    }

    ctx.putImageData(imageData, 0, 0);
}

// Update canvas size on window resize
window.addEventListener("resize", initializeCanvas);

// Initialize the random pixel canvas
initializeCanvas();
