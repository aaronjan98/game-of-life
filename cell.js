class Cell {
  constructor(alive) {
    this.alive = alive;
    this.age = 0;
  }

  kill = () => {
    this.alive = false;
  };

  age = () => {
    this.age++;
  };
}
