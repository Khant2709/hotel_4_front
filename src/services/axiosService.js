import axios from "axios";
import {BASE_URL, TIMEOUT} from "../config/envData.js";
import {setupCache} from 'axios-cache-interceptor';

// Клиентский экземпляр для запросов без токена
export const axiosClient = setupCache(axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: TIMEOUT,
  withCredentials: true, // Разрешить отправку cookies
}), {
  ttl: 0, // По умолчанию кэш отключен (0 мс)
  debug: true, // Логирование кэша для отладки
});