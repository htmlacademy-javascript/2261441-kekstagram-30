import { renderGallery } from './gallery.js';
import { debounce } from './utils.js';

// Показываем фильтры - только после загрузки
const MAX_RANDOM_PICTURES_COUNT = 10;

const filters = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');
const defaultButton = filterForm.querySelector('#filter-default');
const randomButton = filterForm.querySelector('#filter-random');
const discussedButton = filterForm.querySelector('#filter-discussed');

const FilterOptions = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const filterHandlers = {
  [FilterOptions.DEFAULT]: (data) => data,
  [FilterOptions.RANDOM]: (data) => {
    const randomIndexSet = [];
    const max = Math.min(MAX_RANDOM_PICTURES_COUNT, data.length);
    while (randomIndexSet.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexSet.includes(index)) {
        randomIndexSet.push(index);
      }
    }
    return randomIndexSet.map((index) => data[index]);
  },
  [FilterOptions.DISCUSSED]: (data) => [...data].sort((item1, item2) => item2.comments.length - item1.comments.length)
};

let currentFilter = FilterOptions.DEFAULT;

const setActiveFilter = (evt) => {
  const activeFilter = filterForm.querySelector('.img-filters__button--active');
  activeFilter.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const repaint = (evt, filter, data) => {
  if (currentFilter !== filter || filter === FilterOptions.RANDOM) {
    const filteredData = filterHandlers[filter](data);
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach((item) => item.remove());
    renderGallery(filteredData);
    currentFilter = filter;
  }
};

const debouncedRepaint = debounce(repaint);

const initFilters = (data) => {
  filters.classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', setActiveFilter);
  defaultButton.addEventListener('click', (evt) =>
    debouncedRepaint(evt, FilterOptions.DEFAULT, data));
  randomButton.addEventListener('click', (evt) =>
    debouncedRepaint(evt, FilterOptions.RANDOM, data));
  discussedButton.addEventListener('click', (evt) =>
    debouncedRepaint(evt, FilterOptions.DISCUSSED, data));
};

export { initFilters };
