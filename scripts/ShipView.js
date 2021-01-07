class ShipView extends Ship {
  div = null;

  startX = null;
  startY = null;

  constructor(size, direction, startX, startY) {
    super(size, direction);

    const div = document.createElement('div');
    div.classList.add('ship');

    Object.assign(this, { div, startX, startY });

    // начальное размещение кораблей снизу поля
    this.setDirection(direction, true);
  }

  // проверка ориентации и размещение кораблей
  setDirection(newDirection, force = false) {
    if (!force && this.direction === newDirection) {
      return false;
    }

    this.div.classList.remove(`ship-${this.direction}-${this.size}`);

    this.direction = newDirection;

    this.div.classList.add(`ship-${this.direction}-${this.size}`);

    return true;
  }

  // метод для переворачивания
  toggleDirection() {
    const newDirection = this.direction === 'row' ? 'column' : 'row';
    this.setDirection(newDirection);
  }

  // проверка нахождения точки над кораблем
  isUnder(point) {
    return isUnderPoint(point, this.div);
  }

  addShadow() {
    !this.div.classList.contains('ship-shadow') &&
      this.div.classList.add('ship-shadow');
  }

  removeShadow() {
    this.div.classList.contains('ship-shadow') &&
      this.div.classList.remove('ship-shadow');
  }
}
