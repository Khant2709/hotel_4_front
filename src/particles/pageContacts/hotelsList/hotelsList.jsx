import Link from "next/link";

import {HOTEL_ID} from "../../../config/envData";

import styles from "./hotelsList.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";


export const HotelsList = ({allHotel}) => {
  return (
      <div className={`${stylesFontsT.newRoman400} ${styles.containerMain}`}>
        <p className={styles.subtitle}>Все наши отели:</p>
        <div className={styles.wrapperHotels}>
          {allHotel.map((hotel) => {
            return (
                <div
                    className={`${styles.containerHotel} 
                        ${
                        HOTEL_ID === hotel.id &&
                        styles.activeHotel
                    }`}
                    key={hotel.id}
                >
                  <p className={styles.nameHotel}>{'"' + hotel.name + '"'}</p>
                  <p className={styles.addressHotel}>{hotel.address}</p>
                  <Link className={styles.websiteHotel} href={hotel.website}>
                    {hotel.website}
                  </Link>
                </div>
            );
          })}
        </div>
      </div>
  );
}
