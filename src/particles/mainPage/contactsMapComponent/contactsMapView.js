import React from "react";

import {WrapperMail, WrapperPhone} from "../../../components/ui/wrapperPhone/wrapperLink";
import YaMap from "../../../components/ui/yaMap/yaMap";

import {formatPhoneNumberWithMask} from "../../../utils/mask/transfomNumber";

import {DEFAULT_CONTACTS} from "../../../config/envData";

import styles from "../../../styles/pageMain/sixSection.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";


const contactFields = [
  {type: "address", subtitle: "Адрес:"},
  {type: "phone", subtitle: "Телефон:"},
  {type: "email", subtitle: "Почта:"},
];


const ContactsMapView = ({address, yaMap, iframeYa, phone, phoneTg, email}) => (
    <section className={styles.main}>
      <div className={styles.map}>
        <YaMap code={iframeYa}/>
      </div>
      <div className={styles.mainWrapper}>
        <div className={`${stylesFontsT.newRoman400} ${styles.containerInformation}`}>
          <h2 className={`${stylesFontsT.newRoman700} ${styles.title}`}>Контакты</h2>
          {contactFields.map((field, index) => (
              <ContactField
                  key={index}
                  type={field.type}
                  subtitle={field.subtitle}
                  address={address}
                  yaMap={yaMap}
                  phone={phone}
                  phoneTg={phoneTg}
                  email={email}
              />
          ))}
        </div>
      </div>
    </section>
);

export default ContactsMapView;

const getContactValue = (value, defaultValue) => value || defaultValue;

const ContactField = ({ type, subtitle, address, yaMap, phone, phoneTg, email }) => {
  const defaults = DEFAULT_CONTACTS;
  const content = {
    address: (
        <a href={getContactValue(yaMap, defaults.linkToYaMap)} target="_blank" rel="noopener noreferrer">
          {getContactValue(address, defaults.address)}
        </a>
    ),
    phone: (
        <WrapperPhone
            phoneNumber={formatPhoneNumberWithMask(getContactValue(phone, defaults.phone))}
            whatsAppNumber={getContactValue(phone, defaults.phone)}
            telegramNumber={getContactValue(phoneTg, defaults.phoneTG)}
        />
    ),
    email: <WrapperMail email={getContactValue(email, defaults.email)} />,
  };

  return (
      <div className={styles.row}>
        <p className={styles.subTitle}>{subtitle}</p>
        <div className={styles.text}>{content[type]}</div>
      </div>
  );
};