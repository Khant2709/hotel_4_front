import React from 'react';
import Link from "next/link";

import {HOTEL_LINK} from "../../../config/envData";

import styles from "./track.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";


const PlaceView = ({articles}) => {
  return (
      <section
          className={`${stylesFontsT.newRoman400} ${styles.container}`}
      >
        <p className={styles.subtitle}>Полезная информация:</p>
        <div className={styles.container}>
          <p className={styles.subtitleMethod}>
            Достопримечательности и интересные места:
          </p>
          <ul className={styles.list}>
            {articles.map((article) => (
                <li key={article.id}>
                  {article.title} (<Link href={`${HOTEL_LINK}/blog/${article.id}`}>Посмотреть</Link>)
                </li>
            ))}
          </ul>
        </div>
      </section>
  );
};

export default PlaceView;