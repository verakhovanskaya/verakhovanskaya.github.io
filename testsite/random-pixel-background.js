const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to fill the screen
function initializeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateRandomPixels();
}

// Generate random pixels with blue highlights
function generateRandomPixels() {
    const width = canvas.width;
    const height = canvas.height;

    const imageData = ctx.createImageData(width, height);

    for (let i = 0; i < imageData.data.length; i += 4) {
        const distanceX = Math.abs((i / 4) % width - width / 2);
        const distanceY = Math.abs(Math.floor(i / 4 / width) - height / 2);
        const maxDistance = Math.max(width, height) / 2;
        const distanceFromCenter = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        const probability = distanceFromCenter / maxDistance -.6; // Least dense near center
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
