"use client";

import {useRouter} from "next/navigation";
import {ContentAnaloguesApartment} from "./content";


const WrapperAnaloguesApartment = ({
                                     hotelType,
                                     allApartments,
                                     currentApartment,
                                   }) => {
  const router = useRouter();

  const analoguesRooms = allApartments.filter(
      (apartment) =>
          apartment.hotel_id === currentApartment.hotel_id &&
          apartment.person_max >= currentApartment.person_max &&
          apartment.id !== currentApartment.id
  );

  if (analoguesRooms.length > 0) {
    return (
        <ContentAnaloguesApartment
            analoguesRooms={analoguesRooms}
            hotelType={hotelType}
            router={router}
        />
    );
  }
};

export default WrapperAnaloguesApartment;
