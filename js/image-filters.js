const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const effectFilter = {
  [Effect.CHROME]: { style: 'grayscale', unit: '' },
  [Effect.SEPIA]: { style: 'sepia', unit: '' },
  [Effect.MARVIN]: { style: 'invert', unit: '%' },
  [Effect.PHOBOS]: { style: 'blur', unit: 'px' },
  [Effect.HEAT]: { style: 'brightness', unit: '' }
};

const effectSliderOptions = {
  [Effect.DEFAULT]: { min: 0, max: 100, step: 1 },
  [Effect.CHROME]: { min: 0, max: 1, step: 0.1 },
  [Effect.SEPIA]: { min: 0, max: 1, step: 0.1 },
  [Effect.MARVIN]: { min: 0, max: 100, step: 1 },
  [Effect.PHOBOS]: { min: 0, max: 3, step: 0.1 },
  [Effect.HEAT]: { min: 1, max: 3, step: 0.1 }
};

const imageEditor = document.querySelector('.img-upload__overlay');
const image = imageEditor.querySelector('.img-upload__preview img');
const effectsPanel = imageEditor.querySelector('.effects');
const sliderContainer = imageEditor.querySelector('.img-upload__effect-level');
const slider = sliderContainer.querySelector('.effect-level__slider');
const effectValueInput = sliderContainer.querySelector('.effect-level__value');

let chosenEffect = Effect.DEFAULT;

const isDefaultEffect = () => chosenEffect === Effect.DEFAULT;

const setImageStyle = () => {
  if (isDefaultEffect()) {
    image.style.filter = null;
    return;
  }

  const { value } = effectValueInput;
  const { style, unit } = effectFilter[chosenEffect];
  image.style.filter = `${style}(${value}${unit})`;
};

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

const onSliderUpdate = () => {
  effectValueInput.value = slider.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(slider, {
    range: { min, max },
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value)
    }
  });

  slider.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

const updateSlider = ({ min, max, step }) => {
  slider.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max
  });
};

const setSlider = () => {
  if (isDefaultEffect()) {
    hideSlider();
  } else {
    updateSlider(effectSliderOptions[chosenEffect]);
    showSlider();
  }
};

const setEffect = (effect) => {
  chosenEffect = effect;
  setSlider();
  setImageStyle();
};

const resetEffect = () => {
  setEffect(Effect.DEFAULT);
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};

const initEffect = () => {
  createSlider(effectSliderOptions[chosenEffect]);
  effectsPanel.addEventListener('change', onEffectsChange);
};

export { initEffect, resetEffect };
