class Cell {
  constructor(alive) {
    this.alive = alive;
    this.age = 0;
    this.neighborCount = 0;
  }

  kill = () => {
    this.alive = false;
  };

  reanimate = () => {
    this.alive = true;
  };

  toggle = () => {
    this.alive = !this.alive;
  };

  age = () => {
    this.age++;
  };
}
