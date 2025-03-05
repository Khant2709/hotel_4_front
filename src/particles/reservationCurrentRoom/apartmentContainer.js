"use client";

import React, {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";

import {bookingAPI} from "../../services/api";

import {usePreloader} from "../../hooks/usePreloader";
import {singleRequest} from "../../services/utils/requestUtils";
import ApartmentView from "./apartmentView";
import {useWindowWidth} from "../../hooks/UseWidth";
import {getSearchParams} from "../../utils/getSearchParams";
import {getDefaultDateReservation} from "../../utils/getDefaultDateReservation";


export default function ApartmentContainer({
                                             id,
                                             hotelNumber,
                                             ssrData,
                                             allBookings,
                                           }) {
  const width = useWindowWidth();
  const searchParams = useSearchParams();
  const {isLoading, setIsLoading} = usePreloader();
  const {currentHotel, allApartments, apartment} = ssrData;

  const {
    startDateReservation,
    endDateReservation,
    countAdultsReservation,
    countChildrenReservation
  } = getSearchParams(searchParams);

  const {getDateStart, getDateEnd} = getDefaultDateReservation();

  const [bookings, setBookings] = useState(allBookings || []);
  const [dataReservation, setDataReservation] = useState({
    startDataReservation: startDateReservation || getDateStart,
    endDataReservation: endDateReservation || getDateEnd,
  });

  const changeDataFromCalendar = (field, data) => {
    if (field === "startData") {
      setDataReservation({
        ...dataReservation,
        startDataReservation: data,
      });
    }

    if (field === "endData") {
      setDataReservation({
        ...dataReservation,
        endDataReservation: data,
      });
    }
  };

  useEffect(() => {
    singleRequest(() => bookingAPI.getAllBookings())
        .then(response => {
          setBookings(response.data.data)
        })
        .catch(error => {
          console.err(error.error)
        })
        .finally(() => {
          if (isLoading) {
            setIsLoading(false)
          }
        })
  }, [id]);

  return (
      <ApartmentView
          width={width}
          searchParams={searchParams}
          hotel={currentHotel}
          hotelNumber={hotelNumber}
          apartment={apartment}
          dataReservation={dataReservation}
          setDataReservation={setDataReservation}
          searchCountAdultsReservation={countAdultsReservation}
          searchCountChildrenReservation={countChildrenReservation}
          bookings={bookings}
          allApartments={allApartments}
          changeDataFromCalendar={changeDataFromCalendar}
      />
  );
}
