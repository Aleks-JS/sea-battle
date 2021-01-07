const shipsDockedMax = [
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

const shipsDockedMedium = [
  { size: 4, direction: 'row', startX: 355, startY: -23 },
  { size: 3, direction: 'row', startX: 355, startY: 17 },
  { size: 3, direction: 'row', startX: 355, startY: 57 },
  { size: 2, direction: 'row', startX: 355, startY: 97 },
  { size: 2, direction: 'row', startX: 355, startY: 137 },
  { size: 2, direction: 'row', startX: 355, startY: 177 },
  { size: 1, direction: 'row', startX: 355, startY: 217 },
  { size: 1, direction: 'row', startX: 355, startY: 257 },
  { size: 1, direction: 'row', startX: 355, startY: 297 },
  { size: 1, direction: 'row', startX: 355, startY: 337 },
];

class PreparationScene extends Scene {
  draggedShip = null;
  draggedOffsetX = 0;
  draggedOffsetY = 0;
  placed = null;

  lastClientWidth = document.documentElement.clientWidth;
  shipData = shipsDockedMax;

  // все события, которые удалятся при завершении программы
  removeEventListeners = [];

  init() {
    this.manually();
  }
  start() {
    const { player, opponent } = this.app;

    // reset the data at start
    opponent.clear();
    player.removeAllShots();
    player.ships.forEach((ship) => (ship.killed = false));
    this.removeEventListeners = [];

    document
      .querySelectorAll('.app-actions')
      .forEach((element) => element.classList.add('hidden'));

    document
      .querySelector('[data-scene="preparation"]')
      .classList.remove('hidden');

    // получаем кнопки
    const manualPlaceBtn = document.querySelector('[data-action="manually"]');
    const randomPlaceBtn = document.querySelector('[data-action="randomize"]');
    const simpleBtn = document.querySelector('[data-computer="simple"]');
    const middleBtn = document.querySelector('[data-computer="middle"]');
    const hardBtn = document.querySelector('[data-computer="hard"]');

    this.removeEventListeners.push(
      addEventListener(manualPlaceBtn, 'click', () => this.manually())
    );

    this.removeEventListeners.push(
      addEventListener(randomPlaceBtn, 'click', () => this.randomize())
    );

    this.removeEventListeners.push(
      addEventListener(simpleBtn, 'click', () => this.startComputer('simple'))
    );

    this.removeEventListeners.push(
      addEventListener(middleBtn, 'click', () => this.startComputer('middle'))
    );

    this.removeEventListeners.push(
      addEventListener(hardBtn, 'click', () => this.startComputer('hard'))
    );
  }

  stop() {
    for (const removeEventListener of this.removeEventListeners) {
      removeEventListener();
    }

    this.removeEventListeners = [];
  }

  update() {
    const { mouse, player } = this.app;
    // ширина видимой части экрана
    const clientWidth = document.documentElement.clientWidth;
    // координаты левой верхней ячейки
    const rectFirstCell = player.cells[0][0].getBoundingClientRect();

    // ловим изменения ширины экрана
    if (clientWidth !== this.lastClientWidth) {
      this.manually();
      this.lastClientWidth = clientWidth;
    }

    if (!this.draggedShip && mouse.curLeftBtn && !mouse.prevLeftBtn) {
      // хотим начать тянуть корабль
      const ship = player.ships.find((ship) => ship.isUnder(mouse));

      if (ship) {
        const shipRect = ship.div.getBoundingClientRect();

        ship.getPlaceAlert(shipRect, rectFirstCell, ship);

        this.draggedShip = ship;
        this.placed = this.draggedShip.placed;
        this.draggedOffsetX = mouse.x - shipRect.left;
        this.draggedOffsetY = mouse.y - shipRect.top;

        ship.x = null;
        ship.y = null;
      }
      // добавляем тень
      ship && ship.addShadow();
    }

    // Перетаскивание
    if (mouse.curLeftBtn && this.draggedShip) {
      const fieldRect = player.root.getBoundingClientRect();
      const { left, top } = fieldRect;
      const x = mouse.x - left - this.draggedOffsetX;
      const y = mouse.y - top - this.draggedOffsetY;
      const el = this.draggedShip.div;
      const shipRect = el.getBoundingClientRect();
      // красим корабль, если под ним нет места для парковки
      this.draggedShip.getPlaceAlert(
        shipRect,
        fieldRect,
        this.draggedShip,
        this.windowRect
      );

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;

      player.paintCells(player.cells);
    }

    // Бросание
    if (!mouse.curLeftBtn && this.draggedShip) {
      const ship = this.draggedShip;
      this.draggedShip = null;
      this.placed = null;
      // ширина и высота ячейки
      const { width, height } = rectFirstCell;
      // координаты левой верхней точки корабля
      const { left, top } = ship.div.getBoundingClientRect();

      // точка приземления корабля в ближайшей ячейке
      const point = {
        x: left + width / 2,
        y: top + height / 2,
      };

      // удаляем тень
      ship.removeShadow();

      player.cleanPaintCells(player.cells);

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
        ship.removePlaceAlert();
        player.removeShip(ship);
        player.addShip(ship);
      }
    }

    // Вращение
    if (this.draggedShip && mouse.delta) {
      this.draggedShip.toggleDirection();
    }

    if (
      this.draggedShip &&
      mouse.touchStart &&
      !mouse.prevTouchStart &&
      !mouse.touchMove &&
      !mouse.prevTouchMove &&
      this.placed
    ) {
      this.draggedShip.toggleDirection();
    }

    if (player.complete) {
      // активация/деактивация кнопок выбора режима сложности в зависимости от укомплектованности кораблей
      document.querySelector('[data-computer="simple"]').disabled = false;
      document.querySelector('[data-computer="middle"]').disabled = false;
      document.querySelector('[data-computer="hard"]').disabled = false;
      document
        .querySelector('.title-difficulty')
        .classList.remove('inactive-title');
    } else {
      document.querySelector('[data-computer="simple"]').disabled = true;
      document.querySelector('[data-computer="middle"]').disabled = true;
      document.querySelector('[data-computer="hard"]').disabled = true;
      document
        .querySelector('.title-difficulty')
        .classList.add('inactive-title');
    }
  }

  // вызов функции рандомного размещения кораблей
  randomize() {
    const { player } = this.app;

    const clientWidth = document.documentElement.clientWidth;

    if (clientWidth <= 987) {
      this.shipData = shipsDockedMedium;
    } else if (clientWidth > 987) {
      this.shipData = shipsDockedMax;
    }

    player.randomize(ShipView);

    for (let i = 0; i < 10; i++) {
      const ship = player.ships[i];

      ship.startX = this.shipData[i].startX;
      ship.startY = this.shipData[i].startY;
    }
  }

  // выбор ручного размещения кораблей
  manually() {
    const { player } = this.app;

    player.removeAllShips();

    const clientWidth = document.documentElement.clientWidth;

    if (clientWidth <= 987) {
      this.shipData = shipsDockedMedium;
    } else if (clientWidth > 987) {
      this.shipData = shipsDockedMax;
    }

    for (const { size, direction, startX, startY } of this.shipData) {
      const ship = new ShipView(size, direction, startX, startY);
      player.addShip(ship);
    }
  }

  // выбор сложности компьютерного соперника
  startComputer(level) {
    console.log(level);

    // enemy difficulty settings
    const matrix = this.app.player.matrix;
    const withoutShipItem = matrix.flat().filter((item) => !item.ship);
    let untouchables = [];

    if (level === 'simple') {
    } else if (level === 'middle') {
      untouchables = getSeveralRandom(withoutShipItem, 20);
    } else if (level === 'hard') {
      untouchables = getSeveralRandom(withoutShipItem, 60);
    }

    this.app.start('computer', untouchables);
  }
}
