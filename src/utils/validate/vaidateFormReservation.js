import {MIN_RESERVATION_DAYS, PERIODS_MONTH_DAY} from "../../config/envData";
import {transformDateFormat} from "../getDay";


export const validateDataReservation = ({today, startDate, endDate}) => {
  const oneDay = 86400000;
  const timeCheckIn = 10800000;

  if (today > startDate) {
    return {error: true, text: "Вы установили не корректную дату в заезде"};
  }

  if (startDate > endDate) {
    return {error: true, text: "Дата заезда не может быть позже даты везда"};
  }

  if (endDate < startDate) {
    return {error: true, text: "Дата везда не может быть раньше даты везда"};
  }

  if (startDate + oneDay * MIN_RESERVATION_DAYS - timeCheckIn > endDate) {
    return {
      error: true,
      text: `Минимальная бронь ${MIN_RESERVATION_DAYS} ночи`,
    };
  }

  const startDateReservation = new Date(startDate);
  const endDateReservation = new Date(endDate);
  const currentYear = startDateReservation.getFullYear();
  const startSeason = `${currentYear}-${PERIODS_MONTH_DAY.firstPeriod.startDate}`;
  const endSeason = `${currentYear}-${PERIODS_MONTH_DAY.fourthPeriod.endDate}`;

  if (startDateReservation.getFullYear() !== endDateReservation.getFullYear()) {
    return {
      error: true,
      text: "Бронирование должно быть в пределах одного года",
    };
  }

  if (
      startDateReservation < new Date(startSeason) ||
      endDateReservation > new Date(endSeason)
  ) {
    return {
      error: true,
      text: `Отель начинает сезон с ${transformDateFormat(
          startSeason
      )} и заканчивает ${transformDateFormat(endSeason)}`,
    };
  }

  return {error: false, text: null};
};

export const validateCountPeopleReservation = ({countPeople, limitPeople}) => {
  if (countPeople > limitPeople) {
    return {
      error: true,
      text: `Максимальное число гостей ${limitPeople}`,
    };
  } else {
    return {error: false, text: null};
  }
};

export const validateBookingDate = ({filterBooking, startDate, endDate}) => {
  startDate.setHours(15, 0, 0, 0);
  endDate.setHours(12, 0, 0, 0);

  const timeStartDate = startDate.getTime();
  const timeEndDate = endDate.getTime();

  const result = filterBooking.some((booking) => {
    const bookingStartDate = new Date(booking.start_date);
    bookingStartDate.setHours(15, 0, 0, 0);

    const bookingEtartDate = new Date(booking.end_date);
    bookingEtartDate.setHours(12, 0, 0, 0);

    const startDataBooking = bookingStartDate.getTime();
    const endDataBooking = bookingEtartDate.getTime();

    // Проверяем, что начало выбранного периода не попадает внутрь уже забронированного интервала
    const startsInside =
        timeStartDate >= startDataBooking && timeStartDate < endDataBooking;
    // Проверяем, что конец выбранного периода не попадает внутрь уже забронированного интервала
    const endsInside =
        timeEndDate > startDataBooking && timeEndDate <= endDataBooking;
    // Проверяем, что начало и конец выбранного периода не находятся внутри уже забронированного интервала
    const isInside =
        timeStartDate >= endDataBooking || timeEndDate <= startDataBooking;

    // Проверяем, что выбранный период не пересекается с уже забронированным
    if (startsInside || endsInside || !isInside) {
      return true;
    } else {
      return false;
    }
  });

  if (result) {
    return {error: true, text: "На выбранную дату место занято"};
  }

  return {error: false, text: null};
};
