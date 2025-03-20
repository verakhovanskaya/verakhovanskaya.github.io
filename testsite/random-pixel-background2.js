const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

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
    
    const paddingX = 50; // Horizontal fade padding
    const paddingY = 50; // Vertical fade padding
    const innerStartX = paddingX;
    const innerEndX = width - paddingX;
    const innerStartY = paddingY;
    const innerEndY = height - paddingY;

    const imageData = ctx.createImageData(width, height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        const x = (i / 4) % width;
        const y = Math.floor(i / 4 / width);

        let probability = 0;

        if (x < innerStartX) { 
            probability = (innerStartX - x) / paddingX; // Left fade
        } else if (x > innerEndX) { 
            probability = (x - innerEndX) / paddingX; // Right fade
        }

        if (y < innerStartY) { 
            probability = Math.max(probability, (innerStartY - y) / paddingY); // Top fade
        } else if (y > innerEndY) { 
            probability = Math.max(probability, (y - innerEndY) / paddingY); // Bottom fade
        }

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
