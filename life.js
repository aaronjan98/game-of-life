p5.disableFriendlyErrors = true;

let grid;
let cnv;
let speed = null; // higher number = slower render speed
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
    if (frameCount % speed === 0) {
      grid.runSimulation();
      let gen = generation.textContent;
      generation.textContent = Number(gen) + 1;
    }
  }
}

function mousePressed() {
  if (!isRunning) {
    grid.clicked(mouseX, mouseY);
    grid.countNeighbors();
    grid.renderGrid();
  }
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
const speedSlider = document.querySelector("#speed");
const generation = document.querySelector("#generation");

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

// set initial speed
// invert range (low values = high speeds)
// 60 = max value + 1
speed = 61 - speedSlider.value;

speedSlider.addEventListener("input", (e) => {
  speed = 61 - e.target.value;
  print(speed);
});
