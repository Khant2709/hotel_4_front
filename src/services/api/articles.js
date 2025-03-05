import {makeRequest} from "../utils/makeRequest";
import {TIME_CASH} from "../../config/envData";


/** Получает данные всех статей. */
export const getAllArticles = async () => makeRequest('get', '/blog', null, null, TIME_CASH["60min"]);

/** Получает данные конкретной статьи.*/
export const getCurrentArticle = async (id) => makeRequest('get', `/blog/${id}`, null, null, TIME_CASH["60min"]);