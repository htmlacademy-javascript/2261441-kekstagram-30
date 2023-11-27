import { resetScale } from './image-scale.js';
import { initEffect, resetEffect } from './image-filters.js';
import { sendData } from './data.js';
import { showUploadErrorMessage, showUploadSuccessMessage } from './data-load-messages.js';
import { isEscapeKey } from './utils.js';

const COMMENT_MAX_LENGTH = 140;
const HASHTAGS_MAX_COUNT = 5;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const body = document.querySelector('body');
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageEditor = imageUploadForm.querySelector('.img-upload__overlay');

const imagePreview = imageEditor.querySelector('.img-upload__preview img');
const effectPreviews = imageEditor.querySelectorAll('.effects__preview');

const imageEditorCloseButton = imageEditor.querySelector('.cancel');
const imageSubmitButton = imageEditor.querySelector('.img-upload__submit');

const hashtagsInput = imageUploadForm.querySelector('.text__hashtags');
const commentInput = imageUploadForm.querySelector('.text__description');

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
  const isTextInputInFocus = document.activeElement === commentInput || document.activeElement === hashtagsInput;
  const isErrorMessageShown = Boolean(document.querySelector('.error'));
  if (isEscapeKey(evt) && !isTextInputInFocus && !isErrorMessageShown) {
    evt.preventDefault();
    hideImageEditor();
  }
}

const isValidFileType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((type) => fileName.endsWith(type));
};

const onImageUploadFormChange = () => {
  const file = imageUploadInput.files[0];

  if (file && isValidFileType(file)) {
    imagePreview.src = URL.createObjectURL(file);
    effectPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${imagePreview.src}')`;
    });
  }
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

const blockImageSubmitButton = () => {
  imageSubmitButton.disabled = true;
  imageSubmitButton.textContent = 'Публикую...';
};

const unblockImageSubmitButton = () => {
  imageSubmitButton.disabled = false;
  imageSubmitButton.textContent = 'Опубликовать';
};

const setImageUploadFormSubmit = (onSuccess) => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockImageSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockImageSubmitButton();
          showUploadSuccessMessage();
        },
        () => {
          showUploadErrorMessage();
          unblockImageSubmitButton();
        },
        new FormData(evt.target)
      );
    }
  });
};

setImageUploadFormSubmit(hideImageEditor);

initEffect();

