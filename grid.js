class Grid {
  constructor(width, height) {
    this.resolution = 5;
    this.width = width;
    this.height = height;
    this.cols = floor(this.width / this.resolution);
    this.rows = floor(this.height / this.resolution);
    this.items = new Array(this.cols);
    this.next = new Array(this.cols);
  }

  init = (dimensions) => {
    this.setMinimumDensity();
    this.make2DArray(this.items);
    this.make2DArray(this.next);
    this.populateGrid();
    this.countNeighbors();
    if (dimensions === "3D") {
      background(200);
      this.render3D();
    } else {
      background(0);
      this.render();
    }
  };

  setMinimumDensity = () => {
    if (this.cols * this.rows <= 10000) {
      this.resolution = 3;
      this.cols = floor(this.width / this.resolution);
      this.rows = floor(this.height / this.resolution);
    }
  };

  make2DArray = (arr) => {
    for (let x = 0; x < this.cols; x++) {
      arr[x] = new Array(this.rows);
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

  render = () => {
    this.loopRunner((x, y, w, h) => {
      if (this.items[x][y].alive) {
        // color cell by age (red = new, blue = old)
        fill(this.items[x][y].age, 100, 100);
        rect(w, h, this.resolution);
      }
      // this.debug(x, y, w, h);
    });
  };

  render3D = () => {
    colorMode(HSB);
    this.loopRunner((x, y, w, h) => {
      if (this.items[x][y].alive) {
        shininess(100);
        // color cell by age (red = new, blue = old)
        specularMaterial(this.items[x][y].age, 100, 100);
        push();
        translate(w - width / 2, h - height / 2);
        box(this.resolution, this.resolution, this.items[x][y].age * 2);
        pop();
      }
    });
    colorMode(RGB);
  };

  clicked = (mouseX, mouseY) => {
    this.loopRunner((x, y, w, h) => {
      // check if mousePressed location is within bounds
      if (
        mouseX > w &&
        mouseX < w + this.resolution &&
        mouseY > h &&
        mouseY < h + this.resolution
      ) {
        this.items[x][y].kill();
        this.items[x][y].toggle();
      }
    });
  };

  countNeighbors = () => {
    this.loopRunner((x, y) => {
      // reset neighborCount
      this.items[x][y].neighborCount = 0;

      // loop over adjacent cells +/- 1
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          // use modulo to wrap around for edge cells
          let col = (x + i + this.cols) % this.cols;
          let row = (y + j + this.rows) % this.rows;

          // omit self from count
          if (i !== 0 || j !== 0) {
            // only count live neighbors
            if (this.items[col][row].alive === true) {
              this.items[x][y].neighborCount++;
            }
          }
        }
      }
    });
  };

  runSimulation = (dimensions) => {
    this.countNeighbors();
    this.next = this.items;
    this.loopRunner((x, y, w, h) => {
      let cell = this.items[x][y];

      // underpopulation
      if (cell.alive && cell.neighborCount < 2) {
        this.next[x][y] = new Cell(false);
      }
      // overpopulation
      else if (cell.alive && cell.neighborCount > 3) {
        this.next[x][y] = new Cell(false);
      }
      // reproduction
      else if (!cell.alive && cell.neighborCount === 3) {
        this.next[x][y] = new Cell(true);
      }
      // lives on
      else {
        // only advance age once every 5 frames (otherwise color animation is too fast)
        if (frameCount % 5 === 0) {
          // clamp age at 270 (prevent it from going back towards red)
          if (this.next[x][y].age <= 270) {
            this.next[x][y].age += 1;
          }
        }
      }
    });

    this.items = this.next;
    dimensions === "3D" ? this.render3D() : this.render();
  };

  resize = (w, h) => {
    this.width = w;
    this.height = h;
    this.cols = floor(this.width / this.resolution);
    this.rows = floor(this.height / this.resolution);
  };

  clear = (dimensions) => {
    this.loopRunner((x, y) => {
      this.items[x][y].kill();
    });
    dimensions === "3D" ? this.render3D() : this.render();
  };

  reseed = (dimensions) => {
    this.clear();
    this.populateGrid();
    dimensions === "3D" ? this.render3D() : this.render();
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

  debug = (x, y, w, h) => {
    fill(255);
    text(`${x},${y}`, x + w, y + h + 10);
    fill(0, 255, 0);
    text(
      `${this.items[x][y].neighborCount}`,
      x + w + this.resolution / 2,
      y + h + this.resolution / 2
    );
  };
}
