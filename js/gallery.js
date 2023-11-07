import { renderThumbnails } from './thumbnails.js';
import { showPhotoModal } from './photo-modal.js';

const thumbnailContainer = document.querySelector('.pictures');

// Отрисовка галереи
const renderGallery = (photos) => {
  thumbnailContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');

    if (!thumbnail) {
      return;
    }

    evt.preventDefault();

    const thumbnailId = +thumbnail.dataset.thumbnailId;
    const thumbnailPhoto = photos.find(({ id }) => id === thumbnailId);

    showPhotoModal(thumbnailPhoto);
  });
  renderThumbnails(photos, thumbnailContainer);
};

export { renderGallery };
