const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to match viewport
function initializeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateRandomPixels();
}

// Generate random pixels with rectangular fade effect
function generateRandomPixels() {
    const width = canvas.width;
    const height = canvas.height;
    const padding = 50; // Transition gradient height

    const whiteZoneStart = padding;
    const whiteZoneEnd = height - padding;

    const imageData = ctx.createImageData(width, height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        const x = (i / 4) % width;
        const y = Math.floor(i / 4 / width);

        let probability;
        if (y < whiteZoneStart) { 
            // Top gradient zone
            probability = y / padding;  
        } else if (y > whiteZoneEnd) { 
            // Bottom gradient zone
            probability = (height - y) / padding;
        } else { 
            // Center white zone
            probability = 0; 
        }

        const isPixelColored = Math.random() < probability;

        if (isPixelColored) {
            imageData.data[i] = 0;       // Red (0 for blue)
            imageData.data[i + 1] = 51;   // Green (0 for blue)
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


// Initialize canvas
initializeCanvas();
