let result = 2;
let itemSelected = null;
let itemRemoved = null;
let level = 1;
let activeSolutionGrid = [];
let extraparameter = [];
let leveData = { attempts: [], answerArray: [], starttime: [], endTime: [] };
let isFirstLoad = true; // Add this flag
let attempts = 1;

function areAllActiveGridsFilled(grid, activeGrids) {
  for (let i = 0; i < activeGrids.length; i++) {
    for (let j = 0; j < activeGrids[i].length; j++) {
      if (
        activeGrids[i][j] === 1 &&
        (!grid[i][j] || !grid[i][j].shape || !grid[i][j].color)
      ) {
        return false;
      }
    }
  }
  return true;
}

function updateSubmitButtonState() {
  const submitButton = document.getElementById("submit");
  if (
    areAllActiveGridsFilled(activeSolutionGrid, gridConfig[level].activeGrids)
  ) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function dropEvent(gridItem, selectedImage) {
  const isAdded = gridItem.classList.contains("imgAdded");
  if (!isAdded && !selectedImage) return;
  const parser = new DOMParser();

  if (!isAdded && selectedImage) {
    const svgString = selectedImage.innerHTML;
    const shapeId = selectedImage.id;
    selectedImage.remove();

    let id = gridItem.id.split("-");
    const shapecolor = {
      shape: shapeId,
      color: selectedImage.firstChild.style.fill,
    };
    activeSolutionGrid[parseInt(id[0])][parseInt(id[1])] = shapecolor;
    itemSelected = null;

    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const svgElement = doc.documentElement;
    svgElement.id = shapeId;
    gridItem.classList.add("imgAdded");
    gridItem.innerHTML = "";
    gridItem.appendChild(svgElement);

    updateSubmitButtonState();
  } else if (isAdded) {
    const svgContainer = document.querySelector(".shapes-container");
    const removedSvgString = gridItem.innerHTML;
    const doc = parser.parseFromString(removedSvgString, "image/svg+xml");
    const removedSvgElement = doc.documentElement;
    const shapeId = removedSvgElement.id;
    const shapeWrapper = document.createElement("div");

    shapeWrapper.className = "shape-wrapper";
    shapeWrapper.id = shapeId;
    shapeWrapper.innerHTML = removedSvgElement.outerHTML;
    svgContainer.appendChild(shapeWrapper);

    gridItem.classList.remove("imgAdded");
    gridItem.innerHTML = "";

    let id = gridItem.id.split("-");
    activeSolutionGrid[parseInt(id[0])][parseInt(id[1])] = null;

    shapeWrapper.onclick = () => {
      itemSelected = shapeWrapper;
    };

    updateSubmitButtonState();
  }
}

function createButtons() {
  const buttonArea = document.getElementById("button-area");
  const submit = document.createElement("button");
  submit.id = "submit";
  submit.textContent = "Submit";
  submit.disabled = true; // Initially disabled
  submit.onclick = () => {
    const result = checkConditions(activeSolutionGrid) ? 1 : 0;
    if (result == 1) {
      leveData.endTime = "End time: " + new Date();
      leveData.attempts = attempts;
      leveData.answerArray = activeSolutionGrid;
      extraparameter.push(leveData);
      leveData = {
        attempts: [],
        answerArray: [],
        starttime: [],
        endTime: [],
      };
      console.log(extraparameter);
    }

    if (level <= 7) {
      showPopup(null, result);
    }
  };
  buttonArea.append(submit);

  const reset = document.createElement("button");
  reset.id = "reset";
  reset.textContent = "Reset";
  reset.onclick = () => {
    activeSolutionGrid = [];
    document.body.innerHTML = "";
    createIndex();
    execute(level);
  };
  buttonArea.append(reset);
}

function createLayout(gridConfig) {
  const { rowCount, columnCount, activeGrids, activeShapes, availableShapes } =
    gridConfig;

  const container = document.getElementById("grid-container");
  container.style.display = "grid";

  if (level <= 5) {
    // Set CSS properties dynamically
    container.style.gridTemplateColumns = `repeat(${columnCount}, calc(min(8vh , 8vw)))`;
    container.style.gridTemplateRows = `repeat(${rowCount}, calc(min(8vh , 8vw)))`;
  } else {
    // Set CSS properties dynamically
    container.style.gridTemplateColumns = `repeat(${columnCount}, calc(min(5vh , 5vw)))`;
    container.style.gridTemplateRows = `repeat(${rowCount}, calc(min(5vh , 5vw)))`;
  }
  container.style.gap = "3px";

  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < columnCount; j++) {
      const gridItem = document.createElement("div");
      gridItem.className = "grid-item";
      gridItem.id = i + "-" + j;

      if (activeGrids[i][j] === 1) {
        gridItem.classList.add("active");
      }

      if (activeShapes[i] && activeShapes[i][j]) {
        const shapeInfo = activeShapes[i][j];
        gridItem.innerHTML = svgShapes[shapeInfo.shape];
        gridItem.firstChild.style.fill = shapeInfo.color;
      } else if (activeGrids[i][j] === 1) {
        gridItem.style.cursor = "pointer";
        gridItem.onclick = () => {
          dropEvent(gridItem, itemSelected);
        };
      }

      container.appendChild(gridItem);
    }
  }
}

function populateShapesContainer(availableShapes) {
  const shapesContainer = document.querySelector(".shapes-container");
  shapesContainer.innerHTML = "";

  availableShapes.forEach((shapeInfo) => {
    const shapeWrapper = document.createElement("div");
    shapeWrapper.className = "shape-wrapper";
    shapeWrapper.id = shapeInfo.shape;
    shapeWrapper.innerHTML = svgShapes[shapeInfo.shape];
    shapeWrapper.firstChild.style.fill = shapeInfo.color;
    shapeWrapper.style.cursor = "pointer";
    shapesContainer.appendChild(shapeWrapper);
  });

  shapesContainer.addEventListener("click", (event) => {
    if (event.target.closest(".shape-wrapper")) {
      itemSelected = event.target.closest(".shape-wrapper");
    }
  });
}

function deepCopy(array) {
  return JSON.parse(JSON.stringify(array));
}

function shakeGridContainer() {
  const gridContainer = document.getElementById("grid-container");
  gridContainer.classList.add("shake");

  setTimeout(() => {
    gridContainer.classList.remove("shake");
  }, 500); // Adjust the duration to match the shake animation duration
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

function createIndex() {
  // Create header
  const header = document.createElement("h1");
  header.textContent = "ShapeSpectrum";

  // Create full container
  const fullContainer = document.createElement("div");
  fullContainer.className = "full-container";

  // Create grid container
  const gridContainer = document.createElement("div");
  gridContainer.className = "grid-container";
  gridContainer.id = "grid-container";

  // Create shapes container
  const shapesContainer = document.createElement("section");
  shapesContainer.className = "shapes-container";

  // Create button area
  const buttonArea = document.createElement("section");
  buttonArea.id = "button-area";

  // Append elements to full container
  fullContainer.append(gridContainer);
  fullContainer.append(shapesContainer);
  fullContainer.append(buttonArea);

  // Append elements to body
  document.body.append(header);
  document.body.append(fullContainer);
}

function showPopup(dynamicText, result) {
  const overlay = document.createElement("div");
  overlay.id = "overlay";

  const popup = document.createElement("section");
  popup.id = "popup";

  const buttonArea = document.createElement("section");
  buttonArea.id = "popupButton-area";

  const nextLevel = document.createElement("button");
  nextLevel.classList.add("button");
  if (dynamicText) {
    popup.textContent = dynamicText;
    nextLevel.textContent = "next";
    nextLevel.id = "next";
    nextLevel.onclick = () => {
      overlay.style.display = "none";
    };
  }
  if (result == 1) {
    popup.textContent = "congratulations! Move to next level :)";
    nextLevel.textContent = "next level";
    nextLevel.id = "next-level";
    nextLevel.onclick = () => {
      level++;
      document.body.innerHTML = "";
      createIndex();
      execute(level);
      attempts = 1;
      overlay.style.display = "none";
    };
  } else if (result == 0 && result != null) {
    shakeGridContainer();
    popup.textContent = "Oops! Try Again :(";
    nextLevel.textContent = "retry";
    nextLevel.id = "retry";
    nextLevel.onclick = () => {
      document.body.innerHTML = "";
      createIndex();
      execute(level);
      attempts++;
      console.log(attempts);
      overlay.style.display = "none";
    };
  }
  buttonArea.append(nextLevel);
  popup.append(buttonArea);

  overlay.append(popup);
  document.body.append(overlay);
}

function execute(level) {
  leveData.starttime = "Start time: " + new Date();
  activeSolutionGrid = deepCopy(gridConfig[level].activeShapes);
  createLayout(gridConfig[level]);
  createButtons();
  populateShapesContainer(gridConfig[level].availableShapes);
  if (isFirstLoad && level === 1) {
    // Show popups only on first load
    showPopup("Tap and Drop the correct shapes inside the grid");
    showPopup("Fill each horizontal with same shape and different color.");
    showPopup("Fill each vertical with the same color and different shape.");
    isFirstLoad = false; // Set the flag to false after showing popups
  }
}

// Usage
execute(level); // Creates a 4x4 grid and logs the grid details
