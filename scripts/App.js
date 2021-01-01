class App {
  mouse = null;
  player = null;
  opponent = null;

  scenes = {};

  constructor(scenes = {}) {
    const mouse = new Mouse(document.body);
    const player = new BattleFieldView();
    const opponent = new BattleFieldView();

    Object.assign(this, { mouse, player, opponent });

    document.querySelector('[data-side="player"]').append(player.root);
    document.querySelector('[data-side="opponent"]').append(opponent.root);

    // add scenes
    for (const [sceneName, SceneClass] of Object.entries(scenes)) {
      this.scenes[sceneName] = new SceneClass(sceneName, this);
    }

    // initial scenes
    for (const scene of Object.values(this.scenes)) {
      // scene.init();
    }

    requestAnimationFrame(() => this.tick());
  }

  tick() {
    requestAnimationFrame(() => this.tick());
    this.mouse.tick();
  }

  start() {}
}
