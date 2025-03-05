'use client'

import React from 'react';

import navbar from "../../../data/navbar";
import HeaderBurger from "./headerBurger";
import HeaderMain from "./headerMain";

import styles from './header.module.css';
import {usePathname} from "next/navigation";


const Header = () => {
  const pathname = usePathname();
  const currentPath = pathname.split('/').length > 2 ? `/${pathname.split('/')[1]}` : pathname;

  return (
      <>
        <section className={styles.wrapperHeader}>
          <div className={styles.wrapperHeaderMain}>
            <HeaderMain navbar={navbar} currentPath={currentPath}/>
          </div>
          <div className={styles.wrapperHeaderBurger}>
            <HeaderBurger  currentPath={currentPath}/>
          </div>
        </section>
      </>
  );
};

export default Header;