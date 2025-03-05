import React from 'react';

import HeaderLineBackground from "../../components/ui/headerLineBackgrund/headerLineBackground";
import CenteredWrapper from "../../components/ui/wrapperPage/centeredWrapper";
import FormSearchDate from "../../components/ui/formSerchDate/formSerchDate";
import TitleMainPage from "../../components/ui/TitleMainPage/TitleMainPage";
import WrapperFormReservation from "./contentFormReservation/wrapper";
import WrapperInformationPrice from "./contentInformationPrice/wrapper";
import WrapperCalendar from "./contentCalendar/wrapper";
import WrapperAnaloguesApartment from "./contentAnaloguesApartment/wrapper";
import FullWidthWrapper from "../../components/ui/wrapperPage/fullWidthWrapper";

import styles from "./apartment.module.css";
import PhotosContent from "./contentPhotos/photosContent";
import DescriptionContainer from "./contentDescription/descriptionContainer";


const ApartmentView = ({
                         width,
                         searchParams,
                         hotel,
                         hotelNumber,
                         apartment,
                         dataReservation,
                         setDataReservation,
                         searchCountAdultsReservation,
                         searchCountChildrenReservation,
                         bookings,
                         allApartments,
                         changeDataFromCalendar,
                       }) => {
  return (
      <FullWidthWrapper>
        <HeaderLineBackground
            searchParams={searchParams}
            color={"black"}
        />

        <CenteredWrapper>
          <div className={styles.wrapperFormSearch}>
            <FormSearchDate searchParams={searchParams}/>
          </div>

          <TitleMainPage
              text={hotel.name}
              hotel={hotelNumber}
              hasTopLine={true}
              hasNameHotel={true}
          />

          <PhotosContent width={width} photosApartment={apartment.images}/>

          <DescriptionContainer currentApartment={apartment}/>

          <WrapperFormReservation
              dataReservation={dataReservation}
              setDataReservation={setDataReservation}
              countAdults={searchCountAdultsReservation}
              countChildren={searchCountChildrenReservation}
              allBookings={bookings}
              allApartments={allApartments}
              currentApartment={apartment}
              currentHotel={hotel}
              hotelNumber={hotelNumber}
          />

          <WrapperInformationPrice
              priceArray={Object.values(apartment.prices)}
          />

          <WrapperCalendar
              hotelNumber={hotelNumber}
              allBookings={bookings}
              allApartments={allApartments}
              currentApartment={apartment}
              dataReservation={dataReservation}
              changeDataFromCalendar={changeDataFromCalendar}
          />

          <WrapperAnaloguesApartment
              hotelType={hotelNumber}
              allApartments={allApartments}
              currentApartment={apartment}
          />
        </CenteredWrapper>
      </FullWidthWrapper>
  );
};

export default ApartmentView;