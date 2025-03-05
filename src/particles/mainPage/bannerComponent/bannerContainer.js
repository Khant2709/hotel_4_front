"use client";

import React, {useMemo} from "react";

import {
  BASE_URL_IMAGES,
  HOTEL_ID, HOTEL_TYPE,
  HOTELS_NAME_AND_LINK,
} from "../../../config/envData";

import {useWindowWidth} from "../../../hooks/UseWidth";

import BannerView from "./bannerView";


const SIZES = {
  large: {width: 1920, height: 960},
  medium: {width: 768, height: 640},
  small: {width: 480, height: 480},
};

const hotelNameDefault = HOTELS_NAME_AND_LINK.find((el) => el.id === HOTEL_ID).name;


const BannerContainer = ({name, banner}) => {
  const width = useWindowWidth();

  const imageParams = useMemo(() => {
    if (!width) return SIZES.large;
    if (width > 1100) return SIZES.large;
    if (width <= 1100 && width >= 600) return SIZES.medium;
    return SIZES.small;
  }, [width]);

  const imageUrl = useMemo(() => `${BASE_URL_IMAGES}${banner.image_path}/${banner.image_name}`, [banner]);
  const hotelName = name || hotelNameDefault;

  return (
      <BannerView
          imageUrl={imageUrl}
          imageParams={imageParams}
          hotelName={hotelName}
          hotelType={HOTEL_TYPE}
      />
  );
};

export default BannerContainer;
