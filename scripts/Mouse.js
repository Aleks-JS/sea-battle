class Mouse {
  element = null;

  under = false; // registration of the position of the mouse cursor over the object
  prevUnder = false;

  curX = null; // current coordinates
  curY = null;

  prevX = null; // previous coordinates
  prevY = null;

  curLeftBtn = false; // left mouse button state
  prevLeftBtn = false;

  delta = 0; // mouse wheel scroll state
  prevDelta = 0;

  constructor(element) {
    this.element = element;

    const stateUpdate = (e) => {
      this.curX = e.clientX;
      this.curY = e.clientY;
      this.delta = 0;
      this.under = true;
    };

    // mouse event handlers
    element.addEventListener('mousemove', (e) => {
      this.tick();

      stateUpdate(e);
    });
    element.addEventListener('mouseenter', (e) => {
      this.tick();

      stateUpdate(e);
    });
    element.addEventListener('mouseleave', (e) => {
      this.tick();

      stateUpdate(e);
      this.under = false;
    });
    element.addEventListener('mousedown', (e) => {
      this.tick();

      stateUpdate(e);

      // updating the state of the left mouse button
      if (e.button === 0) {
        this.curLeftBtn = true;
      }
    });
    element.addEventListener('mouseup', (e) => {
      this.tick();

      stateUpdate(e);

      // updating the state of the left mouse button
      if (e.button === 0) {
        this.curLeftBtn = false;
      }
    });
    element.addEventListener('wheel', (e) => {
      this.tick();

      this.curX = e.clientX;
      this.curY = e.clientY;
      // updating the mouse wheel state
      this.delta = e.deltaY > 0 ? 1 : -1;
      this.under = true;
    });
  }

  // a method that will write the current state to the previous one
  tick() {
    this.prevX = this.curX;
    this.prevY = this.curY;
    this.prevUnder = this.under;
    this.prevLeftBtn = this.curLeftBtn;
    this.prevDelta = this.delta;
    this.delta = 0;
  }
}
