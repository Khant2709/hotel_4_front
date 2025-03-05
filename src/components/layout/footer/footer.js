"use client";

import React, {useEffect, useState} from "react";
import {usePathname} from "next/navigation";

import {
  AllHotels,
  Catalog,
  CompanyInfoAndSocial,
  Contacts,
} from "./footerContent";

import {singleRequest} from "../../../services/utils/requestUtils";
import {hotelsAPI} from "../../../services/api";

import styles from "./footer.module.css";


const Footer = () => {
  const pathname = usePathname();
  const currentPath =
      pathname.split("/").length > 2 ? `/${pathname.split("/")[1]}` : pathname;
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

  return (
      <section className={styles.main}>
        <div className={styles.firstContainer}>
          <Catalog currentPath={currentPath}/>
          <AllHotels/>
          <Contacts contactsData={contactsData}/>
        </div>

        <CompanyInfoAndSocial contactsData={contactsData}/>
      </section>
  );
};

export default Footer;
