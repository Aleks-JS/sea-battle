const shipData = [
  { size: 4, direction: 'row', startX: 10, startY: 345 },
  { size: 3, direction: 'row', startX: 10, startY: 390 },
  { size: 3, direction: 'row', startX: 120, startY: 390 },
  { size: 2, direction: 'row', startX: 10, startY: 435 },
  { size: 2, direction: 'row', startX: 88, startY: 435 },
  { size: 2, direction: 'row', startX: 167, startY: 435 },
  { size: 1, direction: 'row', startX: 10, startY: 480 },
  { size: 1, direction: 'row', startX: 55, startY: 480 },
  { size: 1, direction: 'row', startX: 100, startY: 480 },
  { size: 1, direction: 'row', startX: 145, startY: 480 },
];

class PreparationScene extends Scene {
  draggedShip = null;
  draggedOffsetX = 0;
  draggedOffsetY = 0;

  init() {
    this.manually();
  }
  start() {
    const { player } = this.app;

    document
      .querySelectorAll('.app-actions')
      .forEach((element) => element.classList.add('hidden'));

    document
      .querySelector('[data-scene="preparation"]')
      .classList.remove('hidden');

    const manualPlaceBtn = document.querySelector('[data-action="manually"]');
    const randomPlaceBtn = document.querySelector('[data-action="randomize"]');

    manualPlaceBtn.addEventListener('click', () => this.manually());
    randomPlaceBtn.addEventListener('click', () => this.randomize());
  }
  update() {
    const { mouse, player } = this.app;

    // хотим начать тянуть корабль
    if (!this.draggedShip && mouse.curLeftBtn && !mouse.prevLeftBtn) {
      const ship = player.ships.find((ship) => ship.isUnder(mouse));

      if (ship) {
        const shipRect = ship.div.getBoundingClientRect();

        this.draggedShip = ship;
        this.draggedOffsetX = mouse.x - shipRect.left;
        this.draggedOffsetY = mouse.y - shipRect.top;

        ship.x = null;
        ship.y = null;
      }
    }

    // Перетаскивание
    if (mouse.curLeftBtn && this.draggedShip) {
      const { left, top } = player.root.getBoundingClientRect();
      const x = mouse.x - left - this.draggedOffsetX;
      const y = mouse.y - top - this.draggedOffsetY;
      const el = this.draggedShip.div;

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    }

    // Бросание
    if (!mouse.curLeftBtn && this.draggedShip) {
      const ship = this.draggedShip;
      this.draggedShip = null;

      // координаты левой верхней точки корабля
      const { left, top } = ship.div.getBoundingClientRect();
      // ширина и высота игрового поля
      const { width, height } = player.cells[0][0].getBoundingClientRect();

      // точка приземления корабля в ближайшей ячейке
      const point = {
        x: left + width / 2,
        y: top + height / 2,
      };

      // проверка наличия ячейки, над которой бросаем элемент
      const cell = player.cells
        .flat()
        .find((cell) => isUnderPoint(point, cell));

      if (cell) {
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);

        player.removeShip(ship);
        player.addShip(ship, x, y);
      } else {
        player.removeShip(ship);
        player.addShip(ship);
      }
    }

    // Вращение
    if (this.draggedShip && mouse.delta) {
      this.draggedShip.toggleDirection();
    }

    if (player.complete) {
      document.querySelector('[data-computer="simple"]').disabled = false;
      document.querySelector('[data-computer="middle"]').disabled = false;
      document.querySelector('[data-computer="hard"]').disabled = false;
    } else {
      document.querySelector('[data-computer="simple"]').disabled = true;
      document.querySelector('[data-computer="middle"]').disabled = true;
      document.querySelector('[data-computer="hard"]').disabled = true;
    }
  }

  // вызов функции рандомного размещения кораблей
  randomize() {
    const { player } = this.app;

    player.randomize(ShipView);

    for (let i = 0; i < 10; i++) {
      const ship = player.ships[i];

      ship.startX = shipData[i].startX;
      ship.startY = shipData[i].startY;
    }
  }

  // выбор ручного размещения кораблей
  manually() {
    const { player } = this.app;

    player.removeAllShips();

    for (const { size, direction, startX, startY } of shipData) {
      const ship = new ShipView(size, direction, startX, startY);
      player.addShip(ship);
    }
  }
}
