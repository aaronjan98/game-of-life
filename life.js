let grid;

function setup() {
  createCanvas(600, 600);
  grid = new Grid(width, height);
  grid.make2DArray();
  grid.populateGrid();
  grid.renderGrid();
}

function draw() {}

function mousePressed() {
  grid.clicked(mouseX, mouseY);
  grid.renderGrid();
}
