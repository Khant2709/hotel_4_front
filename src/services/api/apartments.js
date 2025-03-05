import {makeRequest} from "../utils/makeRequest";
import {HOTEL_ID, TIME_CASH} from "../../config/envData";


/** Получает данные всех номеров. */
export const getAllApartments = async () => makeRequest('get', '/apartments', null, null, TIME_CASH["60min"]);

/** Получает данные номеров по ID отеля. Если ID отеля не указан, используется HOTEL_ID.*/
export const getApartmentByHotel = async (hotelId = HOTEL_ID) =>
    makeRequest('get', `/apartments/hotel/${hotelId}`, null, null, TIME_CASH["60min"]);

/** Получает данные конкретного номера.*/
export const getCurrentApartment = async (id) => makeRequest('get', `/apartments/${id}`, null, null, TIME_CASH["30min"]);