class BattleFieldView extends BattleField {
  // our app
  root = null;

  // battlefield
  polygon = null;

  // storage of all ships
  dock = null;

  // storage of all shots
  polygon = null;

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
    // this.root = root;
    // this.table = table;
    // this.dock = dock;
    // this.polygon = polygon;
    root.append(table, dock, polygon);
  }
}
