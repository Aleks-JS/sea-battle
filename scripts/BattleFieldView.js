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

  constructor() {
    super();

    const root = document.createElement('div');
    root.classList.add('battlefield');

    const table = document.createElement('div');
    table.classList.add('battlefield-table');

    const dock = document.createElement('div');
    dock.classList.add('battlefield-dock');

    const polygon = document.createElement('div');
    polygon.classList.add('battlefield-dock');

    Object.assign(this, { root, table, dock, polygon });
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
  addShip(ship) {
    if (!super.addShip(ship)) {
      return false;
    }

    this.dock.append(ship.div);

    if (ship.placed) {
    } else {
      ship.div.style.left = `${ship.startX}px`;
      ship.div.style.top = `${ship.startY}px`;
    }
    return true;
  }

  // проверка нахождения точки над игровым полем
  isUnder(point) {
    return isUnderPoint(point, this.root);
  }
}
