import {BASE_URL_IMAGES} from "../config/envData";


export const getFullPathImage = (imageLink, imageName) => {
  return `${BASE_URL_IMAGES}${imageLink}/${imageName}`;
};
