p5.disableFriendlyErrors = true;

let grid;

function setup() {
  createCanvas(windowWidth/2, windowHeight/2);
  grid = new Grid(width, height);
  grid.make2DArray(grid.items);
  grid.make2DArray(grid.next);
  grid.populateGrid();
  grid.countNeighbors();
  grid.renderGrid();
}

function draw() {
  grid.countNeighbors();
  grid.runSimulation();
  grid.renderGrid();
}

function mousePressed() {
  grid.clicked(mouseX, mouseY);
  grid.countNeighbors();
  grid.renderGrid();
}
