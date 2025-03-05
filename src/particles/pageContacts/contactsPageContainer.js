'use client'

import React from 'react';
import {useRouter} from "next/navigation";

import Title from "../../components/ui/title/title";
import ContactsView from "./contactsView/contactsView";
import {TrackView} from "./trackAndPlace/trackView";
import PlaceView from "./trackAndPlace/placeView";
import {HotelsList} from "./hotelsList/hotelsList";

import FullWidthWrapper from "../../components/ui/wrapperPage/fullWidthWrapper";
import CenteredWrapper from "../../components/ui/wrapperPage/centeredWrapper";
import FormCall from "../../components/ui/formCall/formCall";
import YaMap from "../../components/ui/yaMap/yaMap";
import FormSearchDate from "../../components/ui/formSerchDate/formSerchDate";

import {HOTEL_TYPE} from "../../config/envData";

import styles from "./contacts.module.css";


const ContactsPageContainer = ({hotel, allHotel, articles}) => {
  const router = useRouter();

  return (
      <FullWidthWrapper>

        <CenteredWrapper>
          <div className={styles.wrapperFormSearch}>
            <FormSearchDate hotelNumber={HOTEL_TYPE}/>
          </div>
          <Title Tag={"h1"} text={"Свяжитесь с нами"}/>
          <ContactsView hotel={hotel}/>
          <TrackView router={router}/>
          {articles && <PlaceView articles={articles}/>}
          <HotelsList
              allHotel={allHotel}
              currentHotel={hotel}
          />
          <p className={styles.finishText}>{hotel.text_conclusion}</p>
          <div className={styles.wrapperFormCall}>
            <FormCall text={"Заказать звонок"} numberHotel={HOTEL_TYPE}/>
          </div>
        </CenteredWrapper>
        <YaMap code={hotel?.code_iframe_map}/>
      </FullWidthWrapper>
  );
};

export default ContactsPageContainer;