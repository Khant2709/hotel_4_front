import {axiosClient} from "../axiosService";

// Универсальная функция для выполнения запросов с опциональным кэшированием
export const makeRequest = async (
    method,
    url,
    data = null,
    params = null,
    cacheMaxAge = null, // Время кэша в миллисекундах, по умолчанию null (без кэша)
    options = {},
) => {
  try {
    // Базовая конфигурация для axios
    const config = {
      method,
      url,
      params,
      ...options,
    };

    // Определяем, какой экземпляр axios использовать
    if (cacheMaxAge && method.toLowerCase() === 'get') {
      config.cache = {
        ttl: cacheMaxAge, // Устанавливаем время жизни кэша для этого запроса
      };
    }

    const isGetRequest = method.toLowerCase() === 'get';
    if (!isGetRequest && data !== null) {
      config.data = data;
    }

    // console.log(`[Запрос]: ${method} ${url} (cacheMaxAge: ${cacheMaxAge || 'нет'})`);
    const startTime = Date.now();
    const response = await axiosClient(config);
    const endTime = Date.now();
    // console.log(`[Ответ]: ${method} ${url} - ${endTime - startTime}мс, данные:`);

    return {data: response.data, status: response.status};
  } catch (error) {
    console.debug(`Ошибка при выполнении запроса ${method} ${url}:`, error);
    return {data: null, status: error.response?.status || 500, error: error.message};
  }
};