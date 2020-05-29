p5.disableFriendlyErrors = true;

let grid;
let cnv;
let speed = null; // higher number = slower render speed
let isRunning = false;
let startingResolution;
let blurAmount = 255;
let camListenersActive = false;
let firstFrameExecuted = false;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight * 0.5, WEBGL);
  cnv.parent("canvas");
  background(200);
  startingResolution = windowWidth * (windowHeight * 0.5);
  grid = new Grid(width, height, 8);

  easycam = new Dw.EasyCam(this._renderer, {
    distance: 420,
  });

  lighting(); // need to light initial frame or else everything will be black
  grid.init("3D");
}

function draw() {
  if (!firstFrameExecuted) {
    background(200);
    lighting();
    grid.render3D();
    firstFrameExecuted = true;
  }

  if (!isRunning) {
    easycam.removeMouseListeners();
    lighting();
  } else {
    if (!camListenersActive) {
      easycam.attachMouseListeners();
      camListenersActive = false;
    }
    lighting();
    if (frameCount % speed === 0) {
      // ignore blur unless sufficiently high (confusing but low values = more blur)
      if (blurAmount < 255) {
        blur(blurAmount);
      } else {
        background(200);
      }

      stroke(0);
      grid.runSimulation("3D");
      let gen = generation.textContent;
      generation.textContent = Number(gen) + 1;
    }
  }
}

function mousePressed() {
  if (!isRunning) {
    grid.clicked(mouseX, mouseY);
    background(200);
    lighting();
    grid.render3D();
    grid.countNeighbors();
  }
}

function mouseDragged() {
  if (!isRunning) {
    // only run if mouse is within sketch bounds
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      grid.clicked(mouseX, mouseY);
      background(200);
      lighting();
      grid.render3D();
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
  // don't allow canvas to grow beyond initial size - prevents array out of bounds errors
  // it could be possible to recreate the arrays on resize (larger than initial size) for a more complete fix
  if (windowWidth * (windowHeight / 2) < startingResolution) {
    resizeCanvas(windowWidth, floor(windowHeight * 0.5));
    background(200);
    grid.resize(width, height);
  }
  easycam.setViewport([0, 0, width, height]);
  grid.render3D();
}

function blur(amount) {
  fill(200, amount);
  noStroke();
  push();
  // translate "blur" rect to the max height/depth of a given cell
  translate(0, 0, -271);
  // draw the background rect much larger than intrinsic canvas size to acct for zooming out...to an extent
  // @TODO convert camera rotation quaternion to euler angle and offset background rect
  // such that it's always perpendicular to the camera.
  rect(-width * 16, -height * 16, width * 32, height * 32);
  pop();
}

function lighting() {
  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;

  ambientLight(100);

  directionalLight(175, 175, 175, -locX, -locY, -10);
  directionalLight(175, 175, 175, locX, locY, 10);

  pointLight(175, 175, 175, locX, locY, 250);
  pointLight(175, 175, 175, locX, locY, -250);
}

// DOM stuff
const playBtn = document.querySelector("#playback");
const clearBtn = document.querySelector("#clear");
const reseed = document.querySelector("#reseed");
const speedSlider = document.querySelector("#speed");
const generation = document.querySelector("#generation");
const blurSlider = document.querySelector("#blur");

playBtn.addEventListener("click", () => {
  isRunning = !isRunning;
  if (isRunning) {
    playBtn.textContent = "stop";
  } else {
    playBtn.textContent = "start";
  }
});

clearBtn.addEventListener("click", () => {
  grid.clear("3D");
  background(200);
  isRunning = false;
  playBtn.textContent = "start";
  generation.textContent = 0;
});

reseed.addEventListener("click", () => {
  clear("3D");
  background(200);
  grid.reseed("3D");
});

// set initial speed
// invert range (low values = high speeds)
// 60 = max value + 1
speed = 61 - speedSlider.value;

speedSlider.addEventListener("input", (e) => {
  speed = 61 - e.target.value;
});

blurSlider.addEventListener("input", (e) => {
  blurAmount = 260 - Number(e.target.value);
});
