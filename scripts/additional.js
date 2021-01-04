// метод получения случайного числа
function getRandomBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

// метод получения случайного элемента из переданных
const getRandomFrom = (...args) => {
  const index = Math.floor(Math.random() * args.length);
  return args[index];
};

// проверка нахождения точки над элементом
const isUnderPoint = (point, element) => {
  const { x, y } = point;
  const { left, top, width, height } = element.getBoundingClientRect();

  return left <= x && x <= left + width && top <= y && y <= top + height;
};

// навешиваем обработчик и возвращаем функцию удаления обработчика
const addEventListener = (element, ...args) => {
  element.addEventListener(...args);
  return () => element.removeEventListener(...args);
};
