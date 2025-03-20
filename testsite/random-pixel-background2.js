const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to match full content height
function initializeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = Math.max(document.body.scrollHeight, window.innerHeight);
    generateRandomPixels();
}

// Generate random pixels with a better fading effect
function generateRandomPixels() {
    const width = canvas.width;
    const height = canvas.height;

    const imageData = ctx.createImageData(width, height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        const x = (i / 4) % width;
        const y = Math.floor(i / 4 / width);

        const distanceX = Math.abs(x - width / 2);
        const distanceY = Math.abs(y - height / 2);
        const maxDistance = Math.max(width, height) / 2;
        const distanceFromCenter = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        // Adjust probability to ensure full white background near content area
        const probability = Math.max(0, (distanceFromCenter / maxDistance) - 0.4); 
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

// Ensure canvas is positioned absolutely and expands with content
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1"; // Keep it behind content

// Initialize canvas
initializeCanvas();