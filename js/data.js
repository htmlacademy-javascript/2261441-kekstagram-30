const REMOVE_MESSAGE_TIMEOUT = 5000;

const body = document.querySelector('body');
const dataErrorTemplate = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');

const showLoadError = () => {
  const errorMessage = dataErrorTemplate.cloneNode(true);
  body.append(errorMessage);
  setTimeout(() => errorMessage.remove(), REMOVE_MESSAGE_TIMEOUT);
};

//Получение данных от сервера
const createLoader = (onSuccess, onError) => () => fetch(
  'https://30.javascript.pages.academy/kekstagram/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    onSuccess(data);
  })
  .catch((err) => {
    onError(err);
  });

export { createLoader, showLoadError };
