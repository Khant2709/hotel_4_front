// Функция для форматирования номера в вид +7 (XXX) XXX-XX-XX
export const formatPhoneNumberWithMask = (phone) => {
  const cleaned = phone.replace(/\D/g, '');

  return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
};

// Функция для преобразования номера в вид 7989XXXXXXX
export const formatPhoneNumberWithoutMask = (phone) => {
  const cleaned = phone.replace(/\D/g, '');

  return `7${cleaned.slice(1)}`;
};




export const formatPhoneNumber = (inputValue) => {
  // Удаление всех символов, кроме цифр, исключая плюс в начале номера
  const cleaned = inputValue.replace(/[^\d+]/g, '');
  // Применение маски к номеру телефона
  const match = cleaned.match(/^(\+7)?(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
  if (match) {
    let formattedPhoneNumber = match[1] || '+7'; // Если уже есть +7, то оставляем его, иначе добавляем +7

    formattedPhoneNumber += ' (' + match[2]; // Добавляем первые три цифры после +
    if (match[3]) { // Если есть следующие три цифры, добавляем их
      formattedPhoneNumber += ') ' + match[3];
    }
    if (match[4]) { // Если есть цифры после знака -, добавляем его и следующие две цифры
      formattedPhoneNumber += '-' + match[4];
    }
    if (match[5]) { // Если есть две цифры после второго знака -, добавляем их
      formattedPhoneNumber += '-' + match[5];
    }
    return formattedPhoneNumber;
  }
  return ''
};