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

  removePlaceAlert() {
    const div = this.div;
    div.classList.contains('ship-none-place') &&
      div.classList.remove('ship-none-place');
    return true;
  }

  getPlaceAlert(rectShip, rectField, curShip, windowRect) {
    const div = this.div;

    const { startX, startY } = curShip;

    const leftShip = rectShip.left;
    const rightShip = rectShip.right;
    const topShip = rectShip.top;
    const bottomShip = rectShip.bottom;

    const leftField = rectField.left;
    const rightField = rectField.right;
    const topField = rectField.top;
    const bottomField = rectField.bottom;

    const difference = topShip - startY;

    if (
      leftShip < startX + 45 &&
      leftShip > startX &&
      topShip - difference < startY + 45 &&
      topShip - difference > startY - 45
    ) {
      this.removePlaceAlert();
      return;
    }

    if (
      leftShip < leftField - 16 ||
      rightShip > rightField + 16 ||
      topShip < topField - 16 ||
      bottomShip > bottomField + 16
    ) {
      div.classList.add('ship-none-place');
      return true;
    } else {
      this.removePlaceAlert();
    }
  }
}
