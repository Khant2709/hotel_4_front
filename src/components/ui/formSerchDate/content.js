import Button from "../../ui/buttons/button/button";

import { HOTEL_TYPE } from "../../../config/envData";

import styles from "./formSerchDate.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";

export const ContentFormSearchDate = ({
  fields,
  searchApartments,
  errorReservation,
}) => {
  return (
    <div className={styles.containerReservation}>
      <div className={styles.wrapperFilter}>
        {fields.map((field, index) => {
          return (
            <div className={styles.wrapper} key={index}>
              {field.type === "date" && (
                <>
                  <label
                    htmlFor={field.name}
                    className={stylesFontsT.newRoman400}
                    style={{ color: `${field.colorLabel}` }}
                  >
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    value={field.value}
                    onChange={field.onChange}
                    style={field.colorBorder}
                    className={`${stylesFontsT.newRoman400} ${styles.testInp}`}
                  />
                </>
              )}

              {field.type === "select" && (
                <>
                  <label
                    htmlFor={field.name}
                    className={stylesFontsT.newRoman400}
                    style={{ color: `${field.colorLabel}` }}
                  >
                    {field.label}
                  </label>
                  <select
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    style={field.colorBorder}
                    className={stylesFontsT.newRoman400}
                  >
                    <option value={0}>Выбрать</option>
                    {[...Array(field.maxValue)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
          );
        })}
      </div>
      <Button
        text={"Поиск"}
        hotel={HOTEL_TYPE}
        handleClick={searchApartments}
        disabled={errorReservation}
      />
      <p className={`${stylesFontsT.newRoman400} ${styles.error}`}>
        {errorReservation}
      </p>
    </div>
  );
};
