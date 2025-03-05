"use client";

import React, {useMemo} from "react";
import {useRouter} from "next/navigation";

import {HOTEL_TYPE} from "../../../config/envData";

import {useWindowWidth} from "../../../hooks/UseWidth";

import Title from "../../../components/ui/title/title";
import CardApartment from "../../../components/ui/cardApartment/cardApartment";
import ButtonSecondary from "../../../components/ui/buttons/buttonSecondory/buttonSecondory";

import styles from "../../../styles/pageMain/secondSection.module.css";
import {getFullPathImage} from "../../../utils/getFullPathImage";


const ApartmentsByHotelComponent = ({apartments}) => {
  const router = useRouter();
  const width = useWindowWidth();

  const countSliceEnd = useMemo(() => {
    if (!width) return 6;
    if (width > 1100) return 6;
    if (width <= 1100 && width > 768) return 4;
    return 3;
  }, [width]);

  return (
      <>
        <Title Tag={"h2"} text={"Апартаменты"}/>
        <div className={styles.containerApartments}>
          {apartments.slice(0, countSliceEnd)
              .map((apartment) => {
                return (
                    <CardApartment
                        key={apartment.id}
                        title={apartment.apartment_name}
                        numberHotel={HOTEL_TYPE}
                        roomsCount={apartment.amount_rooms}
                        bedsCount={apartment.person_max}
                        image={getFullPathImage(apartment.apartment_folder_img, apartment.apartment_preview_img_name)}
                        cost={
                          apartment.prices
                              ? Math.min(...Object.values(apartment.prices))
                              : 0
                        }
                        transition={() => router.push(`/reservation/${apartment.id}`)}
                    />
                );
              })}
        </div>
        <ButtonSecondary
            text={"Смотреть все номера"}
            hotel={HOTEL_TYPE}
            handleClick={() => router.push("reservation")}
        />
      </>
  );
};

export default ApartmentsByHotelComponent;
