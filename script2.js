// Get a reference to the canvas element
const canvas = document.getElementById("myCanvas");

// Get the context of the canvas element
const ctx = canvas.getContext("2d");

// Create a grid of points that we will use to warp the image
const gridSize = 10;
const grid = [];
for (let i = 0; i < gridSize; i++) {
  for (let j = 0; j < gridSize; j++) {
    grid.push({
      x: j * (canvas.width / gridSize),
      y: i * (canvas.height / gridSize),
      originalX: j * (canvas.width / gridSize),
      originalY: i * (canvas.height / gridSize),
    });
  }
}

// Load the image that we will warp
const image = new Image();
image.src = "path/to/image.jpg";
image.onload = function () {
  // Draw the image onto the canvas
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
};

// Warp the image based on the mouse position
document.addEventListener("mousemove", (event) => {
  // Calculate the mouse position relative to the canvas
  const mouseX = event.clientX - canvas.offsetLeft;
  const mouseY = event.clientY - canvas.offsetTop;

  // Update the position of each point in the grid
  grid.forEach((point) => {
    // Calculate the distance between the mouse and the point
    const dx = mouseX - point.x;
    const dy = mouseY - point.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If the mouse is within 100 pixels of the point, move the point away from the mouse
    if (distance < 100) {
      point.x = point.originalX + dx / distance * 100;
      point.y = point.originalY + dy / distance * 100;
    } else {
      // Otherwise, move the point back to its original position
      point.x = point.originalX;
      point.y = point.originalY;
    }
  });

  // Redraw the image using the warped grid
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width,
