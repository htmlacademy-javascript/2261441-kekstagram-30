import { renderGallery } from './gallery.js';
import './image-upload-form.js';
import { getData, showLoadError } from './data.js';

// Отрисовываем галерею
getData(renderGallery, showLoadError);
