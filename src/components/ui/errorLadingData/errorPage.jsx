'use client'

import React from 'react';

import {usePreloader} from "../../../hooks/usePreloader";

import FullWidthWrapper from "../wrapperPage/fullWidthWrapper";
import HeaderLineBackground from "../headerLineBackgrund/headerLineBackground";

import stylesFont from "../../../styles/fonts/timesNewRoman.module.css";
import styles from "./errorLadingData.module.css";


const ErrorPage = ({page, textClient}) => {
  const {isLoading, setIsLoading} = usePreloader();

  if (isLoading) {
    setIsLoading(false);
  }

  console.error(`! Error in page: ${page}`);
  return (
      <FullWidthWrapper>
        <HeaderLineBackground display={true}/>
        <div className={`${stylesFont.newRoman700} ${styles.errorContainer}`}>
          <p>{textClient}</p>
          <p>Попробуйте перезагурзить страницу позднее.</p>
        </div>
      </FullWidthWrapper>
  );
};

export default ErrorPage;