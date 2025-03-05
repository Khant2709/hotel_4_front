"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

import {
  getNextDay,
  getToday,
  getDayStartSeason,
  checkDateCorrectness,
} from "../../../utils/getDay";
import {validateDataReservation} from "../../../utils/validate/vaidateFormReservation";

import {ContentFormSearchDate} from "./content";
import {HOTEL_TYPE} from "../../../config/envData";
import {mainColorHotel} from "../../../config/colorConfig";


const colorBorder = {borderColor: `${mainColorHotel[HOTEL_TYPE]}`};

const FormSearchDate = ({color, searchParams}) => {
  const router = useRouter();
  const colorLabel = color ? color : "black";

  const searchStartReservation =
      searchParams && searchParams.get("startReservation");
  const searchEndReservation =
      searchParams && searchParams.get("endReservation");
  const searchCountAdultsReservation =
      searchParams && searchParams.get("countAdults");
  const searchCountChildrenReservation =
      searchParams && searchParams.get("countChildren");

  const {checkInDate, checkOutDate} = getDayStartSeason();
  const dataCorrectness = checkDateCorrectness();

  const getDateStart = dataCorrectness ? getToday() : checkInDate;
  const getDateEnd = dataCorrectness ? getNextDay() : checkOutDate;

  const [dataReservation, setDataReservation] = useState({
    startDate: searchStartReservation || getDateStart,
    endDate: searchEndReservation || getDateEnd,
    countAdults: searchCountAdultsReservation || 1,
    countChildren: searchCountChildrenReservation || 0,
  });

  const [errorReservation, setErrorReservation] = useState(null);

  useEffect(() => {
    const today = new Date(getToday()).getTime();
    const startDate = new Date(dataReservation.startDate).getTime();
    const endDate = new Date(dataReservation.endDate).getTime();

    const {error, text} = validateDataReservation({
      today,
      startDate,
      endDate,
    });

    if (error) {
      setErrorReservation(text);
    } else {
      setErrorReservation(null);
    }
  }, [dataReservation]);

  const searchApartments = () => {
    const {startDate, endDate, countAdults, countChildren} = dataReservation;
    const searchParams = new URLSearchParams();

    searchParams.set("startReservation", startDate);
    searchParams.set("endReservation", endDate);
    searchParams.set("countAdults", countAdults);
    searchParams.set("countChildren", countChildren);
    router.push(`/reservationall?${searchParams.toString()}`);
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDataReservation({...dataReservation, [name]: value});
  };

  const fields = [
    {
      label: "Дата заезда:",
      name: "startDate",
      type: "date",
      value: dataReservation.startDate,
      onChange: handleChange,
      colorLabel: colorLabel,
      colorBorder: colorBorder,
    },
    {
      label: "Дата выезда:",
      name: "endDate",
      type: "date",
      value: dataReservation.endDate,
      onChange: handleChange,
      colorLabel: colorLabel,
      colorBorder: colorBorder,
    },
    {
      label: "Кол. взрослых:",
      name: "countAdults",
      type: "select",
      maxValue: 16,
      value: dataReservation.countAdults,
      onChange: handleChange,
      colorLabel: colorLabel,
      colorBorder: colorBorder,
    },
    {
      label: "Кол. детей:",
      name: "countChildren",
      type: "select",
      maxValue: 16,
      value: dataReservation.countChildren,
      onChange: handleChange,
      colorLabel: colorLabel,
      colorBorder: colorBorder,
    },
  ];

  return (
      <ContentFormSearchDate
          fields={fields}
          errorReservation={errorReservation}
          searchApartments={searchApartments}
      />
  );
};

export default FormSearchDate;
