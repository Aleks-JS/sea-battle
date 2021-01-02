class BattleField {
  ships = [];
  shots = [];

  #matrix = null;
  #changed = true;

  // matrix creation and change control
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
          ship: null,
          freeCell: true,
        };

        row.push(item);
      }
      matrix.push(row);
    }

    // checking the location of the ship
    for (const ship of this.ships) {
      if (!ship.placed) {
        continue;
      }
      const { x, y } = ship;
      // checking direction
      const dx = ship.direction === 'row';
      const dy = ship.direction === 'column';
      // write coordinates
      for (let i = 0; i < ship.size; i++) {
        const item = matrix[y + dy * i][x + dx * i];
        item.ship = ship;
      }

      // checking occupied cells

      // if (ship.direction === 'row') {
      //   for (let y = ship.y - 1; y < ship.y + 2; y++) {
      //     for (let x = ship.x - 1; x < ship.x + ship.size + 1; x++) {}
      //   }
      // } else {
      //   for (let y = ship.y - 1; y < ship.y + ship.size + 1; y++) {
      //     for (let x = ship.x - 1; x < ship.x + 2; x++) {}
      //   }
      // }

      // optimized
      for (let y = ship.y - 1; y < ship.y + ship.size * dy + dx; y++) {
        for (let x = ship.x - 1; x < ship.x + ship.size * dx + dy; x++) {
          if (this.inField(x, y)) {
            const item = matrix[y][x];
            item.freeCell = false;
          }
        }
      }
    }

    this.#matrix = matrix;
    this.#changed = true;
    return this.#matrix;
  }

  // checking the location of the ship in the playing field
  inField(x, y) {
    const isNumber = (n) => {
      parseInt(n) === n && !isNaN(n) && ![Infinity, -Infinity].includes(n);
    };

    if (!isNumber(x) || !isNumber(y)) {
      return false;
    }
    return 0 <= x && x < 10 && 0 <= y && y <= 0;
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
