"use client";

import React, {useMemo} from "react";
import Image from "next/image";

import {useWindowWidth} from "../../../hooks/UseWidth";

import {BASE_URL_IMAGES} from "../../../config/envData";

import background from "../../../../public/bannerHotels.webp";

import styles from "./bannerView.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";


const SIZES = {
  large: {width: 1920, height: 592},
  medium: {width: 768, height: 480},
  small: {width: 480, height: 240},
};

const BannerView = ({banner}) => {
  const width = useWindowWidth();

  const imageParams = useMemo(() => {
    if (!width) return SIZES.large;
    if (width > 1100) return SIZES.large;
    if (width <= 1100 && width >= 600) return SIZES.medium;
    return SIZES.small;
  }, [width]);

  const imageUrl = useMemo(() => banner
          ? `${BASE_URL_IMAGES}${banner.image_path}/${banner.image_name}`
          : background
      , [banner]);


  return (
      <section className={styles.main}>
        <Image
            alt="background"
            src={imageUrl}
            priority
            width={imageParams.width}
            height={imageParams.height}
            className={styles.background}
            style={{objectFit: "cover"}}
        />

        <h1 className={`${stylesFontsT.newRoman400} ${styles.title}`}>
          Отдых на черноморском <br/> побережье
        </h1>
      </section>
  );
};

export default BannerView;
