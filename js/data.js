//Получение данных от сервера
const getData = (onSuccess, onError) => {
  fetch(
    'https://30.javascript.pages.academy/kekstagram/data',
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
};

// Отправка данных на сервер
const sendData = (onSuccess, onFail, dataBody) => {
  fetch(
    'https://30.javascript.pages.academy/kekstagram/',
    {
      method: 'POST',
      body: dataBody
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .catch(() => onFail());
};

export { getData, sendData };
