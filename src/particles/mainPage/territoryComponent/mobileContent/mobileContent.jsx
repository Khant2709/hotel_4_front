import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCoverflow, Pagination} from 'swiper/modules';

import {getFullPathImage} from "../../../../utils/getFullPathImage";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import styles from "./mobileContent.module.css";
import stylesFont from "../../../../styles/fonts/timesNewRoman.module.css";


const MobileContent = ({images, territory}) => {
  return (
      <>
        <p className={`${stylesFont.newRoman400} ${styles.text}`}>{territory}</p>
        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className={styles.swiper}
        >
          {images.map(image => {
            const pathToImage = getFullPathImage(image.image_path, image.image_name);
            return <SwiperSlide key={image.id} className={styles.swiperSlide}>
              <div style={{backgroundImage: `url(${pathToImage})`}} className={styles.image}/>
            </SwiperSlide>
          })}
        </Swiper>
      </>
  );
};

export default MobileContent;