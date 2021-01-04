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

    // when the cursor above a field
    if (isUnderPoint(mouse, opponent.table)) {
      const cells = opponent.cells.flat();
      const cell = cells.find((cell) => isUnderPoint(mouse, cell));

      // on hover, the cell is painted over
      cells.forEach((cell) =>
        cell.classList.remove('battlefield-item__active')
      );
      cell.classList.add('battlefield-item__active');
    }
  }
}
