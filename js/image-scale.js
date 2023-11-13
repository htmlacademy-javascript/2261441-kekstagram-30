const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;
const SCALE_STEP = 25;

const imageUploadForm = document.querySelector('.img-upload__form');
const imageZoomOutButton = imageUploadForm.querySelector('.scale__control--smaller');
const imageZoomInButton = imageUploadForm.querySelector('.scale__control--bigger');
const imageScaleInput = imageUploadForm.querySelector('.scale__control--value');
const imagePreview = imageUploadForm.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imagePreview.style.transform = `scale(${value / 100})`;
  imageScaleInput.value = `${value}%`;
};

const onImageZoomOutButtonClick = () =>
  scaleImage(Math.max(parseInt(imageScaleInput.value, 10) - SCALE_STEP, MIN_SCALE));

const onImageZoomInButtonClick = () =>
  scaleImage(Math.min(parseInt(imageScaleInput.value, 10) + SCALE_STEP, MAX_SCALE));

const resetScale = () => scaleImage(DEFAULT_SCALE);

imageZoomOutButton.addEventListener('click', onImageZoomOutButtonClick);
imageZoomInButton.addEventListener('click', onImageZoomInButtonClick);

export { resetScale };
