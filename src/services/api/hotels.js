import {makeRequest} from "../utils/makeRequest";
import {HOTEL_ID, TIME_CASH} from "../../config/envData";


/** Получает данные всех отелей. */
export const getMainHotelsData = async () => makeRequest('get', '/hotels/main', null, null, TIME_CASH["30min"]);

/** Получает данные текущего отеля.*/
export const getCurrentHotelData = async (id = HOTEL_ID) => makeRequest('get', `/hotels/${id}`, null, null, TIME_CASH["30min"]);

/** Получает банер для страницы отелей текущего отеля. */
export const getBannerHotelsPage = async () => makeRequest('get', `/images/banner2/${HOTEL_ID}`, null, null, TIME_CASH["60min"]);