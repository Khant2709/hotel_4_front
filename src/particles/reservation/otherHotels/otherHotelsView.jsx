import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';

import Title from "../../../components/ui/title/title";

import {hotelsLogo} from "../../../data/hotelsLogo";
import {mainColorHotel} from "../../../config/colorConfig";

import 'swiper/css';
import 'swiper/css/pagination';
import styles from "./otherHotels.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";


const OtherHotelsView = ({otherHotels, router, viewSlide}) => {
  return (
      <>
        <Title Tag={"h2"} text={"Другие базы отдыха"}/>
        <Swiper
            slidesPerView={viewSlide}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className={styles.swiper}
        >
          {otherHotels.map(hotel => {
            return <SwiperSlide key={hotel.id} className={`${stylesFontsT.newRoman400} ${styles.hotelCard}`}>
              <HotelCardContent hotel={hotel} router={router}/>
            </SwiperSlide>
          })}
        </Swiper>
      </>
  );
};

export default OtherHotelsView;

const HotelCardContent = ({hotel, router}) => (
    <>
      <div style={{backgroundImage: `url(${hotelsLogo[hotel.type].src})`}} className={styles.imgHotel}/>
      <p className={styles.title}>{hotel.name}</p>
      <div className={styles.line} style={{backgroundColor: `${mainColorHotel[hotel.type]}`,}}/>
      <p className={styles.description}>{hotel.description}</p>
      <p
          className={styles.link}
          onClick={() => router.push(`${hotel.website}/reservation`)}
      >
        Перейти
      </p>
    </>
);