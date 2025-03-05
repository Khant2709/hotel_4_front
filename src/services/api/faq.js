import {makeRequest} from "../utils/makeRequest";
import {HOTEL_ID, TIME_CASH} from "../../config/envData";


/** Получает данные FAQ для отеля.*/
export const getFAQ = async () => makeRequest('get', `/faq/${HOTEL_ID}`, null, null, TIME_CASH["60min"]);