import React from "react";
import Link from "next/link";
import Image from "next/image";

import { WrapperMail, WrapperPhone } from "../../ui/wrapperPhone/wrapperLink";

import { formatPhoneNumberWithMask } from "../../../utils/mask/transfomNumber";

import navbar from "../../../data/navbar";
import {
  DEFAULT_CONTACTS,
  HOTEL_ID,
  HOTELS_NAME_AND_LINK,
} from "../../../config/envData";

import iconTg from "../../../../public/iconTgFooter.svg";
import iconWt from "../../../../public/iconWtFooter.svg";
import iconInst from "../../../../public/iconInstFooter.svg";

import styles from "./footer.module.css";
import stylesFontsI from "../../../styles/fonts/inter.module.css";

export const Catalog = ({ currentPath }) => (
  <div className={styles.column}>
    <p className={`${stylesFontsI.Inter700} ${styles.title}`}>Каталог</p>
    {navbar.map((el) => {
      const isActive = el.link === currentPath;
      return (
        <Link
          key={el.id}
          href={el.link}
          className={`${
            isActive ? stylesFontsI.Inter700 : stylesFontsI.Inter300
          } ${styles.text}`}
        >
          {el.textRu}
        </Link>
      );
    })}
  </div>
);

export const AllHotels = () => (
  <div className={styles.column}>
    <p className={`${stylesFontsI.Inter700} ${styles.title}`}>Базы отдыха</p>
    {HOTELS_NAME_AND_LINK.map((hotel) => {
      const isActive = hotel.id === HOTEL_ID;
      return (
        <Link
          key={hotel.id}
          href={hotel.link}
          className={`${
            isActive ? stylesFontsI.Inter700 : stylesFontsI.Inter300
          }`}
        >
          {hotel.name}
        </Link>
      );
    })}
  </div>
);

export const Contacts = ({ contactsData }) => (
  <div className={styles.column}>
    <p className={`${stylesFontsI.Inter700} ${styles.title}`}>Контакты</p>

    <div className={styles.columnsContacts}>
      <p className={styles.subTitleContacts}>Телефон:</p>
      <WrapperPhone
        phoneNumber={formatPhoneNumberWithMask(
          contactsData?.phone || DEFAULT_CONTACTS.phone
        )}
        whatsAppNumber={contactsData?.phone || DEFAULT_CONTACTS.phone}
        telegramNumber={contactsData?.phone_tg || DEFAULT_CONTACTS.phoneTG}
      />
    </div>

    <div className={styles.columnsContacts}>
      <p className={styles.subTitleContacts}>Почта:</p>
      <WrapperMail email={contactsData?.email || DEFAULT_CONTACTS.email} />
    </div>

    <div className={styles.columnsContacts}>
      <p className={styles.subTitleContacts}>Адрес:</p>
      <a
        className={styles.address}
        href={contactsData?.link_to_ya_map || DEFAULT_CONTACTS.linkToYaMap}
        target={"_blank"}
        rel="noopener noopener"
      >
        {contactsData?.address || DEFAULT_CONTACTS.address}
      </a>
    </div>
  </div>
);

export const CompanyInfoAndSocial = ({ contactsData }) => (
  <div className={styles.wrapperSecondContainer}>
    <div className={styles.secondContainer}>
      <div className={styles.columnsSecondContainer}>
        <p>ОГРН: 315231200002780</p>
        <p>ИНН: 231200791910</p>
      </div>

      <div className={styles.columnsSecondContainer}>
        <a
          href={`https://t.me/${
            contactsData?.phone_tg || DEFAULT_CONTACTS.phoneTG
          }`}
        >
          <Image alt={"tg"} src={iconTg} />
        </a>
        <a
          href={`https://api.whatsapp.com/send?phone=${
            contactsData?.phone || DEFAULT_CONTACTS.phone
          }`}
        >
          <Image alt={"wt"} src={iconWt} />
        </a>
        <Image alt={"inst"} src={iconInst} />
      </div>
    </div>
  </div>
);
