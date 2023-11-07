const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Функция для создания одной миниатюры
const createThumbnail = ({ id, url, description, likes, comments }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

// Функция для создания заданного числа миниатюр и их отображения на странице
const renderThumbnails = (photos, container) => {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.append(thumbnail);
  });
  container.append(fragment);
};

export { renderThumbnails };

