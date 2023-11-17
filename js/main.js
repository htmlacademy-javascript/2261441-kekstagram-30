import { createPhotos } from './data.js';
import { renderGallery } from './gallery.js';
import './image-upload-form.js';

// Отрисовываем галерею
renderGallery(createPhotos());
