import { renderGallery, setGalleryListener } from './gallery.js';
import './image-upload-form.js';
import { getData, showLoadError } from './data.js';
import { initFilters } from './filters.js';

// Отрисовываем галерею
getData((data) => {
  renderGallery(data);
  setGalleryListener(data);
  initFilters(data);
}, showLoadError);
