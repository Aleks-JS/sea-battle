class ShotView extends Shot {
  div = null;

  constructor(x, y, variant) {
    super(x, y, variant);

    const div = document.createElement('div');
    div.classList.add('shot');

    this.div = div;
  }
}
