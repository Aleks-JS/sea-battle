class App {
  mouse = null;
  player = null;
  opponent = null;

  scenes = {};
  activeScene = null;

  constructor(scenes = {}) {
    const mouse = new Mouse(document.body);
    const player = new BattleFieldView(true);
    const opponent = new BattleFieldView(false);

    Object.assign(this, { mouse, player, opponent });

    document.querySelector('[data-side="player"]').append(player.root);
    document.querySelector('[data-side="opponent"]').append(opponent.root);

    // add scenes
    for (const [sceneName, SceneClass] of Object.entries(scenes)) {
      this.scenes[sceneName] = new SceneClass(sceneName, this);
    }

    // initial scenes
    for (const scene of Object.values(this.scenes)) {
      scene.init();
    }

    requestAnimationFrame(() => this.tick());
  }

  tick() {
    requestAnimationFrame(() => this.tick());

    this.activeScene && this.activeScene.update();
    this.mouse.tick();
  }

  start(sceneName, ...args) {
    // если сцена с таким названием есть
    if (this.activeScene && this.activeScene.name === sceneName) {
      return false;
    }

    // если сцена не существует
    if (!this.scenes.hasOwnProperty(sceneName)) {
      return false;
    }

    // если есть запущенная сцена, то останавливаем её
    if (this.activeScene) {
      this.activeScene.stop();
    }

    const scene = this.scenes[sceneName];
    this.activeScene = scene;
    scene.start(...args);

    return true;
  }
}
