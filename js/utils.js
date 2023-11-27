const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

export { isEscapeKey, debounce, getRandomIndex };
