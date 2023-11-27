import { isEscapeKey } from './utils.js';

const COMMENTS_DISPLAY_COUNT = 5;

const photoModal = document.querySelector('.big-picture');
const body = document.querySelector('body');

const commentsList = photoModal.querySelector('.social__comments');
const commentsShownCount = photoModal.querySelector('.social__comment-shown-count');
const commentsTotalCount = photoModal.querySelector('.social__comment-total-count');
const commentsLoader = photoModal.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const photoModalCloseButton = photoModal.querySelector('.big-picture__cancel');

let commentsShownCounter = 0;
let comments = [];

const getComment = ({ avatar, message, name }) => {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  commentsShownCounter += COMMENTS_DISPLAY_COUNT;

  if (commentsShownCounter >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShownCounter = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShownCounter; i++) {
    const comment = getComment(comments[i]);
    fragment.append(comment);
  }
  commentsList.innerHTML = '';
  commentsList.append(fragment);
  commentsShownCount.textContent = commentsShownCounter;
  commentsTotalCount.textContent = comments.length;
};

const onCommentsLoaderClick = () => {
  renderComments();
};

const renderPhoto = ({ url, description, likes }) => {
  photoModal.querySelector('.big-picture__img img').src = url;
  photoModal.querySelector('.big-picture__img img').alt = description;
  photoModal.querySelector('.likes-count').textContent = likes;
  photoModal.querySelector('.social__caption').textContent = description;
};

const showPhotoModal = (photos) => {
  photoModal.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  comments = photos.comments;
  renderPhoto(photos);
  renderComments();
};

const hidePhotoModal = () => {
  photoModal.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsShownCounter = 0;
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onPhotoModalCloseButtonClick = () => {
  hidePhotoModal();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hidePhotoModal();
  }
}

photoModalCloseButton.addEventListener('click', onPhotoModalCloseButtonClick);
commentsLoader.addEventListener('click', onCommentsLoaderClick);

export { showPhotoModal };
