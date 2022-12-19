// ask chatgpt to finish this code
const images = document.querySelectorAll(".image-container img");

document.addEventListener("mousemove", (event) => {
  // Get the mouse position
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  images.forEach((image) => {
    // Get the bounding rect of the image
    const rect = image.getBoundingClientRect();
    // Calculate the center of the image
    const imageX = rect.left + rect.width / 2;
    const imageY = rect.top + rect.height / 2;
    // Calculate the distance between the mouse and the center of the image
    const dx = mouseX - imageX;
    const dy = mouseY - imageY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Define the number of rows and columns in the grid
    const rows = 10;
    const columns = 10;
    // Calculate the size of each cell in the grid
    const cellWidth = rect.width / columns;
    const cellHeight = rect.height / rows;

    // Create a 2D array to store the positions of each cell in the grid
    const grid = [];
    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < columns; j++) {
        grid[i][j] = {
          x: j * cellWidth,
          y: i * cellHeight,
        };
      }
    }

    // Warp the image by modifying the positions of each cell in the grid
    if (distance < 100) {
      // If the mouse is within 100 pixels of the image, warp the image
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          // Calculate the distance between the cell and the mouse
          const cellX = grid[i][j].x + rect.left + cellWidth / 2;
          const cellY = grid[i][j].y + rect.top + cellHeight / 2;
          const dx = mouseX - cellX;
          const dy = mouseY - cellY;
          const cellDistance = Math.sqrt(dx * dx + dy * dy);
            // Create a string containing the modified positions of each cell in the grid
  let gridString = "";
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      gridString += `${grid[i][j].x.toFixed(1)},${grid[i][j].y.toFixed(1)} `;
    }
  }

  // Set the `grid` property of the image to the modified positions
  image.style.setProperty("--grid", gridString);
} else {
  // If the mouse is further than 100 pixels from the image, reset the image
  image.style.setProperty("--grid", "");
}
