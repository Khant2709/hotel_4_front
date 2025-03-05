import React from 'react';
import Image from "next/image";

import FormCall from "../../../components/ui/formCall/formCall";
import FormSearchDate from "../../../components/ui/formSerchDate/formSerchDate";

import iconDown from "../../../../public/iconDown.png";

import styles from "../../../styles/pageMain/firstSection.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";


const BannerView = ({imageUrl, imageParams, hotelName, hotelType}) => (
    <section className={styles.main}>
      <Image
          alt="background"
          src={imageUrl}
          priority
          width={imageParams.width}
          height={imageParams.height}
          className={styles.background}
          style={{objectFit: "cover"}}
      />

      <div className={styles.wrapperHotels}>
        <h1 className={`${stylesFontsT.newRoman400} ${styles.title}`}>
          Апартаменты
          <br/>
          <span className={styles.title2}>{hotelName}</span>
        </h1>
        <div className={styles.wrapperFormCall}>
          <FormCall text={"Заказать"} numberHotel={hotelType}/>
        </div>
        <div className={styles.wrapperFormSearch}>
          <FormSearchDate
              color={"white"}
          />
        </div>
      </div>
      <Image alt={"down"} src={iconDown} className={styles.iconDown}/>
    </section>
);

export default BannerView;