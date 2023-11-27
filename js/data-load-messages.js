import { isEscapeKey } from './utils';

const ERROR_MESSAGE_TIMEOUT = 5000;

const body = document.querySelector('body');
const loadErrorMessage = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');
const uploadSuccessMessage = document.querySelector('#success')
  .content
  .querySelector('.success');
const uploadErrorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

const showLoadErrorMessage = () => {
  body.append(loadErrorMessage);
  setTimeout(() => loadErrorMessage.remove(), ERROR_MESSAGE_TIMEOUT);
};

const showUploadMessage = (message, buttonClass) => {
  body.append(message);
  message
    .querySelector(buttonClass)
    .addEventListener('click', onUploadMessageButtonClick);
  body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideUploadMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onBodyClick);
};

function onUploadMessageButtonClick() {
  hideUploadMessage();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideUploadMessage();
  }
}

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideUploadMessage();
}

const showUploadSuccessMessage = () => {
  showUploadMessage(uploadSuccessMessage, '.success__button');
};

const showUploadErrorMessage = () => {
  showUploadMessage(uploadErrorMessage, '.error__button');
};

export { showLoadErrorMessage, showUploadErrorMessage, showUploadSuccessMessage };

