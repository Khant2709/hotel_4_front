"use client";

import React from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";

import {useWindowWidth} from "../../hooks/UseWidth";
import Button from "../../components/ui/buttons/button/button";

import {hotelsLogo} from "../../data/hotelsLogo";
import {secondaryColorHotel, mainColorHotel} from "../../config/colorConfig";

import styles from "../../styles/secondSectionHotels.module.css";
import stylesFontsT from "../../styles/fonts/timesNewRoman.module.css";


const HotelsList = ({allHotels}) => {
  const width = useWindowWidth();
  const router = useRouter();

  if (!width) return null;

  return (
      <>
        {allHotels.map((hotel) => {
          const isNeedReverse = width > 768 && hotel.id % 2 !== 0;
          return (
              <div
                  key={hotel.id}
                  className={styles.wrapperHotel}
                  style={{background: `${secondaryColorHotel[hotel.type]}`}}
              >
                <div className={`${styles.containerHotel} ${isNeedReverse ? styles.reverseContent : ''}`}>
                  {width > 768
                      ? <>
                        <HotelInfo hotel={hotel} router={router}/>
                        <div
                            style={{backgroundImage: `url(${hotelsLogo[hotel.type].src})`}}
                            className={styles.imgHotel}
                        />
                      </>
                      : <HotelInfo hotel={hotel} router={router} isMobile={true}/>
                  }
                </div>
              </div>
          );
        })}
      </>
  );
};

export default HotelsList;

const HotelInfo = ({hotel, router, isMobile = false}) => (
    <div className={`${stylesFontsT.newRoman400} ${styles.informationContainerHotel}`}>
      <p className={styles.nameHotel} style={{color: `${mainColorHotel[hotel.type]}`}}>
        {hotel.name}
      </p>
      <p className={styles.descriptionHotel}>{hotel.description}</p>
      {isMobile &&
      <Image
          alt={"img"}
          src={hotelsLogo[hotel.type]}
          className={styles.imgHotel}
      />}
      <HotelButtons hotel={hotel} router={router}/>
    </div>
)

const HotelButtons = ({hotel, router}) => (
    <div className={styles.wrapperBtn}>
      <Button
          text={"Забронировать"}
          hotel={hotel.type}
          handleClick={() => router.push(`${hotel.website}/reservation`)}
      />
      <Button
          text={"Перейти на отель"}
          hotel={hotel.type}
          handleClick={() => router.push(hotel.website)}
      />
    </div>
);