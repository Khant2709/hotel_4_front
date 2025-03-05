import React from "react";
import Image from "next/image";

import styles from "./TitleMainPage.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";

import vectorMain from "../../../../public/VectorMain.png";
import VectorBrown from "../../../../public/VectorBrown.png";
import VectorBlue from "../../../../public/VectorBlue.png";
import VectorWave from "../../../../public/VectorWave.png";

const TitleMainPage = ({ text, hasTopLine, hotel, hasNameHotel }) => {
  const typeLine = {
    hotel_1: vectorMain,
    hotel_2: VectorBrown,
    hotel_3: VectorBlue,
    hotel_4: VectorWave,
  };

  return (
    <div className={styles.wrapperTitle}>
      {hasTopLine && (
        <Image
          alt={"line"}
          src={hotel ? typeLine[hotel] : vectorMain}
          className={styles.line}
        />
      )}
      {text !== "Сан Марина" && hasNameHotel && (
        <p className={styles.nameHotel}>База отдыха</p>
      )}
      <p className={stylesFontsT.newRoman400}>{text}</p>
      <Image
        alt={"line"}
        src={hotel ? typeLine[hotel] : vectorMain}
        className={styles.line}
      />
    </div>
  );
};

export default TitleMainPage;
