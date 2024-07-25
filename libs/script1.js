const svgShapes = {
  pentagon:
    '<svg width="81" height="84" viewBox="0 0 81 84" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40.5 0L80.9199 31.7852L65.4809 83.2148H15.5191L0.0800972 31.7852L40.5 0Z"/></svg>',
  three:
    '<svg width="69" height="67" viewBox="0 0 69 67" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.6878 4.68056C30.229 -1.33351 38.771 -1.33351 40.3122 4.68056L44.303 20.2536C44.8725 22.4761 46.6597 24.1793 48.907 24.6413L63.411 27.6229C69.8001 28.9363 69.8001 38.0637 63.411 39.3771L48.907 42.3587C46.6597 42.8207 44.8725 44.5239 44.303 46.7464L40.3122 62.3194C38.771 68.3335 30.229 68.3335 28.6878 62.3194L24.697 46.7464C24.1275 44.5239 22.3403 42.8207 20.093 42.3587L5.58898 39.3771C-0.800131 38.0637 -0.800144 28.9363 5.58896 27.6229L20.093 24.6413C22.3403 24.1793 24.1275 22.4761 24.697 20.2536L28.6878 4.68056Z" fill="#98F690"/></svg>',
  circle:
    '<svg width="85" height="85" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="42.5" cy="42.5" r="42.5"/></svg>',
  star: '<svg width="85" height="89" viewBox="0 0 85 89" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42.5 0L55.3167 29.5755L84.822 33.8582L63.2378 56.4195L68.6564 88.6418L42.5 73.01L16.3436 88.6418L21.7622 56.4195L0.177986 33.8582L29.6833 29.5755L42.5 0Z" /></svg>',
  diamond:
    '<svg width="89" height="89" viewBox="0 0 89 89" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44.5 0L89 44.5L44.5 89L0 44.5L44.5 0Z"/></svg>',
  flower:
    '<svg width="66" height="68" viewBox="0 0 66 68" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.5104 8.68211C25.5872 -1.78433 40.4128 -1.78433 43.4896 8.68211C44.8577 13.3359 49.1286 16.5319 53.9793 16.5319H54.4281C65.3195 16.5319 70.1417 30.2383 61.6494 37.0578L59.8514 38.5017C56.1331 41.4875 54.5842 46.422 55.9292 50.9971L56.8245 54.0426C59.7988 64.16 47.9674 72.083 39.7448 65.4801C35.8048 62.3162 30.1952 62.3162 26.2552 65.4801C18.0326 72.083 6.20124 64.16 9.1755 54.0426L10.0708 50.9971C11.4158 46.422 9.86689 41.4875 6.14865 38.5017L4.35063 37.0578C-4.14165 30.2383 0.680456 16.5319 11.5719 16.5319H12.0207C16.8714 16.5319 21.1423 13.3359 22.5104 8.68211Z" /></svg>',
};
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
    [{ shape: "circle", color: "rgb(235, 54, 120)" }, null, null, null],
    [
      { shape: "pentagon", color: "rgb(235, 54, 120)" },
      { shape: "pentagon", color: "rgb(187, 233, 255)" },
      null,
      { shape: "pentagon", color: "rgb(61, 194, 236)" },
    ],
    [
      { shape: "star", color: "rgb(235, 54, 120)" },
      null,
      null,
      { shape: "star", color: "rgb(61, 194, 236)" },
    ],
    [{ shape: "flower", color: "rgb(235, 54, 120)" }, null, null, null],
  ],
  availableShapes: [
    { shape: "star", color: "rgb(152, 246, 144)" },
    { shape: "pentagon", color: "rgb(228, 255, 120)" },
    { shape: "circle", color: "rgb(234, 118, 253)" },
    { shape: "star", color: "rgb(242, 127, 127)" },
    { shape: "pentagon", color: "rgb(177, 175, 255)" },
    { shape: "star", color: "rgb(95, 247, 238)" },
    { shape: "pentagon", color: "rgb(108, 131, 255)" },
    { shape: "circle", color: "rgb(33, 156, 144)" },
    { shape: "star", color: "rgb(255, 199, 0)" },
    { shape: "flower", color: "rgb(187, 233, 255" },
  ],
};
let result = 2;
let itemSelected = null;
let itemRemoved = null;
let activeSolutionGrid = gridConfig.activeShapes;

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

function createButtons() {
  const buttonArea = document.getElementById("button-area");
  const submit = document.createElement("button");
  submit.id = "submit";
  submit.textContent = "submit";
  submit.onclick = () => {
    const answer = checkConditions(gridConfig.activeShapes); // Output: true or false based on the conditions
    if (answer) {
      showModal();
    } else {
      shakeGridContainer();
    }
    console.log(answer, activeSolutionGrid);
  };
  buttonArea.append(submit);

  const reset = document.createElement("button");
  reset.id = "reset";
  reset.textContent = "reset";
  buttonArea.append(reset);
}

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

function execute() {
  const gridDetails = createLayout(gridConfig);
  createButtons();
  console.log(gridDetails); // Logs the grid details
  populateShapesContainer(gridConfig.availableShapes);
}

function showModal() {
  const modal = document.getElementById("modal");
  const closeButton = document.querySelector(".close-button");
  const nextButton = document.getElementById("next-button");

  modal.style.display = "block";

  closeButton.onclick = function () {
    modal.style.display = "none";
  };

  nextButton.onclick = function () {
    // Logic to proceed to the next level
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function shakeGridContainer() {
  const gridContainer = document.getElementById("grid-container");
  gridContainer.classList.add("shake");

  setTimeout(() => {
    gridContainer.classList.remove("shake");
  }, 500); // Adjust the duration to match the shake animation duration
}

// Usage
execute(); // Creates a 4x4 grid and logs the grid details

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
