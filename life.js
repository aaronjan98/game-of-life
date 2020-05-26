let grid;

function setup() {
  createCanvas(600, 600);
  grid = new Grid(width, height);
  grid.make2DArray();
  grid.populateGrid();
  console.log(grid);
}

function draw() {}

function makeGrid() {}
