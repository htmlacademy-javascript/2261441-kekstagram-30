import { createIdGenerator } from './id-generator.mjs';
import { getRandomInteger, getRandomArrayElement } from './random.mjs';

const PHOTO_DESCRIPTION_COUNT = 25;
const COMMENT_MAX_COUNT = 30;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван',
  'Снежана',
  'Мария',
  'София',
  'Виктор',
  'Юлия',
  'Александр',
  'Андрей',
  'Никита',
  'Роман',
  'Ярослав',
  'Ксения',
  'Валентина',
  'Ольга'
];

const DESCRIPTIONS = [
  'Удачная фотка',
  'Атмосферно',
  'Нет слов)',
  'Красота!',
  'Что я вижу сейчас',
  'Зацените)',
  'Лучше один раз увидеть'
];

// Функция генерирует id фото
const generatePhotoId = createIdGenerator();

// Функция генерирует id комментария
const generateCommentId = createIdGenerator();

// Функция создает комментарий
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

// Функция создает описание к фотографии
const createPhotoDescription = () => {
  const photoId = generatePhotoId();
  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: getRandomInteger(0, COMMENT_MAX_COUNT) }, createComment),
  };
};

// Функция создает нужное количество описаний
const createphotoDescriptions = () => Array.from({ length: PHOTO_DESCRIPTION_COUNT }, createPhotoDescription);

export { createphotoDescriptions };
