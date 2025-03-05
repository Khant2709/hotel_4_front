import React from 'react';

import HeaderLineBackground from "../../../components/ui/headerLineBackgrund/headerLineBackground";
import FormSearchDate from "../../../components/ui/formSerchDate/formSerchDate";
import Preloader from "../../../components/ui/preloader/preloader";
import CenteredWrapper from "../../../components/ui/wrapperPage/centeredWrapper";
import WrapperHotel from "../../../components/ui/ContainerHotel/ContainerHotel";
import Title from "../../../components/ui/title/title";
import FullWidthWrapper from "../../../components/ui/wrapperPage/fullWidthWrapper";

import styles from "./reservationAllView.module.css";
import stylesFont from "../../../styles/fonts/timesNewRoman.module.css";


const ReservationAllView = ({
                              isLoading,
                              error,
                              searchParams,
                              currentHotel,
                              freeApartments,
                              freeApartmentsOtherHotel,
                              otherHotels,
                              getApartmentsByHotel,
                            }) => {
  return (
      <FullWidthWrapper>
        <HeaderLineBackground searchParams={searchParams} color="black"/>
        <section className={styles.wrapperFormSearch}>
          <FormSearchDate searchParams={searchParams}/>
        </section>
        <CenteredWrapper>
          {isLoading
              ? <Preloader/>
              : error
                  ? <ErrorContainer message={error}/>
                  : <>
                    <HotelSection
                        hotel={currentHotel}
                        apartments={freeApartments}
                        searchParams={searchParams}
                    />
                    <Title Tag="h3" text="Предложения с других наших отелей"/>
                    {otherHotels.map((hotel) => (
                        <HotelSection
                            key={hotel.id}
                            hotel={hotel}
                            apartments={getApartmentsByHotel(hotel.id)}
                            searchParams={searchParams}
                        />
                    ))}
                    {!freeApartmentsOtherHotel.length && !freeApartments.length && <ErrorContainer/>}
                    <div className={styles.marginBt}/>
                  </>
          }
        </CenteredWrapper>
      </FullWidthWrapper>
  );
};

export default ReservationAllView;

const HotelSection = ({hotel, apartments, searchParams}) => {
  if (!apartments.length) return null;
  return (
      <WrapperHotel
          ssrData={{hotel, arrayRooms: apartments}}
          hasQuery={true}
          searchParams={searchParams}
      />
  );
};

const ErrorContainer = ({message}) => (
    <p className={`${styles.errorApartmentsEmpty} ${stylesFont.newRoman400}`}>
      {message || "К сожалению, на данный период нет свободных номеров."}
    </p>
);