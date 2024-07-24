const svgShapes = {
  star: '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="none" viewBox="0 0 200 200"><path d="m100 0 24.1 58.258L186.603 50 148.2 100l38.403 50-62.503-8.258L100 200l-24.1-58.258L13.397 150 51.8 100 13.398 50 75.9 58.258 100 0Z"></path></svg>',
  hexgon:
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="none" stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 24 24" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs"><path d="M12 9.25a2.751 2.751 0 0 0 0 5.5 2.751 2.751 0 0 0 0-5.5zm0 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm.376-9.497a.749.749 0 0 0-.752 0 3.748 3.748 0 0 0 0 6.494.749.749 0 0 0 .752 0 3.748 3.748 0 0 0 0-6.494zM12 2.824c.46.412.75 1.01.75 1.676s-.29 1.264-.75 1.676c-.46-.412-.75-1.01-.75-1.676s.29-1.264.75-1.676zm-7.799.797a.747.747 0 0 0-.531.531 3.748 3.748 0 0 0 4.592 4.592.75.75 0 0 0 .531-.531 3.748 3.748 0 0 0-4.592-4.592zm.845 1.376a2.248 2.248 0 0 1 2.371 2.371 2.248 2.248 0 0 1-2.371-2.371zm-3.744 6.578a.749.749 0 0 0 0 .752 3.748 3.748 0 0 0 6.494 0 .749.749 0 0 0 0-.752 3.748 3.748 0 0 0-6.494 0zm1.571.376c.412-.46 1.01-.75 1.676-.75s1.264.29 1.676.75c-.412.46-1.01.75-1.676.75s-1.264-.29-1.676-.75zm.797 7.799a.748.748 0 0 0 .531.531 3.748 3.748 0 0 0 4.592-4.592.75.75 0 0 0-.531-.531A3.748 3.748 0 0 0 3.67 19.75zm1.376-.845a2.248 2.248 0 0 1 2.371-2.371 2.248 2.248 0 0 1-2.371 2.371zm7.33-2.75a.749.749 0 0 0-.752 0 3.748 3.748 0 0 0 0 6.494.749.749 0 0 0 .752 0 3.75 3.75 0 0 0 0-6.494zM12 17.726c.46.412.75 1.01.75 1.676s-.29 1.264-.75 1.676c-.46-.412-.75-1.01-.75-1.676s.29-1.264.75-1.676zm3.738-2.568a.75.75 0 0 0-.531.531 3.748 3.748 0 0 0 4.592 4.592.748.748 0 0 0 .531-.531 3.748 3.748 0 0 0-4.592-4.592zm.845 1.376a2.248 2.248 0 0 1 2.371 2.371 2.248 2.248 0 0 1-2.371-2.371zm-.379-4.959a.749.749 0 0 0 0 .752 3.748 3.748 0 0 0 6.494 0 .749.749 0 0 0 0-.752 3.748 3.748 0 0 0-6.494 0zm1.571.376c.412-.46 1.01-.75 1.676-.75s1.264.29 1.676.75c-.412.46-1.01.75-1.676.75s-1.264-.29-1.676-.75zm-2.568-3.738a.75.75 0 0 0 .531.531 3.748 3.748 0 0 0 4.592-4.592.747.747 0 0 0-.531-.531 3.748 3.748 0 0 0-4.592 4.592zm1.376-.845a2.248 2.248 0 0 1 2.371-2.371 2.248 2.248 0 0 1-2.371 2.371z"></path></svg>',
  circle:
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="none" viewBox="0 0 200 200"><path d="M100 200c55.228 0 100-44.772 100-100S155.228 0 100 0 0 44.772 0 100s44.772 100 100 100Zm0-56.25c24.162 0 43.75-19.588 43.75-43.75S124.162 56.25 100 56.25 56.25 75.838 56.25 100s19.588 43.75 43.75 43.75Z" clip-rule="evenodd"></path></svg>',
};

function createLayout(gridConfig) {
  const { rowCount, columnCount, activeGrids, activeShapes, availableShapes } =
    gridConfig;

  // Create a container div
  const container = document.getElementById("grid-container");

  // Set CSS properties dynamically
  container.style.display = "grid";
  container.style.gridTemplateColumns = `repeat(${columnCount}, calc(5vh + 5vw))`;
  container.style.gridTemplateRows = `repeat(${rowCount}, calc(5vh + 5vw))`;
  container.style.gap = "3px";

  // Create grid items
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < columnCount; j++) {
      const gridItem = document.createElement("div");
      gridItem.className = "grid-item";
      gridItem.id = i + "-" + j;

      if (activeGrids[i][j] == 1) {
        gridItem.classList.add("active");
      }

      // Check if there is a shape in this cell
      if (activeShapes[i][j]) {
        const shapeInfo = activeShapes[i][j];
        gridItem.innerHTML = svgShapes[shapeInfo.shape];
        gridItem.firstChild.style.fill = shapeInfo.color; // Set the color
      }

      container.appendChild(gridItem);
    }
  }

  return {
    rowCount,
    columnCount,
    activeGrids,
    activeShapes,
    availableShapes,
  };
}

function populateShapesContainer(availableShapes) {
  const shapesContainer = document.querySelector(".shapes-container");

  availableShapes.forEach((shapeInfo) => {
    const shapeWrapper = document.createElement("div");
    shapeWrapper.className = "shape-wrapper";
    shapeWrapper.innerHTML = svgShapes[shapeInfo.shape];
    shapeWrapper.firstChild.style.fill = shapeInfo.color; // Set the color
    shapesContainer.appendChild(shapeWrapper);
  });
}

function execute() {
  const gridConfig = {
    rowCount: 4,
    columnCount: 4,
    activeGrids: [
      [1, 0, 0, 0],
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 1, 0, 0],
    ],
    activeShapes: [
      [{ shape: "star", color: "#EE4E4E" }, null, null, null],
      [
        null,
        { shape: "hexgon", color: "#BBE9FF" },
        { shape: "circle", color: "#219C90" },
        null,
      ],
      [null, null, null, { shape: "star", color: "#FFC700" }],
      [{ shape: "hexgon", color: "#8E3E63" }, null, null, null],
    ],
    availableShapes: [
      { shape: "star", color: "#EE4E4E" },
      { shape: "hexgon", color: "#BBE9FF" },
      { shape: "circle", color: "#219C90" },
      { shape: "star", color: "#FFC700" },
      { shape: "hexgon", color: "#8E3E63" },
      { shape: "star", color: "#EE4E4E" },
      { shape: "hexgon", color: "#BBE9FF" },
      { shape: "circle", color: "#219C90" },
      { shape: "star", color: "#FFC700" },
      { shape: "hexgon", color: "#8E3E63" },
    ],
  };

  const gridDetails = createLayout(gridConfig);
  console.log(gridDetails); // Logs the grid details
  populateShapesContainer(gridConfig.availableShapes);
}

// Usage
execute(); // Creates a 4x4 grid and logs the grid details
