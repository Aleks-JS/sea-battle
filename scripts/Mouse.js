class Mouse {
  element = null;

  under = false; // registration of the position of the mouse cursor over the object
  prevUnder = false;

  x = null; // current coordinates
  y = null;

  prevX = null; // previous coordinates
  prevY = null;

  curLeftBtn = false; // left mouse button state
  prevLeftBtn = false;

  delta = 0; // mouse wheel scroll state
  prevDelta = 0;

  touchStart = null;
  prevTouchStart = null;

  touchMove = null;
  prevTouchMove = null;

  constructor(element) {
    this.element = element;

    const stateUpdate = (e) => {
      this.x = e.clientX;
      this.y = e.clientY;
      this.delta = 0;
      this.under = true;
    };

    // mouse event handlers
    element.addEventListener('pointermove', (e) => {
      this.tick();
      this.touchMove = true;
      stateUpdate(e);
    });
    element.addEventListener('pointerenter', (e) => {
      this.tick();

      stateUpdate(e);
    });
    element.addEventListener('pointerleave', (e) => {
      this.tick();

      stateUpdate(e);
      this.under = false;
    });
    element.addEventListener('pointerdown', (e) => {
      this.tick();
      this.touchStart = true;

      stateUpdate(e);

      // updating the state of the left mouse button
      if (e.button === 0) {
        this.curLeftBtn = true;
      }
    });
    element.addEventListener('pointerup', (e) => {
      this.tick();
      this.touchMove = false;
      this.touchStart = false;

      stateUpdate(e);

      // updating the state of the left mouse button
      if (e.button === 0) {
        this.curLeftBtn = false;
      }
    });
    element.addEventListener('wheel', (e) => {
      this.tick();

      this.x = e.clientX;
      this.y = e.clientY;
      // updating the mouse wheel state
      this.delta = e.deltaY > 0 ? 1 : -1;
      this.under = true;
    });

    // element.addEventListener('touchstart', (e) => {
    //   console.log(e);
    //   this.curTouchStart = true;
    //   this.curTouchStart = false;

    //   stateUpdate(e);
    // });

    // element.addEventListener('touchend', (e) => {
    //   console.log(e);

    //   this.curTouchMove = false;
    //   this.curTouchStart = false;
    //   stateUpdate(e);
    // });
  }

  // a method that will write the current state to the previous one
  tick() {
    this.prevX = this.x;
    this.prevY = this.y;
    this.prevUnder = this.under;
    this.prevLeftBtn = this.curLeftBtn;
    this.prevDelta = this.delta;
    this.prevTouchStart = this.touchStart;
    this.prevTouchMove = this.touchMove;
    this.delta = 0;
  }
}
