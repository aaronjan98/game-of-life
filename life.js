p5.disableFriendlyErrors = true;

let grid;
let cnv;
let speed = null; // higher number = slower render speed
let isRunning = false;

function setup() {
  cnv = createCanvas(windowWidth / 2, windowHeight / 2);
  cnv.parent("canvas");
  colorMode(HSB);
  grid = new Grid(width, height);
  grid.make2DArray(grid.items);
  grid.make2DArray(grid.next);
  grid.populateGrid();
  grid.countNeighbors();
  background(0);
  grid.renderGrid();
}

function draw() {
  if (isRunning) {
    if (frameCount % speed === 0) {
      background(0);
      grid.runSimulation();
      let gen = generation.textContent;
      generation.textContent = Number(gen) + 1;
    }
  }
}

function mousePressed() {
  if (!isRunning) {
    grid.clicked(mouseX, mouseY);
    grid.renderGrid();
    grid.countNeighbors();
  }
}

function mouseDragged() {
  if (!isRunning) {
    // only run if mouse is within sketch bounds
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      grid.clicked(mouseX, mouseY);
      grid.renderGrid();
    }
  }
}

function mouseReleased() {
  if (!isRunning) {
    // don't bother counting neighbors until user drawing is complete
    grid.countNeighbors();
  }
}

function windowResized() {
  resizeCanvas(floor(windowWidth * 0.5), floor(windowHeight * 0.5));
  background(0);
  grid.resize(width, height);
  grid.renderGrid();
}

// DOM stuff
const playBtn = document.querySelector("#playback");
const clearBtn = document.querySelector("#clear");
const reseed = document.querySelector("#reseed");
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
  background(0);
  isRunning = false;
  playBtn.textContent = "start";
  generation.textContent = 0;
});

reseed.addEventListener("click", () => {
  clear();
  background(0);
  grid.reseed();
});

// set initial speed
// invert range (low values = high speeds)
// 60 = max value + 1
speed = 61 - speedSlider.value;

speedSlider.addEventListener("input", (e) => {
  speed = 61 - e.target.value;
});
