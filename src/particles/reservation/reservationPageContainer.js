import React from 'react';

import FormSearchDate from "../../components/ui/formSerchDate/formSerchDate";
import WrapperHotel from "../../components/ui/ContainerHotel/ContainerHotel";
import OtherHotels from "./otherHotels/otherHotels";
import CenteredWrapper from "../../components/ui/wrapperPage/centeredWrapper";

import {HOTEL_TYPE} from "../../config/envData";

import styles from "../../styles/reservation.module.css";


const ReservationPageContainer = ({hotel, allHotels, apartments}) => {
  return (
      <CenteredWrapper asPage>
        <div className={styles.wrapperFormSearch}>
          <FormSearchDate hotelNumber={HOTEL_TYPE}/>
        </div>
        <WrapperHotel ssrData={{hotel, arrayRooms: apartments}}/>
        <OtherHotels allHotels={allHotels}/>
      </CenteredWrapper>
  );
};

export default ReservationPageContainer;