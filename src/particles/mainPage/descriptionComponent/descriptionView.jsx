'use client'

import React from "react";

import Title from "../../../components/ui/title/title";
import ButtonSecondary from "../../../components/ui/buttons/buttonSecondory/buttonSecondory";

import {getFullPathImage} from "../../../utils/getFullPathImage";

import styles from "../../../styles/pageMain/fourthSection.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";
import Image from "next/image";


const DescriptionView = ({description, images, phone}) => {
  return (
      <>
        <Title Tag={"h2"} text={"О нас"}/>
        <div className={styles.wrapperMain}>
          {
            images.map((image, i) => {
              const pathToImage = getFullPathImage(image.image_path, image.image_name);
              const styleImage = `img${i + 1}`;
              return <Image
                  key={i} alt={styleImage} src={pathToImage} className={styles[styleImage]}
                  width={500} height={500}
              />
            })
          }
          <div className={styles.description}>
            <p className={stylesFontsT.newRoman400}>
              {description}
            </p>
            <a href={`tel:${phone}`}>
              <ButtonSecondary text={'Связаться с нами'} hotel={'hotel_4'}/>
            </a>
          </div>
        </div>
      </>
  );
};

export default DescriptionView;
