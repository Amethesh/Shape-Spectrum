let result = 2;
let itemSelected = null;
let itemRemoved = null;
let activeSolutionGrid = gridConfig[1].activeShapes;

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
      if (activeShapes[i][j] == null && activeGrids[i][j] == 1) {
        gridItem.style.cursor = "pointer";
        gridItem.onclick = () => {
          dropEvent(gridItem, itemSelected);
        };
      }

      container.appendChild(gridItem);
    }
  }
}

function dropEvent(gridItem, selectedImage) {
  const isAdded = gridItem.classList.contains("imgAdded");
  if (!isAdded && !selectedImage) return;
  const parser = new DOMParser();
  if (!isAdded && selectedImage) {
    selectedImage.remove();
    const svgString = selectedImage.innerHTML;
    let id = gridItem.id.split("-");
    const shapecolor = {
      shape: itemSelected.id,
      color: itemSelected.firstChild.style.fill,
    };

    activeSolutionGrid[parseInt(id[0])][parseInt(id[1])] = shapecolor;
    itemSelected = null;
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const svgElement = doc.documentElement;
    gridItem.classList.add("imgAdded");
    gridItem.innerHTML = ""; // Clear any existing content
    gridItem.appendChild(svgElement);
  } else if (isAdded) {
    const svgContainer = document.querySelector(".shapes-container");
    const removedSvgString = gridItem.innerHTML;
    const doc = parser.parseFromString(removedSvgString, "image/svg+xml");
    const removedSvgElement = doc.documentElement;
    const shapeWrapper = document.createElement("div");
    shapeWrapper.className = "shape-wrapper";
    shapeWrapper.appendChild(removedSvgElement);
    svgContainer.appendChild(shapeWrapper);
    gridItem.classList.remove("imgAdded");
    gridItem.innerHTML = "";
    let id = gridItem.id.split("-");

    activeSolutionGrid[parseInt(id[0])][parseInt(id[1])] = null;
  }
}

function populateShapesContainer(availableShapes) {
  const shapesContainer = document.querySelector(".shapes-container");

  availableShapes.forEach((shapeInfo) => {
    const shapeWrapper = document.createElement("div");
    shapeWrapper.className = "shape-wrapper";
    shapeWrapper.id = shapeInfo.shape;
    shapeWrapper.innerHTML = svgShapes[shapeInfo.shape];
    shapeWrapper.firstChild.style.fill = shapeInfo.color; // Set the color
    shapeWrapper.style.cursor = "pointer";
    shapeWrapper.onclick = () => {
      itemSelected = shapeWrapper;
    };
    shapesContainer.appendChild(shapeWrapper);
  });
}

function createButtons() {
  const buttonArea = document.getElementById("button-area");
  const submit = document.createElement("button");
  submit.id = "submit";
  submit.textContent = "submit";
  submit.onclick = () => {
    const answer = checkConditions(activeSolutionGrid);
    console.log(answer, activeSolutionGrid);
  };
  buttonArea.append(submit);

  const reset = document.createElement("button");
  reset.id = "reset";
  reset.textContent = "reset";
  buttonArea.append(reset);
}

function checkConditions(grid) {
  const rowCount = grid.length;
  const colCount = grid[0].length;
  let rowFlags = Array(rowCount).fill(false);
  let colFlags = Array(colCount).fill(false);

  // Check horizontal condition for all rows
  for (let i = 0; i < rowCount; i++) {
    let shapes = new Set();
    let colors = new Set();
    let nonNullCount = 0;
    for (let j = 0; j < colCount; j++) {
      if (grid[i][j]) {
        shapes.add(grid[i][j].shape);
        colors.add(grid[i][j].color);
        nonNullCount++;
      }
    }
    if (shapes.size === 1 && colors.size === nonNullCount) {
      rowFlags[i] = true;
    }
  }

  // Check vertical condition for all columns
  for (let j = 0; j < colCount; j++) {
    let shapes = new Set();
    let colors = new Set();
    let nonNullCount = 0;
    for (let i = 0; i < rowCount; i++) {
      if (grid[i][j]) {
        shapes.add(grid[i][j].shape);
        colors.add(grid[i][j].color);
        nonNullCount++;
      }
    }
    if (colors.size === 1 && shapes.size === nonNullCount) {
      colFlags[j] = true;
    }
  }

  // Check if all rows and columns satisfy the conditions
  if (
    rowFlags.every((flag) => flag === true) &&
    colFlags.every((flag) => flag === true)
  ) {
    return true;
  }

  return false;
}

function execute() {
  createLayout(gridConfig[1]);
  createButtons();
  populateShapesContainer(gridConfig[1].availableShapes);
}

// Usage
execute();
