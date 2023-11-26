const body = document.querySelector('body');

// Сообщения при отправке формы
const uploadSuccessMessage = document.querySelector('#success')
  .content
  .querySelector('.success');
const uploadErrorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

const showMessage = (message, buttonClass) => {
  body.append(message);
  message
    .querySelector(buttonClass)
    .addEventListener('click', onMessageButtonClick);
  body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  body.removeEventListener('click', onBodyClick);
};

function onMessageButtonClick() {
  hideMessage();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideMessage();
  }
}

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}

const showUploadSuccessMessage = () => {
  showMessage(uploadSuccessMessage, '.success__button');
};

const showUploadErrorMessage = () => {
  showMessage(uploadErrorMessage, '.error__button');
};

export { showUploadErrorMessage, showUploadSuccessMessage };

