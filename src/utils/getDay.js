import {MIN_RESERVATION_DAYS, PERIODS_MONTH_DAY} from "../config/envData";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // добавляем 0 перед числами меньше 10
  const day = String(date.getDate()).padStart(2, "0"); // добавляем 0 перед числами меньше 10
  return `${year}-${month}-${day}`;
};

export const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1)
      .padStart(2, "0"); // добавляем 0 перед числами меньше 10
  const day = String(today.getDate())
      .padStart(2, "0"); // добавляем 0 перед числами меньше 10
  return `${year}-${month}-${day}`;
};

export const getNextDay = () => {
  const today = new Date();
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + MIN_RESERVATION_DAYS); // Увеличиваем текущую дату на 3 дня
  const year = dayAfterTomorrow.getFullYear();
  const month = String(dayAfterTomorrow.getMonth() + 1)
      .padStart(2, "0"); // добавляем 0 перед числами меньше 10
  const day = String(dayAfterTomorrow.getDate())
      .padStart(2, "0"); // добавляем 0 перед числами меньше 10
  return `${year}-${month}-${day}`;
};

export const getPeriodWork = () => {
  const today = new Date();
  const month = today.getMonth();

  // Если месяц больше месяца конца сезона
  const year = month < 10 ? today.getFullYear() : today.getFullYear() + 1;
  const startDatePeriod = PERIODS_MONTH_DAY.firstPeriod.startDate;
  const endDatePeriod = PERIODS_MONTH_DAY.fourthPeriod.endDate;

  return {
    startSeason: formatDate(new Date(`${year}-${startDatePeriod}`)),
    endSeason: formatDate(new Date(`${year}-${endDatePeriod}`))
  }
}

// Функция на получение дат заезда(дата начала сезона) и дата выезда(дата начала сезона + MIN_RESERVATION_DAYS)
export const getDayStartSeason = () => {
  const today = new Date();
  const month = today.getMonth();

  // Если месяц больше месяца конца сезона
  const year = month < 10 ? today.getFullYear() : today.getFullYear() + 1;

  const startDatePeriod = PERIODS_MONTH_DAY.firstPeriod.startDate;
  const splitPeriod = startDatePeriod.split("-");
  const transformDayCheckOut = String(
      +splitPeriod[1] + MIN_RESERVATION_DAYS
  )
      .padStart(2, "0");

  const checkInDate = `${year}-${startDatePeriod}`;
  const checkOutDate = `${year}-${splitPeriod[0]}-${transformDayCheckOut}`;

  return {checkInDate, checkOutDate};
};

export const checkDateCorrectness = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;

  const {startDate: startDatePeriod} = PERIODS_MONTH_DAY.firstPeriod;
  const {endDate: endDatePeriod} = PERIODS_MONTH_DAY.fourthPeriod;

  const [startMonth, startDay] = startDatePeriod.split("-")
      .map(Number);
  const [endMonth, endDay] = endDatePeriod.split("-")
      .map(Number);

  if (month < startMonth || month > endMonth) return false;
  if (month === startMonth && day < startDay) return false;
  if (month === endMonth && day > endDay) return false;

  return true;
};

export const getLastDay = ({currentDate, currentMonth}) => {
  // Создаем новый объект Date для первого дня следующего месяца
  const nextMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 1);

  // Перемещаемся на предыдущий день, чтобы получить последний день текущего месяца
  nextMonth.setDate(nextMonth.getDate() - 1);

  // Получаем день (количество дней в текущем месяце)
  return nextMonth.getDate();
};

export const transformDateFormat = (dateString) => {
  if (dateString) {
    const parts = dateString.split("-");

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
};