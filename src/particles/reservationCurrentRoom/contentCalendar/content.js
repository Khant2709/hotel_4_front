import Calendar from "../../../components/ui/Calendar/calendar";
import {mainColorHotel} from "../../../config/colorConfig";

import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";

import styles from "../../../styles/pageReservationCurrentRoom/contentCalendar.module.css";


export const ContentCalendar = ({
                                  filterBooking,
                                  hotelNumber,
                                  dataReservation,
                                  changeDataFromCalendar,
                                }) => {
  return (
      <section className={styles.wrapperContent}>
        <p className={`${stylesFontsT.newRoman400} ${styles.titleCalendar}`}>
          Забронированные даты:
        </p>
        <div
            className={styles.wrapperCalendar}
            style={{borderColor: mainColorHotel[hotelNumber]}}
        >
          <Calendar
              filterBooking={filterBooking}
              hotelNumber={hotelNumber}
              dataReservation={dataReservation}
              changeDataFromCalendar={changeDataFromCalendar}
          />
        </div>
      </section>
  );
};
