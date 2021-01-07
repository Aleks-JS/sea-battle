class BattleFieldView extends BattleField {
  // our app
  root = null;

  // battlefield
  table = null;

  // storage of all ships
  dock = null;

  // storage of all shots
  polygon = null;

  // cells
  cells = [];

  // show ships on game field
  showShips = true;

  constructor(showShips = true) {
    super();

    const root = document.createElement('div');
    root.classList.add('battlefield');

    const table = document.createElement('table');
    table.classList.add('battlefield-table');

    const dock = document.createElement('div');
    dock.classList.add('battlefield-dock');

    const polygon = document.createElement('div');
    polygon.classList.add('battlefield-polygon');

    Object.assign(this, { root, table, dock, polygon, showShips });
    root.append(table, dock, polygon);

    // games table to battlefield
    for (let y = 0; y < 10; y++) {
      const row = [];
      const tr = document.createElement('tr');
      tr.classList.add('battlefield-row');
      tr.dataset.y = y;
      for (let x = 0; x < 10; x++) {
        const td = document.createElement('td');
        td.classList.add('battlefield-item');
        td.dataset.x = x;
        td.dataset.y = y;

        tr.append(td);
        row.push(td);
      }
      table.append(tr);
      this.cells.push(row);
    }

    /* markers for table */
    // horizontal markers
    for (let x = 0; x < 10; x++) {
      const cell = this.cells[0][x];
      const marker = document.createElement('div');

      marker.classList.add('marker', 'marker-column');
      marker.textContent = 'АБВГДЕЖЗИК'[x];
      cell.append(marker);
    }

    // vertical markers
    for (let y = 0; y < 10; y++) {
      const cell = this.cells[y][0];
      const marker = document.createElement('div');

      marker.classList.add('marker', 'marker-row');
      marker.textContent = y + 1;

      cell.append(marker);
    }
  }

  // init local method addShip
  addShip(ship, x, y) {
    if (!super.addShip(ship, x, y)) {
      return false;
    }

    if (this.showShips) {
      this.dock.append(ship.div);

      if (ship.placed) {
        // when the ship is above the playing field, rewrite the coordinates
        const cell = this.cells[y][x];
        const cellRect = cell.getBoundingClientRect();
        const rootRect = this.root.getBoundingClientRect();

        ship.div.style.left = `${cellRect.left - rootRect.left}px`;
        ship.div.style.top = `${cellRect.top - rootRect.top}px`;
      } else {
        ship.setDirection('row');
        ship.div.style.left = `${ship.startX}px`;
        ship.div.style.top = `${ship.startY}px`;
      }
    }
    return true;
  }

  removeShip(ship) {
    if (!super.removeShip(ship)) {
      return false;
    }

    // when the ship is in the dock, remove it from the dock
    if (Array.prototype.includes.call(this.dock.children, ship.div)) {
      ship.div.remove();
    }

    return true;
  }

  // проверка нахождения точки над игровым полем
  isUnder(point) {
    return isUnderPoint(point, this.root);
  }

  addShot(shot) {
    if (!super.addShot(shot)) {
      return false;
    }

    // add the visual part of the shot
    this.polygon.append(shot.div);

    // visualization of the cell after the shot, we calculate by coordinates
    const cell = this.cells[shot.y][shot.x];
    const cellRect = cell.getBoundingClientRect();
    const rootRect = this.root.getBoundingClientRect();

    shot.div.style.left = `${cellRect.left - rootRect.left}px`;
    shot.div.style.top = `${cellRect.top - rootRect.top}px`;

    return true;
  }

  // remove visual shot
  removeShot(shot) {
    if (!super.removeShot(shot)) {
      return false;
    }

    if (Array.prototype.includes.call(this.polygon.children, shot.div)) {
      shot.div.remove();
    }

    return true;
  }

  paintCells(field) {
    console.log(1);
    const matrix = this.matrix;
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        matrix[y][x].free && field[y][x].classList.add('free-cell');
        !matrix[y][x].free && field[y][x].classList.add('occupied-cell');
      }
    }
  }

  cleanPaintCells(field) {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        field[y][x].classList.contains('free-cell') &&
          field[y][x].classList.remove('free-cell');
        field[y][x].classList.contains('occupied-cell') &&
          field[y][x].classList.remove('occupied-cell');
      }
    }
  }
}
