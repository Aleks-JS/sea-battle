class Ship {
  // parameters of ship
  size = null;
  direction = null;
  killed = false;
  x = null;
  y = null;

  // checking the ship on the playing field
  get placed() {
    return this.x !== null && this.y !== null;
  }

  constructor(size, direction) {
    this.size = size;
    this.direction = direction;
  }
}
