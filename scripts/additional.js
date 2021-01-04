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

// получаем массив пустых ячеек на поле для уровня сложности противника
const getSeveralRandom = (arr = [], size) => {
  const array = arr.slice();

  if (size > array.length) size = array.length;

  const result = [];

  while (result.length < size) {
    const index = Math.floor(Math.random() * array.length);
    const item = array.splice(index, 1);
    result.push(item);
  }

  return result;
};
