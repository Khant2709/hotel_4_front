import {filterBookingsFromApartment} from "../../../utils/filterBookings";
import {ContentCalendar} from "./content";


const WrapperCalendar = ({
                           hotelNumber,
                           allBookings,
                           allApartments,
                           currentApartment,
                           dataReservation,
                           changeDataFromCalendar,
                         }) => {
  const filterBooking = filterBookingsFromApartment({
    allBookings,
    allApartments,
    apartment: currentApartment,
  });

  return (
      <ContentCalendar
          filterBooking={filterBooking}
          hotelNumber={hotelNumber}
          dataReservation={dataReservation}
          changeDataFromCalendar={changeDataFromCalendar}
      />
  );
};

export default WrapperCalendar;
