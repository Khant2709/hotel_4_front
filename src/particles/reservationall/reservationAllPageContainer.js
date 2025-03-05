"use client";

import React, {useEffect, useMemo, useState} from "react";
import {useSearchParams} from "next/navigation";

import ReservationAllView from "./reservationAllView/reservationAllView";

import {bookingAPI} from "../../services/api";
import {singleRequest} from "../../services/utils/requestUtils";


const getApartmentsByHotel = (apartments, hotelId) =>
    apartments.filter((apartment) => apartment.hotel_id === hotelId);

const getFilterParams = (searchParams) => ({
  startReservation: searchParams.get("startReservation"),
  endReservation: searchParams.get("endReservation"),
  countPeopleReservation:
      Number(searchParams.get("countAdults")) + Number(searchParams.get("countChildren")),
});

const ReservationAll = ({otherHotels, currentHotel}) => {
  const searchParams = useSearchParams();

  const [freeRooms, setFreeRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const filterParams = useMemo(() => getFilterParams(searchParams), [searchParams]);

  const freeApartments = useMemo(() => getApartmentsByHotel(freeRooms, currentHotel.id),
      [freeRooms, currentHotel]);

  const freeApartmentsOtherHotel = useMemo(() => freeRooms.filter((apartment) => apartment.hotel_id !== currentHotel.id) || [],
      [freeRooms, currentHotel])

  useEffect(() => {
    const fetchFreeRooms = async () => {
      setIsLoading(true);
      setError(null);
      const response = await singleRequest(() => bookingAPI.getFilterBooking(filterParams));
      if (response.status >= 200 && response.status < 300) {
        setFreeRooms(response.data.data || []);
      } else {
        setError(response.error || "Ошибка при загрузки номеров.");
      }
      setIsLoading(false);
    };

    fetchFreeRooms();
  }, [filterParams]);

  return (
      <ReservationAllView
          isLoading={isLoading}
          error={error}
          searchParams={searchParams}
          currentHotel={currentHotel}
          freeApartments={freeApartments}
          freeApartmentsOtherHotel={freeApartmentsOtherHotel}
          otherHotels={otherHotels}
          getApartmentsByHotel={(hotelId) => getApartmentsByHotel(freeRooms, hotelId)}
      />
  )
};

export default ReservationAll;
