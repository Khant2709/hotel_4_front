import React from "react";

import {ShortDescriptionContainer, FullDescriptionContainer} from "./content";

import {mainColorHotel} from "../../../config/colorConfig";
import {HOTEL_TYPE} from "../../../config/envData";

import styles from "./contentDescription.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";

import {generateApartmentDescription} from './fieldDescription';


const DescriptionContainer = ({currentApartment}) => {
  const shortDescription = generateApartmentDescription(currentApartment, 'short');
  const fullDescription = generateApartmentDescription(currentApartment, 'full');
  const borderStyle = {borderBottom: `2px solid ${mainColorHotel[HOTEL_TYPE]}`};

  return (
      <section className={styles.wrapperContent}>
        <div className={stylesFontsT.newRoman400} style={borderStyle}>
          <h1 className={styles.title}>{currentApartment.apartment_name}</h1>
          <ShortDescriptionContainer shortDescription={shortDescription}/>
        </div>

        <FullDescriptionContainer fullDescription={fullDescription} borderStyle={borderStyle}/>
      </section>
  );
};

export default DescriptionContainer;
