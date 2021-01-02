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
    const { player } = this.app;

    for (const { size, direction, startX, startY } of shipData) {
      const ship = new ShipView(size, direction, startX, startY);
      player.addShip(ship);
    }
  }
  start() {}
  update() {
    const { mouse, player } = this.app;

    // хотим начать тянуть корабль
    if (!this.draggedShip && mouse.curLeftBtn && !mouse.prevLeftBtn) {
      const ship = player.ships.find((ship) => ship.isUnder(mouse));

      if (ship) {
        const shipRect = ship.div.getBoundingClientRect();

        this.draggedShip = ship;
        this.draggedOffsetX = mouse.curX - shipRect.left;
        this.draggedOffsetY = mouse.curY - shipRect.top;
      }
    }

    // Перетаскивание
    if (mouse.curLeftBtn && this.draggedShip) {
      const { left, top } = player.root.getBoundingClientRect();
      const x = mouse.curX - left - this.draggedOffsetX;
      const y = mouse.curY - top - this.draggedOffsetY;
      const el = this.draggedShip.div;

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    }

    // Бросание
    if (!mouse.curLeftBtn && this.draggedShip) {
      this.draggedShip = null;
    }

    // Вращение
    if (this.draggedShip && mouse.delta) {
      this.draggedShip.toggleDirection();
    }
  }
  stop() {}
}
