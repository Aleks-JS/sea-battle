class ComputerScene extends Scene {
  start() {
    document
      .querySelectorAll('.app-actions')
      .forEach((element) => element.classList.add('hidden'));

    document
      .querySelector('[data-scene="computer"]')
      .classList.remove('hidden');
  }

  update() {
    const { mouse, opponent, player } = this.app;

    const cells = opponent.cells.flat();

    // when the cursor above a field
    if (isUnderPoint(mouse, opponent.table)) {
      const cell = cells.find((cell) => isUnderPoint(mouse, cell));

      cells.forEach((cell) =>
        cell.classList.remove('battlefield-item__active')
      );

      if (cell) {
        // on hover, the cell is painted over
        cell.classList.add('battlefield-item__active');

        // shot when clicking on a cell
        if (mouse.curLeftBtn && !mouse.prevLeftBtn) {
          const x = parseInt(cell.dataset.x);
          const y = parseInt(cell.dataset.y);

          const shot = new ShotView(x, y);
          opponent.addShot(shot);
        }
      }
    }
  }
}
