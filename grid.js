class Grid {
  constructor(width, height) {
    this.resolution = 20;
    this.width = width;
    this.height = height;
    this.cols = floor(this.width / this.resolution);
    this.rows = floor(this.height / this.resolution);
    this.items = new Array(this.cols);
  }

  make2DArray = () => {
    for (let x = 0; x < this.cols; x++) {
      this.items[x] = new Array(this.rows);
    }
  };

  populateGrid = () => {
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        let rand = floor(random(1));
        let alive;
        rand ? (alive = true) : (alive = false);
        this.items[x][y] = new Cell(alive);
      }
    }
    print(this.items);
  };

  clicked = () => {};
}
