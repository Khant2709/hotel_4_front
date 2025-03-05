"use client";

import React, {useMemo} from "react";
import {useRouter} from "next/navigation";

import {useWindowWidth} from "../../../hooks/UseWidth";
import {HOTEL_ID} from "../../../config/envData";
import OtherHotelsView from "./otherHotelsView";


const OtherHotels = ({allHotels}) => {
  const router = useRouter();
  const width = useWindowWidth();


  const otherHotels = useMemo(() => {
    if (!allHotels || allHotels.length === 0) return [];

    return allHotels.filter((hotel) => hotel.id !== HOTEL_ID);
  }, [allHotels]);

  const viewSlide = useMemo(() => {
    if (width > 1100) return 3;
    if (width <= 1100 && width > 768) return  2;
    return 1
  }, [width])

  if (!otherHotels?.length || !width) return null;

  return <OtherHotelsView otherHotels={otherHotels} router={router} viewSlide={viewSlide}/>
};

export default OtherHotels;
