import React from "react";

import HeaderLineBackground from "../../components/ui/headerLineBackgrund/headerLineBackground";


import {metaDataContactsPage} from "../../data/metaData";
import {jsonLDContactsPage} from "../../data/seoData";

import {TIME_CASH} from "../../config/envData";

import ContactsPageContainer from "../../particles/pageContacts/contactsPageContainer";
import {batchRequest} from "../../services/utils/requestUtils";
import {hotelsAPI, articlesAPI} from '../../services/api';
import ErrorPage from "../../components/ui/errorLadingData/errorPage";


export const metadata = metaDataContactsPage;

async function getData() {
  const hotelData = {
    hotelData: null,
    allHotelData: null,
    articlesData: null
  };

  const request = [
    () => hotelsAPI.getCurrentHotelData(),
    () => hotelsAPI.getMainHotelsData(),
    () => articlesAPI.getAllArticles()
  ];

  return await batchRequest(hotelData, request);
}

export default async function ContactsPage() {
  const {hotelData, allHotelData, articlesData} = await getData();

  if (allHotelData.status !== 200 || hotelData.status !== 200) {
    return (
        <ErrorPage
            page={'CONTACTS'}
            textClient={allHotelData?.error || hotelData?.error || 'Произошла ошибка при загрузке данных отеля. =('}
        />
    );
  }

  const articles = articlesData.data.data;
  const allHotel = allHotelData.data.data;
  const hotel = hotelData.data.data.hotel;

  return (
      <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDContactsPage)}}
        />
        <HeaderLineBackground color={"black"}/>
        <ContactsPageContainer hotel={hotel} allHotel={allHotel} articles={articles}/>
      </>
  );
}

export const revalidate = TIME_CASH["60min"] / 1000;