'use client'

import React from 'react';
import Link from "next/link";

import styles from "./headerMain.module.css";
import stylesFontsI from "../../../styles/fonts/inter.module.css";


const HeaderMain = ({navbar, currentPath}) => (
    <div className={`${stylesFontsI.Inter300} ${styles.containerHeader}`}>
      {navbar.map(el => {
        return <Link
            key={el.id}
            href={el.link}
            className={`${el.link === currentPath && stylesFontsI.Inter700} ${styles.link}`}
        >
          {el.textRu}
        </Link>
      })}
    </div>
);

export default HeaderMain;