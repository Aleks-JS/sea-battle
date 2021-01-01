// метод получения случайного числа
const getRandomBetween = (min, max) => {
  return min + Math.floor(Math.random() + (max - min + 1));
};

// метод получения случайного элемента из переданных
const getRandomFrom = (...args) => {
  const index = Math.floor(Math.random() * args.length);
  return args[index];
};
