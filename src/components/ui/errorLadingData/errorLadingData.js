"use client";

import React from "react";

import styles from "./errorLadingData.module.css";
import stylesFont from "../../../styles/fonts/timesNewRoman.module.css";

const ErrorLadingData = ({ page, error, text }) => {
  // отправить на какой странице произошла ошибка на почту себе
  console.debug(`error in page${page}`);
  console.debug("Ошибка = ", error);

  return (
    <div className={`${stylesFont.newRoman700} ${styles.errorLadingData}`}>
      <p>{text}</p>
      <p>Попробуйте перезагурзить страницу позднее.</p>
    </div>
  );
};

export default ErrorLadingData;
