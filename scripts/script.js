const app = new App({
  preparation: PreparationScene,
  computer: ComputerScene,
});

app.start('preparation');

// random placement of ships at the start of the program
document.querySelector('[data-action="randomize"]').click();
// start game to middle opponent after start program
// document.querySelector('[data-computer="middle"]').disabled = false;
// document.querySelector('[data-computer="middle"]').click();
