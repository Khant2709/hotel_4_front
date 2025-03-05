import React from "react";

import ReservationAll from "../../particles/reservationall/reservationAllPageContainer";

import {hotelsAPI} from '../../services/api';
import {batchRequest} from "../../services/utils/requestUtils";

import {metaDataReservationAllPage} from "../../data/metaData";
import {jsonLDReservationAllPage} from "../../data/seoData";
import {HOTEL_ID, TIME_CASH} from "../../config/envData";
import ErrorPage from "../../components/ui/errorLadingData/errorPage";


export const metadata = metaDataReservationAllPage;

async function fetchHotelData() {
  const initialData = {
    current: null,
    all: null,
  };

  const request = [
    () => hotelsAPI.getCurrentHotelData(),
    () => hotelsAPI.getMainHotelsData(),
  ];

  return await batchRequest(initialData, request);
}

export default async function ReservationAllPage() {
  const {current, all} = await fetchHotelData();

  if (current.status !== 200 || all.status !== 200) {
    return (
        <ErrorPage
            page={'RESERVATION'}
            textClient={current?.error || all?.error || 'Произошла ошибка при загрузке данных отеля. =('}
        />
    );
  }

  const hotel = current.data.data.hotel;
  const allHotels = all.data.data;
  const otherHotels = allHotels.filter((h) => h.id !== HOTEL_ID);

  return (
      <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLDReservationAllPage),
            }}
        />
        <ReservationAll
            otherHotels={otherHotels}
            currentHotel={hotel}
        />
      </>
  )
}

export const revalidate = TIME_CASH["30min"] / 1000;
