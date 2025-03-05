import transformPrice from "../../../utils/mask/transformPrice";

import styles from "./contentInformationPrice.module.css";
import stylesFonts from "../../../styles/fonts/timesNewRoman.module.css";


export const ContentInformationPrice = ({
                                          periodsDate = [],
                                          pricesByPeriod = [],
                                          dateStartWork,
                                          dateEndWork,
                                        }) => {
  return (
      <div className={`${stylesFonts.newRoman400} ${styles.main}`}>
        <p>
          Если ваша бронь попадает на разные ценовые периоды, сайт автоматически
          высчитывает цену за ночь.
        </p>

        {renderPeriods(periodsDate, pricesByPeriod)}

        <p>
          * В период с <span>{dateEndWork}</span> по <span>{dateStartWork}</span>,
          проживание не возможно.
        </p>
        <p>
          Ниже в календаре вы можете узнать о забронированных/свободных датах.
        </p>
      </div>
  );
};

const renderPeriods = (periodsDate, pricesByPeriod) => {
  return periodsDate.map(({startDate, endDate, priceIndex}, i) => {
    const price = transformPrice(pricesByPeriod[priceIndex] || 0);
    return (
        <p key={i}>
          * В период с <span>{startDate}</span> по
          <span> {endDate}</span>, цена за одну ночь
          <span> {price}₽</span>
        </p>
    );
  });
};