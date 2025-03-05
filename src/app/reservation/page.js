import React from "react";

import HeaderLineBackground from "../../components/ui/headerLineBackgrund/headerLineBackground";
import ReservationPageContainer from "../../particles/reservation/reservationPageContainer";
import ErrorPage from "../../components/ui/errorLadingData/errorPage";

import {hotelsAPI, apartmentsAPI} from '../../services/api';
import {batchRequest} from "../../services/utils/requestUtils";

import {metaDataReservationPage} from "../../data/metaData";
import {jsonLDReservationPage} from "../../data/seoData";
import {TIME_CASH} from "../../config/envData";

import styles from "../../styles/reservation.module.css";


export const metadata = metaDataReservationPage;

async function getData() {
  const hotelData = {
    hotelData: null,
    allHotelsData: null,
    apartmentsByHotelData: null,
  };

  const request = [
    () => hotelsAPI.getCurrentHotelData(),
    () => hotelsAPI.getMainHotelsData(),
    () => apartmentsAPI.getApartmentByHotel(),
  ];

  return await batchRequest(hotelData, request);
}

export default async function Reservation() {
  const {hotelData, allHotelsData, apartmentsByHotelData} = await getData();

  if (hotelData.status !== 200 || allHotelsData.status !== 200 || apartmentsByHotelData.status !== 200) {
    return (
        <ErrorPage
            page={'APARTMENTS_BY_HOTEL'}
            textClient={hotelData?.error ||
            allHotelsData?.error ||
            allHotelsData?.error ||
            'Произошла ошибка при загрузке данных отеля. =('
            }
        />
    );
  }

  const hotel = hotelData.data.data.hotel;
  const allHotels = allHotelsData.data.data;
  const apartments = apartmentsByHotelData.data.data;


  const jsonData = jsonLDReservationPage(apartments || []);
  return (
      <section className={styles.main}>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonData),
            }}
        />
        <HeaderLineBackground color={"black"}/>

        <ReservationPageContainer
            hotel={hotel}
            allHotels={allHotels}
            apartments={apartments}
        />
      </section>
  );
}

export const revalidate = TIME_CASH["60min"] / 1000;
