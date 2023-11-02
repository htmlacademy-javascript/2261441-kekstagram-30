import { createphotoDescriptions } from './data.js';
import { renderThumbnails } from './thumbnails.js';

// Отрисовываем миниатюры на странице
renderThumbnails(createphotoDescriptions());
