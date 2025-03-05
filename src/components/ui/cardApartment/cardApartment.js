"use client";

import React from "react";
import {mainColorHotel} from "../../../config/colorConfig";
import Button from "../buttons/button/button";
import transformPrice from "../../../utils/mask/transformPrice";

import styles from "./cardApartment.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";


const CardApartment = ({
                         image,
                         title,
                         bedsCount,
                         roomsCount,
                         cost,
                         numberHotel,
                         transition,
                       }) => {
  const borderStyle = {borderBottom: `1px solid ${mainColorHotel[numberHotel]}`};

  return (
      <article
          className={`${stylesFontsT.newRoman400} ${styles.card}`}
          onClick={transition}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && transition()}
      >
        <figure style={{backgroundImage: `url(${image})`}} className={styles.img}/>
        <section className={styles.wrapperInformation}>
          <h3 className={`${stylesFontsT.newRoman700} ${styles.title}`}>{title}</h3>
          <dl>
            <div className={styles.row} style={borderStyle}>
              <dt>Количество гостей</dt>
              <dd>{bedsCount}</dd>
            </div>
            <div className={styles.row} style={borderStyle}>
              <dt>Количество комнат</dt>
              <dd>{roomsCount}</dd>
            </div>
          </dl>
        </section>
        <footer className={styles.row2}>
          <p>
            От {cost !== 0 ? transformPrice(cost) : "..."} <span className={styles.cost}>руб/сутки</span>
          </p>
          <Button text="Подробнее" hotel={numberHotel} handleClick={transition}/>
        </footer>
      </article>
  );
};

export default React.memo(CardApartment);