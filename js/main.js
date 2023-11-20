import { renderGallery } from './gallery.js';
import './image-upload-form.js';
import { createLoader, showLoadError } from './data.js';

// Отрисовываем галерею
const loadPictures = createLoader(renderGallery, showLoadError);
loadPictures();
