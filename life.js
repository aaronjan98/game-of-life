p5.disableFriendlyErrors = true;

let grid;
let cnv;
let isRunning = false;

function setup() {
  cnv = createCanvas(windowWidth / 2, windowHeight / 2);
  cnv.parent("canvas");
  grid = new Grid(width, height);
  grid.make2DArray(grid.items);
  grid.make2DArray(grid.next);
  grid.populateGrid();
  grid.countNeighbors();
  grid.renderGrid();
}

function draw() {
  if (isRunning) {
    grid.countNeighbors();
    grid.runSimulation();
    grid.renderGrid();
  }
}

function mousePressed() {
  grid.clicked(mouseX, mouseY);
  grid.countNeighbors();
  grid.renderGrid();
}

function windowResized() {
  resizeCanvas(floor(windowWidth * 0.5), floor(windowHeight * 0.5));
  print(width, height);
  grid.resize(width, height);
  grid.renderGrid();
}

// DOM stuff
const playBtn = document.querySelector("#playback");
const clearBtn = document.querySelector("#clear");

playBtn.addEventListener("click", () => {
  isRunning = !isRunning;
  if (isRunning) {
    playBtn.textContent = "stop";
  } else {
    playBtn.textContent = "start";
  }
});

clearBtn.addEventListener("click", () => {
  grid.clear();
});
