import React from 'react';
import {WrapperMail, WrapperPhone} from "../../../components/ui/wrapperPhone/wrapperLink";
import {formatPhoneNumberWithMask} from "../../../utils/mask/transfomNumber";
import {DEFAULT_CONTACTS} from "../../../config/envData";

import styles from './contactsView.module.css';
import stylesFont from '../../../styles/fonts/timesNewRoman.module.css';


const ContactsView = ({hotel}) => (
    <section className={`${stylesFont.newRoman400} ${styles.container}`}>
      <section className={styles.row}>
        <p className={styles.subtitle}>Наш номер:</p>
        <WrapperPhone
            phoneNumber={formatPhoneNumberWithMask(hotel?.phone || DEFAULT_CONTACTS.phone)}
            telegramNumber={hotel?.phone_tg || DEFAULT_CONTACTS.phoneTG}
            whatsAppNumber={hotel?.phone || DEFAULT_CONTACTS.phone}
        />
      </section>

      <section className={styles.row}>
        <p className={styles.subtitle}>Наша почта:</p>
        <WrapperMail email={hotel?.email || DEFAULT_CONTACTS.email}/>
      </section>
    </section>
);

export default ContactsView;