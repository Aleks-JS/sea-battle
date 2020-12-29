class ShipView extends Ship {
  div = null;

  constructor(size, direction) {
    super(size, direction);

    const div = document.createElement('div');
    div.classList.add('ship');
  }
}
