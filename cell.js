class Cell {
  constructor(alive) {
    this.alive = alive;
    this.age = 0;
    this.neighborCount = 0;
  }

  kill = () => {
    this.alive = false;
  };

  toggle = () => {
    this.alive = !this.alive;
  };

  age = () => {
    this.age++;
  };
}
