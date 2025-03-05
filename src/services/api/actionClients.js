import {makeRequest} from "../utils/makeRequest";


/** Создает новое бронирование.*/
export const createReservation = async (data) => makeRequest('post', '/reservation/create', data);

/** Отправляет сообщение админам (заявка обратный звонок).*/
export const callBack = async (data) => makeRequest('post', '/connection/callback', data);