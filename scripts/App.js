class App {
  player = null;
  opponent = null;

  constructor() {
    const player = new BattleFieldView();
    const opponent = new BattleFieldView();

    Object.assign(this, { player, opponent });

    document.querySelector('[data-side="player"]').append(player.root);
    document.querySelector('[data-side="opponent"]').append(opponent.root);
  }
}
