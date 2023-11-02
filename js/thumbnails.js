// Контейнер, куда будем складывать получившиеся миниатюры
const thumbnailContainer = document.querySelector('.pictures');

// Шаблон миниатюры
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Функция для создания одной миниатюры
const createThumbnail = ({ url, description, likes, comments }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  return thumbnail;
};

// Функция для создания заданного числа миниатюр и их отображения на странице
const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });
  thumbnailContainer.append(fragment);
};

export { renderThumbnails };
