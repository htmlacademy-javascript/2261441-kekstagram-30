// Функция проверяет длину строки
function validateInputLength(string, maxLength) {
  return string.length <= maxLength;
}

// Функция проверяет, является ли строка палиндромом
function isPalindrome(string) {
  const initialString = string.replaceAll(' ', '').toLowerCase();
  const reversedString = [...initialString].reverse().join('');
  return reversedString === initialString;
}

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

export { validateInputLength, isPalindrome, extractNumbers };
