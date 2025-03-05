import {ContentInformationPrice} from "./content";

import {PERIODS_MONTH_DAY} from "../../../config/envData";


const formatDate = (date) => date.replace("-", ".");

const WrapperInformationPrice = ({priceArray}) => {
  if (!priceArray || priceArray.length === 0) return null;

  const periods = Object.values(PERIODS_MONTH_DAY)
      .map((period, index) => ({
        startDate: formatDate(period.startDate),
        endDate: formatDate(period.endDate),
        priceIndex: index,
      }));
  return (
      <ContentInformationPrice
          periodsDate={periods}
          pricesByPeriod={priceArray}
          dateStartWork={periods[0]?.startDate}
          dateEndWork={periods[periods.length - 1]?.endDate}
      />
  );
};

export default WrapperInformationPrice;
