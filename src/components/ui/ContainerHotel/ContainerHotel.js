"use client";

import React, {useMemo} from "react";
import {useRouter} from "next/navigation";

import TitleMainPage from "../TitleMainPage/TitleMainPage";
import CardApartment from "../cardApartment/cardApartment";
import {getFullPathImage} from "../../../utils/getFullPathImage";

import {usePreloader} from "../../../hooks/usePreloader";

import styles from "./ContainerHotel.module.css";


const getSearchParams = (searchParams, hasQuery) => {
  if (!hasQuery) return null;
  return {
    startReservation: searchParams.get("startReservation"),
    endReservation: searchParams.get("endReservation"),
    countAdults: searchParams.get("countAdults"),
    countChildren: searchParams.get("countChildren"),
  };
};

const WrapperHotel = ({
                        ssrData,
                        hasQuery,
                        searchParams,
                      }) => {
  const router = useRouter();
  const {setIsLoading} = usePreloader();

  const {hotel, arrayRooms} = ssrData;
  const params = useMemo(() => getSearchParams(searchParams, hasQuery), [searchParams, hasQuery]);

  const navigateToReservation = (id) => {
    setIsLoading(true);
    const url = params
        ? `/reservation/${id}?${new URLSearchParams(params).toString()}`
        : `/reservation/${id}`;
    router.push(url);
  };

  if (!hotel || !arrayRooms) {
    console.warn("Нет данных отеля или комнат:", {hotel, arrayRooms});
    return null;
  }

  return (
      <>
        <TitleMainPage
            text={hotel.name}
            hasNameHotel={true}
            hasTopLine={true}
            hotel={hotel.type}
        />
        <div className={styles.wrapperCards}>
          {arrayRooms.map((apartment) => {
            return (
                <CardApartment
                    key={apartment.id}
                    image={getFullPathImage(apartment.apartment_folder_img, apartment.apartment_preview_img_name)}
                    title={apartment.apartment_name}
                    bedsCount={apartment.person_max}
                    roomsCount={apartment.amount_rooms}
                    cost={apartment?.prices ? Math.min(...Object.values(apartment.prices)) : 0}
                    numberHotel={hotel.type}
                    transition={() => navigateToReservation(apartment.id)}
                />
            );
          })}
        </div>
      </>
  );
};

export default WrapperHotel;
