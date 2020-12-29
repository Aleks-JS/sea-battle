const mouse = new Mouse(document.body);

// update state coordinates mouse
const tick = () => {
  requestAnimationFrame(tick);

  console.log(mouse.curX, mouse.prevX);
  mouse.tick();
};

requestAnimationFrame(tick);
