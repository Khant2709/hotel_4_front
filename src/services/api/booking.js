import {makeRequest} from "../utils/makeRequest";
import {TIME_CASH} from "../../config/envData";


/** Получает все бронирования.*/
export const getAllBookings = async () => makeRequest('get', '/booking', null, null, TIME_CASH["5min"]);

/** Получает отфильтрованные бронирования.
 @param {Object} filters - Параметры фильтрации.
 @param {string} filters.startReservation - Начальная дата бронирования.
 @param {string} filters.endReservation - Конечная дата бронирования.
 @param {number} filters.countPeopleReservation - Количество людей.
 */
export const getFilterBooking = async ({
                                         startReservation,
                                         endReservation,
                                         countPeopleReservation
                                       }) => makeRequest('get', '/booking/filterBooking', null, {
  startReservation,
  endReservation,
  countPeopleReservation
}, TIME_CASH["5min"]);