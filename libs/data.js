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
  1: {
    rowCount: 4,
    columnCount: 4,
    activeGrids: [
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 1, 1, 1],
    ],
    activeShapes: [
      [{ shape: "star", color: "red" }, null, null, null],
      [
        null,
        { shape: "hexgon", color: "#BBE9FF" },
        { shape: "circle", color: "green" },
        null,
      ],
      [null, null, null, { shape: "star", color: "yellow" }],
      [{ shape: "hexgon", color: "purple" }, null, null, null],
    ],
    availableShapes: [
      { shape: "star", color: "red" },
      { shape: "hexgon", color: "#BBE9FF" },
      { shape: "circle", color: "green" },
      { shape: "star", color: "yellow" },
      { shape: "hexgon", color: "purple" },
    ],
  },
  2: {
    rowCount: 3,
    columnCount: 3,
    activeGrids: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    activeShapes: [
      [null, { shape: "star", color: "yellow" }, null],
      [
        { shape: "circle", color: "red" },
        null,
        { shape: "circle", color: "green" },
      ],
      [null, { shape: "hexgon", color: "yellow" }, , null],
    ],
    availableShapes: [
      { shape: "circle", color: "yellow" },
      { shape: "star", color: "green" },
    ],
  },
  3: {
    rowCount: 5,
    columnCount: 5,
    activeGrids: [
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
    ],
    activeShapes: [
      [{ shape: "star", color: "red" }, null, null, null],
      [
        null,
        { shape: "hexgon", color: "#BBE9FF" },
        { shape: "circle", color: "green" },
        null,
      ],
      [null, null, null, { shape: "star", color: "yellow" }],
      [{ shape: "hexgon", color: "purple" }, null, null, null],
    ],
    availableShapes: [
      { shape: "star", color: "red" },
      { shape: "hexgon", color: "#BBE9FF" },
      { shape: "circle", color: "green" },
      { shape: "star", color: "yellow" },
      { shape: "hexgon", color: "purple" },
    ],
  },
  4: {
    rowCount: 4,
    columnCount: 4,
    activeGrids: [
      [1, 1, 1, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 1, 1, 1],
    ],
    activeShapes: [
      [{ shape: "star", color: "red" }, null, null, null],
      [
        null,
        { shape: "hexgon", color: "#BBE9FF" },
        { shape: "circle", color: "green" },
        null,
      ],
      [null, null, null, { shape: "star", color: "yellow" }],
      [{ shape: "hexgon", color: "purple" }, null, null, null],
    ],
    availableShapes: [
      { shape: "star", color: "red" },
      { shape: "hexgon", color: "#BBE9FF" },
      { shape: "circle", color: "green" },
      { shape: "star", color: "yellow" },
      { shape: "hexgon", color: "purple" },
    ],
  },
  5: {
    rowCount: 4,
    columnCount: 9,
    activeGrids: [
      [0, 0, 0, 0, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 0, 0, 0, 0],
    ],
    activeShapes: [
      [{ shape: "star", color: "red" }, null, null, null],
      [
        null,
        { shape: "hexgon", color: "#BBE9FF" },
        { shape: "circle", color: "green" },
        null,
      ],
      [null, null, null, { shape: "star", color: "yellow" }],
      [{ shape: "hexgon", color: "purple" }, null, null, null],
    ],
    availableShapes: [
      { shape: "star", color: "red" },
      { shape: "hexgon", color: "#BBE9FF" },
      { shape: "circle", color: "green" },
      { shape: "star", color: "yellow" },
      { shape: "hexgon", color: "purple" },
    ],
  },
  6: {
    rowCount: 4,
    columnCount: 5,
    activeGrids: [
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 1, 1, 1],
    ],
    activeShapes: [
      [{ shape: "star", color: "red" }, null, null, null],
      [
        null,
        { shape: "hexgon", color: "#BBE9FF" },
        { shape: "circle", color: "green" },
        null,
      ],
      [null, null, null, { shape: "star", color: "yellow" }],
      [{ shape: "hexgon", color: "purple" }, null, null, null],
    ],
    availableShapes: [
      { shape: "star", color: "red" },
      { shape: "hexgon", color: "#BBE9FF" },
      { shape: "circle", color: "green" },
      { shape: "star", color: "yellow" },
      { shape: "hexgon", color: "purple" },
    ],
  },
  7: {
    rowCount: 4,
    columnCount: 6,
    activeGrids: [
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 1, 1, 1],
    ],
    activeShapes: [
      [{ shape: "star", color: "red" }, null, null, null],
      [
        null,
        { shape: "hexgon", color: "#BBE9FF" },
        { shape: "circle", color: "green" },
        null,
      ],
      [null, null, null, { shape: "star", color: "yellow" }],
      [{ shape: "hexgon", color: "purple" }, null, null, null],
    ],
    availableShapes: [
      { shape: "star", color: "red" },
      { shape: "hexgon", color: "#BBE9FF" },
      { shape: "circle", color: "green" },
      { shape: "star", color: "yellow" },
      { shape: "hexgon", color: "purple" },
    ],
  },
};
