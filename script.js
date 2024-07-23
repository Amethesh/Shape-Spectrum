function createGrid(x, y) {
  // Create a container div
  const container = document.createElement("div");
  container.className = "grid-container";

  // Set CSS properties dynamically
  container.style.display = "grid";
  container.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${y}, 1fr)`;
  container.style.gap = "3px";

  // Create grid items
  for (let i = 0; i < x * y; i++) {
    const gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridItem.innerText = i + 1; // Number the grid items
    container.appendChild(gridItem);
  }

  // Append the container to the body (or any other parent element)
  document.body.appendChild(container);
}

// Usage
createGrid(9, 9); // Creates a 4x5 grid
