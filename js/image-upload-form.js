const COMMENT_MAX_LENGTH = 140;
const HASHTAGS_MAX_COUNT = 5;

const body = document.querySelector('body');
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageEditor = imageUploadForm.querySelector('.img-upload__overlay');
const imageEditorCloseButton = imageEditor.querySelector('.cancel');

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
  imageEditor.classList.add('hidden');
  body.classList.remove('modal-open');

  imageUploadForm.reset();

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  const isInFocus = (document.activeElement === commentInput || document.activeElement === hashtagsInput);
  if (evt.key === 'Escape') {
    if (isInFocus) {
      evt.stopPropagation();
    } else {
      evt.preventDefault();
      hideImageEditor();
    }
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

const validateHashtagsCount = (string) => {
  const hashtags = string.trim().split(' ');
  return hashtags.length <= HASHTAGS_MAX_COUNT;
};

const validateHashtags = (string) => {
  if (string.trim().length !== 0) {
    const hashtags = string.trim().split(' ');
    for (const hashtag of hashtags) {
      if (!hashtagPattern.test(hashtag)) {
        return false;
      }
    }
  }
  return true;
};

// Проверка на одинаковые элементы в массиве
const validateUniqueHashtags = (string) => {
  const hashtags = string.trim().split(' ');
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
  'Хэштеги не должнеы повторяться!'
);

pristine.addValidator(
  imageUploadForm.querySelector('.text__description'),
  validateComment,
  'Длина комментария не может быть больше 140 символов!'
);

// Блокировка отправки формы при ошибках
imageUploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
