import React from "react";

import ApartmentContainer from "../../../particles/reservationCurrentRoom/apartmentContainer";
import {HOTEL_TYPE, HOTELS_NAME_AND_LINK, TIME_CASH} from "../../../config/envData";


import {jsonLDCurrentRoom} from "../../../data/seoData";
import {metaDataCurrentRoom} from "../../../data/metaData";

import styles from "../../../particles/reservationCurrentRoom/apartment.module.css";

import {apartmentsAPI, bookingAPI} from '../../../services/api';
import {batchRequest, singleRequest} from "../../../services/utils/requestUtils";
import ErrorPage from "../../../components/ui/errorLadingData/errorPage";


const findCurrentHotel = (id) => {
  return HOTELS_NAME_AND_LINK.find(hotel => hotel.id === id)
}

export async function generateMetadata({params: {id}}) {
  const apartmentData = await singleRequest(() => apartmentsAPI.getCurrentApartment(id))
  if (apartmentData.status !== 200) return null;

  const currentApartment = apartmentData.data.data[0];
  const currentHotel = findCurrentHotel(currentApartment.hotel_id);
  return metaDataCurrentRoom(id, currentHotel, currentApartment);
}

async function getData(id) {
  const data = {
    apartmentData: null,
    allApartmentsData: null,
    bookingsData: null,
  };

  const request = [
    () => apartmentsAPI.getCurrentApartment(id),
    () => apartmentsAPI.getAllApartments(),
    () => bookingAPI.getAllBookings(),
  ];

  return await batchRequest(data, request);
}

export default async function Page({params: {id}}) {
  const {apartmentData, allApartmentsData, bookingsData} = await getData(id);


  const apartment = apartmentData.data.data[0];
  const allApartments = allApartmentsData.data.data;
  const bookings = bookingsData.data.data;

  if (apartmentData.status !== 200 ||
      allApartmentsData.status !== 200 ||
      bookingsData.status >= 300
  ) {
    return (
        <ErrorPage
            page={'CURRENT_APARTMENT'}
            textClient={apartmentData?.error || allApartmentsData?.error || bookingsData?.error || 'Произошла ошибка при загрузке данных отеля. =('}
        />
    );
  }

  const currentHotel = findCurrentHotel(apartment.hotel_id);

  const jsonLd = jsonLDCurrentRoom({
    room: apartmentData,
    hotelData: currentHotel
  });

  return (
      <section className={styles.main}>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
        <ApartmentContainer
            id={id}
            ssrData={{currentHotel, allApartments, apartment}}
            hotelNumber={HOTEL_TYPE}
            allBookings={bookings}
        />
      </section>
  );
}

export const revalidate = TIME_CASH["60min"] / 1000;