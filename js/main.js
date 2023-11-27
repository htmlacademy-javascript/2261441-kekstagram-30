import { renderGallery, setGalleryListener } from './gallery.js';
import './image-upload-form.js';
import { getData } from './data.js';
import { showLoadErrorMessage } from './data-load-messages.js';
import { initFilters } from './filters.js';

// Отрисовываем галерею
getData((data) => {
  renderGallery(data);
  setGalleryListener(data);
  initFilters(data);
}, showLoadErrorMessage);
