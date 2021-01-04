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
          free: true,
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
      for (let y = ship.y - 1; y < ship.y + ship.size * dy + dx + 1; y++) {
        for (let x = ship.x - 1; x < ship.x + ship.size * dx + dy + 1; x++) {
          if (this.inField(x, y)) {
            const item = matrix[y][x];
            item.free = false;
          }
        }
      }
    }

    this.#matrix = matrix;
    this.#changed = false;
    return this.#matrix;
  }

  // checking the placement of all ships on the playing field
  get complete() {
    if (this.ships.length !== 10) {
      return false;
    }

    for (const ship of this.ships) {
      if (!ship.placed) {
        return false;
      }
    }

    return true;
  }

  // checking the location of the ship in the playing field
  inField(x, y) {
    const isNumber = (n) =>
      parseInt(n) === n && !isNaN(n) && ![Infinity, -Infinity].includes(n);

    if (!isNumber(x) || !isNumber(y)) {
      return false;
    }

    return 0 <= x && x < 10 && 0 <= y && y < 10;
  }

  // method of adding ship
  addShip(ship, x, y) {
    if (this.ships.includes(ship)) {
      return false;
    }

    this.ships.push(ship);

    if (this.inField(x, y)) {
      const dx = ship.direction === 'row';
      const dy = ship.direction === 'column';

      let placed = true;

      // checking whether the ship is within the playing field and checking adjacent cells to the ship
      for (let i = 0; i < ship.size; i++) {
        const cx = x + dx * i;
        const cy = y + dy * i;

        if (!this.inField(cx, cy)) {
          placed = false;
          break;
        }

        const item = this.matrix[cy][cx];
        if (!item.free) {
          placed = false;
          break;
        }
      }

      if (placed) {
        Object.assign(ship, { x, y });
      }
    }

    this.#changed = true;
    return true;
  }

  // ship removal method
  removeShip(ship) {
    if (!this.ships.includes(ship)) {
      return false;
    }

    const index = this.ships.indexOf(ship);
    this.ships.splice(index, 1);

    ship.x = null;
    ship.y = null;

    this.#changed = true;
    return true;
  }

  removeAllShips() {
    const ships = this.ships.slice();

    for (const ship of ships) {
      this.removeShip(ship);
    }

    return ships.length;
  }

  addShot() {
    this.#changed = true;
  }

  removeShot() {
    this.#changed = true;
  }

  removeAllShots() {
    const shots = this.shots.slice();

    for (const shot of shots) {
      this.removeShot(shot);
    }

    return shots.length;
  }

  // random placement of ships on the playing field
  randomize(ShipClass = Ship) {
    this.removeAllShips();

    for (let size = 4; size >= 1; size--) {
      for (let n = 0; n < 5 - size; n++) {
        const direction = getRandomFrom('row', 'column');
        const ship = new ShipClass(size, direction);

        while (!ship.placed) {
          const x = getRandomBetween(0, 9);
          const y = getRandomBetween(0, 9);

          this.removeShip(ship);
          this.addShip(ship, x, y);
        }
      }
    }
  }
}
