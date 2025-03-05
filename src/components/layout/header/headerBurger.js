'use client'

import React, {useEffect, useState} from 'react';
import Image from "next/image";

import {ContactsContent, HeaderBurgerContent, NavbarContent, OtherHotels} from "./headerBurgerContent";

import {singleRequest} from "../../../services/utils/requestUtils";
import {hotelsAPI} from '../../../services/api'

import close from "../../../../public/close.png";

import styles from "./headerBurger.module.css";


const HeaderBurger = ({currentPath}) => {
  const [changeBlock, setChangeBlock] = useState(true);
  const [changeStyle, setChangeStyle] = useState(true);
  const [contactsData, setContactsData] = useState(null);

  useEffect(() => {
    singleRequest(() => hotelsAPI.getCurrentHotelData())
        .then(res => {
          setContactsData(res.data.data.hotel)
        })
        .catch(error => {
          console.warn(error.error)
        })
  }, []);


  const toggle = () => {
    setChangeStyle(!changeStyle);
    setTimeout(() => {
      setChangeBlock(!changeBlock);
    }, 500)
  }

  return (
      <>
        {
          changeBlock
              ? <HeaderBurgerContent toggle={toggle} contactsData={contactsData}/>
              : <div className={`${styles.navbar} ${changeStyle ? '' : styles.showNavbar}`}>
                <Image alt={'close'} src={close} onClick={toggle} className={styles.iconClose}/>
                <NavbarContent toggle={toggle} currentPath={currentPath}/>
                <ContactsContent contactsData={contactsData}/>
                <OtherHotels/>
              </div>
        }
      </>
  );
};

export default HeaderBurger;
