// Функция для проверки длины строки
function validateInputLength(string, maxLength) {
  return string.length <= maxLength;
}

// Cтрока короче 20 символов
validateInputLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
validateInputLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
validateInputLength('проверяемая строка', 10); // false


// Функция для проверки, является ли строка палиндромом
function isPalindrome(string) {
  const initialString = string.replaceAll(' ', '').toLowerCase();
  const reversedString = [...initialString].reverse().join('');
  return reversedString === initialString;
}

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false
// Это палиндром
isPalindrome('Лёша на полке клопа нашёл '); // true


// Функция извлекает цифры из строки и возвращает их в виде целого положительного числа
function extractNumbers(input) {
  let result = '';
  const string = input.toString();
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
}

extractNumbers('2023 год'); // 2023
extractNumbers('ECMAScript 2022'); // 2022
extractNumbers('1 кефир, 0.5 батона'); // 105
extractNumbers('агент 007'); // 7
extractNumbers('а я томат'); // NaN
extractNumbers(2023); // 2023
extractNumbers(-1); // 1
extractNumbers(1.5); // 15
