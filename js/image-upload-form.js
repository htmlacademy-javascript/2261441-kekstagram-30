import { resetScale } from './image-scale.js';
import { initEffect, resetEffect } from './image-filters.js';
import { sendData } from './data.js';

const COMMENT_MAX_LENGTH = 140;
const HASHTAGS_MAX_COUNT = 5;

const body = document.querySelector('body');
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageEditor = imageUploadForm.querySelector('.img-upload__overlay');
const imageEditorCloseButton = imageEditor.querySelector('.cancel');
const imageSubmitButton = imageEditor.querySelector('.img-upload__submit');

const hashtagsInput = imageUploadForm.querySelector('.text__hashtags');
const commentInput = imageUploadForm.querySelector('.text__description');

const uploadSuccessMessage = document.querySelector('#success')
  .content
  .querySelector('.success');
const uploadErrorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p'
});


const showImageEditor = () => {
  imageEditor.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideImageEditor = () => {
  imageUploadForm.reset();
  resetScale();
  resetEffect();
  pristine.reset();
  imageEditor.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  const isInFocus = (document.activeElement === commentInput || document.activeElement === hashtagsInput);
  if (evt.key === 'Escape' && !isInFocus) {
    evt.preventDefault();
    hideImageEditor();
  }
}

const onImageUploadFormChange = () => {
  showImageEditor();
};

const onImageEditorCloseButtonClick = () => {
  hideImageEditor();
};

imageUploadInput.addEventListener('change', onImageUploadFormChange);
imageEditorCloseButton.addEventListener('click', onImageEditorCloseButtonClick);

// Валидация формы
const normalizeHashtags = (string) =>
  string.trim().split(' ').filter((hashtag) => Boolean(hashtag.length));

const validateHashtagsCount = (string) => {
  const hashtags = normalizeHashtags(string);
  return hashtags.length <= HASHTAGS_MAX_COUNT;
};

const validateHashtags = (string) => {
  const hashtags = normalizeHashtags(string);
  for (const hashtag of hashtags) {
    if (!hashtagPattern.test(hashtag)) {
      return false;
    }
  }
  return true;
};

// Проверка на одинаковые элементы в массиве
const validateUniqueHashtags = (string) => {
  const hashtags = normalizeHashtags(string);
  const lowerCaseHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseHashtags);
  return lowerCaseHashtags.length === uniqueHashtags.size;
};

const validateComment = (string) => string.length < COMMENT_MAX_LENGTH;

pristine.addValidator(
  imageUploadForm.querySelector('.text__hashtags'),
  validateHashtagsCount,
  'Нельзя указать больше пяти хэш-тегов'
);

pristine.addValidator(
  imageUploadForm.querySelector('.text__hashtags'),
  validateHashtags,
  'Введён невалидный хэш-тег!'
);

pristine.addValidator(
  imageUploadForm.querySelector('.text__hashtags'),
  validateUniqueHashtags,
  'Хэштеги не должны повторяться!'
);

pristine.addValidator(
  imageUploadForm.querySelector('.text__description'),
  validateComment,
  'Длина комментария не может быть больше 140 символов!'
);

// Блокировка кнопки во время отправки формы
const blockImageSubmitButton = () => {
  imageSubmitButton.disabled = true;
  imageSubmitButton.textContent = 'Публикую...';
};

const unblockImageSubmitButton = () => {
  imageSubmitButton.disabled = false;
  imageSubmitButton.textContent = 'Опубликовать';
};

// Сообщения при отправке формы
const showUploadSuccess = () => {
  body.append(uploadSuccessMessage);

  const successButton = uploadSuccessMessage.querySelector('.success__button');
  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onDocumentSuccessKeydown);
};

const showUploadError = () => {
  body.append(uploadErrorMessage);

  const errorButton = uploadErrorMessage.querySelector('.error__button');
  errorButton.addEventListener('click', onErrorButtonClick);
};

const hideUploadSuccess = () => {
  uploadSuccessMessage.remove();
};

const hideUploadError = () => {
  uploadErrorMessage.remove();
};

function onSuccessButtonClick() {
  hideUploadSuccess();
}

function onErrorButtonClick() {
  hideUploadError();
}

function onDocumentSuccessKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    hideUploadSuccess();
  }
}

// Отправка формы
const setImageUploadFormSubmit = (onSuccess) => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockImageSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockImageSubmitButton();
          showUploadSuccess();
        },
        () => {
          showUploadError();
          unblockImageSubmitButton();
        },
        new FormData(evt.target)
      );
    }
  });
};

setImageUploadFormSubmit(hideImageEditor);

initEffect();

