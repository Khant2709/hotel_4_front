import CardApartment from "../../../components/ui/cardApartment/cardApartment";
import {BASE_URL_IMAGES} from "../../../config/envData";

import styles from "../../../styles/pageReservationCurrentRoom/contentAnaloguesApartment.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";


export const ContentAnaloguesApartment = ({
                                            analoguesRooms,
                                            hotelType,
                                            router,
                                          }) => {
  return (
      <div className={styles.wrapperAnaloguesRooms}>
        <h2 className={stylesFontsT.newRoman400}>Похожие преложения</h2>
        <div className={styles.wrapperCards}>
          {analoguesRooms.slice(0, 3)
              .map((apartment, indexApartment) => {
                const imageUrl = `${BASE_URL_IMAGES}${apartment.apartment_folder_img}/${apartment.apartment_preview_img_name}`;
                const transformPrices = Object.values(apartment.prices);
                const minPrice = Math.min(...transformPrices);
                return (
                    <CardApartment
                        image={imageUrl}
                        title={apartment.apartment_name}
                        bedsCount={apartment.person_max}
                        roomsCount={apartment.amount_rooms}
                        cost={minPrice || 0}
                        numberHotel={hotelType}
                        transition={() => router.push(`/reservation/${apartment.id}`)}
                        key={indexApartment}
                    />
                );
              })}
        </div>
      </div>
  );
};
