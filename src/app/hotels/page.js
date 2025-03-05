import React from "react";

import BannerView from "../../particles/pageHotels/bannerView/bannerView";
import HotelsList from "../../particles/pageHotels/hotelsList";

import ErrorPage from "../../components/ui/errorLadingData/errorPage";
import FullWidthWrapper from "../../components/ui/wrapperPage/fullWidthWrapper";

import {hotelsAPI} from "../../services/api";
import {batchRequest} from "../../services/utils/requestUtils";

import {mataDataHotelsPage} from "../../data/metaData";
import {jsonLDHotelsPage} from "../../data/seoData";
import {TIME_CASH} from "../../config/envData";


export const metadata = mataDataHotelsPage;

async function fetchData() {
  const initial = {
    allHotelsData: null,
    bannerData: null,
  };

  const request = [
    () => hotelsAPI.getMainHotelsData(),
    () => hotelsAPI.getBannerHotelsPage(),
  ];

  return await batchRequest(initial, request);
}

export default async function Hotels() {
  const {allHotelsData, bannerData} = await fetchData();

  if (allHotelsData.status !== 200) {
    return (
        <ErrorPage
            page={'ALL_HOTELS'}
            textClient={allHotelsData?.error || 'Произошла ошибка при загрузке данных отеля. =('}
        />
    );
  }

  const banner = bannerData.data.data[0];
  const allHotels = allHotelsData.data.data;

  return (
      <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDHotelsPage)}}
        />
        <FullWidthWrapper>
          <BannerView banner={banner}/>
          <HotelsList allHotels={allHotels}/>
        </FullWidthWrapper>
      </>
  );
}

export const revalidate = TIME_CASH["60min"] / 1000;