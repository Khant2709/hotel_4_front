import {DEFAULT_CONTACTS} from "../../../config/envData";


const createMethod = (id, type, text, subtext = null, link = null) => {
  return {id, type, text, subtext, link}
};

export const trackMethod = [
  {
    id: 1,
    title: "На автомобиле:",
    method: [
      createMethod(1, "text", "Самый простой способ - написать в Яндекс навигаторе ЖК Сан Марина, ул. Одоевского 87."),
      createMethod(2, "link", "Еще проще => ", "открыть яндекс карты", DEFAULT_CONTACTS.linkYaMap),
    ]
  },
  {
    id: 2,
    title: "На общественном транспорте:",
    method: [
      createMethod(1, "text", "Самый простой способ - написать в Яндекс навигаторе ЖК Сан Марина, ул. Одоевского 87."),
      createMethod(2, "link", "Еще проще => ", "открыть яндекс карты", DEFAULT_CONTACTS.linkYaMap),
      createMethod(3, "router", "Как добраться до ЖК Сан Марина.", "Посмотреть", "/contacts/track/bus"),
      createMethod(4, "router", "Адлер — Лазаревское: как добраться?", "Посмотреть", "/contacts/track/bus?scroll=true"),
    ]
  },
];