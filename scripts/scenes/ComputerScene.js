class ComputerScene extends Scene {
  untouchables = [];
  playerTurn = true;
  status = null;

  init() {
    this.status = document.querySelector('.battlefield-status');
  }

  start(untouchables) {
    const { opponent } = this.app;

    document
      .querySelectorAll('.app-actions')
      .forEach((element) => element.classList.add('hidden'));

    document
      .querySelector('[data-scene="computer"]')
      .classList.remove('hidden');

    opponent.clear();
    opponent.randomize(ShipView);

    // transfer the number of cells on which the enemy will not fire
    this.untouchables = untouchables;
  }

  update() {
    const { mouse, opponent, player } = this.app;

    // determine the end of the game
    const isEnd = opponent.lost || player.lost;
    console.log(opponent.lost, player.lost);
    if (isEnd) {
      opponent.lost
        ? (this.status.textContent = 'Вы выиграли!')
        : (this.status.textContent = 'Вы проиграли((');
      return;
    }

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
        if (this.playerTurn && mouse.curLeftBtn && !mouse.prevLeftBtn) {
          const x = parseInt(cell.dataset.x);
          const y = parseInt(cell.dataset.y);

          const shot = new ShotView(x, y);
          const result = opponent.addShot(shot);

          // move order control
          if (result) {
            this.playerTurn = shot.variant === 'miss' ? false : true;
          }
        }
      }
    }

    // computer opponent's move
    if (!this.playerTurn) {
      const x = getRandomBetween(0, 9);
      const y = getRandomBetween(0, 9);

      // check of a shot in a non-touching cell
      let inUntouchables = false;
      const { matrix } = player;
      for (const item of this.untouchables) {
        if ((item[0].x === x && item[0].y === y) || matrix[y][x].shouted) {
          inUntouchables = true;
        }
      }

      if (!inUntouchables) {
        const shot = new ShotView(x, y);
        const result = player.addShot(shot);

        if (result) {
          this.playerTurn = shot.variant === 'miss' ? true : false;
        }
      }
    }

    // changed order status
    this.playerTurn
      ? (this.status.textContent = 'Ваш ход')
      : (this.status.textContent = 'Ход компьютера');
  }
}
