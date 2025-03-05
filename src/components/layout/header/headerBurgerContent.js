import React from "react";
import Link from "next/link";
import Image from "next/image";

import {WrapperMail, WrapperPhone} from "../../ui/wrapperPhone/wrapperLink";

import {formatPhoneNumberWithMask} from "../../../utils/mask/transfomNumber";

import navbar from "../../../data/navbar";
import {
  DEFAULT_CONTACTS,
  HOTEL_ID,
  HOTELS_NAME_AND_LINK,
} from "../../../config/envData";

import burger from "../../../../public/burger.png";
import call from "../../../../public/callMobile.svg";

import styles from "./headerBurger.module.css";
import stylesFontsI from "../../../styles/fonts/inter.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";


export const HeaderBurgerContent = ({toggle, contactsData}) => {
  const {name} = HOTELS_NAME_AND_LINK.find((el) => el.id === HOTEL_ID);
  return (
      <div className={styles.wrapperHeaderMobile}>
        <div className={styles.containerHeaderMobile}>
          <div className={styles.wrapperBurger}>
            <Image
                alt={"burger"}
                src={burger}
                className={styles.iconBurger}
                onClick={toggle}
            />
          </div>
          <p className={styles.title}>{name}</p>
          <a href={`tel:${contactsData?.phone || DEFAULT_CONTACTS.phone}`}>
            <Image alt={"call"} src={call} className={styles.iconCall}/>
          </a>
        </div>
      </div>
  );
};

export const NavbarContent = ({toggle, currentPath}) => (
    <div className={styles.containerNavbar}>
      {navbar.map((el) => {
        return (
            <Link
                key={el.id}
                href={el.link}
                onClick={toggle}
                className={`${el.link === currentPath && stylesFontsI.Inter700}
                                                 ${
                    el.link === currentPath &&
                    styles.activeLink
                } 
                                                 ${styles.link}`}
            >
              {el.textRu}
            </Link>
        );
      })}
    </div>
);

export const ContactsContent = ({contactsData}) => (
    <div className={styles.containerContacts}>
      <div
          className={`${stylesFontsT.newRoman400} ${styles.rowContainerContacts}`}
      >
        <p className={styles.subTitle}>Наш номер:</p>
        <WrapperPhone
            phoneNumber={formatPhoneNumberWithMask(
                contactsData?.phone || DEFAULT_CONTACTS.phone
            )}
            whatsAppNumber={contactsData?.phone || DEFAULT_CONTACTS.phone}
            telegramNumber={contactsData?.phone_tg || DEFAULT_CONTACTS.phoneTG}
        />
      </div>
      <div
          className={`${stylesFontsT.newRoman400} ${styles.rowContainerContacts}`}
      >
        <p className={styles.subTitle}>Наша почта:</p>
        <WrapperMail email={contactsData?.email || DEFAULT_CONTACTS.email}/>
      </div>
      <div
          className={`${stylesFontsT.newRoman400} ${styles.rowContainerContacts}`}
      >
        <p className={styles.subTitle}>Наш адресс:</p>
        <a
            rel="noopener noopener"
            target={"_blank"}
            href={contactsData?.link_to_ya_map || DEFAULT_CONTACTS.linkToYaMap}
        >
          {contactsData?.address || DEFAULT_CONTACTS.address}
        </a>
      </div>
    </div>
);

export const OtherHotels = () => (
    <div className={`${stylesFontsT.newRoman400} ${styles.containerOtherHotels}`}>
      <p className={styles.titleOtherHotels}>Другие наши отели:</p>
      {HOTELS_NAME_AND_LINK.map((hotel) => {
        if (hotel.id !== HOTEL_ID) {
          return (
              <Link
                  className={`${stylesFontsT.newRoman400} ${styles.hotelName}`}
                  href={hotel.link}
                  key={hotel.id}
              >
                {hotel.name}
              </Link>
          );
        }
      })}
    </div>
);
