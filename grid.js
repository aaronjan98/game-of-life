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
    this.loopRunner((x, y) => {
      let rand = floor(random(2));
      let alive;
      rand ? (alive = true) : (alive = false);
      this.items[x][y] = new Cell(alive);
    });
  };

  renderGrid = () => {
    this.loopRunner((x, y, w, h) => {
      if (this.items[x][y].alive) {
        fill(255);
        rect(w, h, this.resolution);
      } else {
        fill(0);
        rect(w, h, this.resolution);
      }
    });
  };

  clicked = (mouseX, mouseY) => {
    this.loopRunner((x, y, w, h) => {
      if (
        mouseX > w &&
        mouseX < w + this.resolution &&
        mouseY > h &&
        mouseY < h + this.resolution
      ) {
        this.items[x][y].toggle();
      }
    });
  };

  loopRunner = (callback) => {
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        let w = x * this.resolution;
        let h = y * this.resolution;
        callback(x, y, w, h);
      }
    }
  };
}
