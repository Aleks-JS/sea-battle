class BattleField {
  ships = [];
  shots = [];

  #matrix = null;
  #changed = true;

  get matrix() {
    if (!this.#changed) {
      this.#matrix;
    }

    const matrix = [];

    for (let y = 0; y < 10; y++) {
      const row = [];
      for (let x = 0; x < 10; x++) {
        const item = {
          x,
          y,
        };

        row.push(item);
      }
      matrix.push(row);
    }

    this.#matrix = matrix;
    this.#changed = true;
    return this.#matrix;
  }

  // method of adding ship
  addShip(ship) {
    if (this.ships.includes(ship)) {
      return false;
    }

    this.ships.push(ship);
    return true;
  }

  // ship removal method
  removeShip(ship) {
    if (!this.ships.includes(ship)) {
      return false;
    }

    const index = this.ships.indexOf(ship);
    this.ships.splice(index, 1);
    return true;
  }

  removeAllShips() {
    const ships = this.ships.slice();

    for (const ship of ships) {
      this.removeShip(ship);
    }

    return ships.length;
  }

  addShot() {}

  removeShot() {}

  removeAllShots() {
    const shots = this.shots.slice();

    for (const shot of shots) {
      this.removeShot(shot);
    }

    return shots.length;
  }
}
