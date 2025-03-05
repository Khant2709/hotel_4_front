"use client";

import React, {useMemo, useState} from "react";

import {
  validateName,
  validatePhone,
} from "../../../utils/validate/validateFields";

import Button from "../buttons/button/button";

import styles from "./formCall.module.css";
import stylesFontsT from "../../../styles/fonts/timesNewRoman.module.css";
import {actionClientsAPI} from "../../../services/api";
import {formatPhoneNumber, formatPhoneNumberWithoutMask} from "../../../utils/mask/transfomNumber";
import {notifyShowToast} from "../../../utils/showToast";


const FormCall = ({text, numberHotel}) => {
  const [fields, setFields] = useState({name: "", phone: ""});
  const [fieldsTouch, setFieldsTouch] = useState({
    nameTouch: false,
    phoneTouch: false,
  });
  const [checked, setChecked] = useState(false);

  const checkName = useMemo(() => validateName(fields.name, false), [fields.name]);
  const checkPhone = useMemo(() => validatePhone(fields.phone), [fields.phone]);

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    // Применение маски к значению, если поле ввода относится к номеру телефона
    const processedValue = name === "phone" ? formatPhoneNumber(value) : value;

    setFields((prevFields) => ({...prevFields, [name]: processedValue}));
  };

  const handleCallBack = async () => {
    if (checkName.valid && checkPhone.valid && checked) {
      try {
        const resultCallBack = await actionClientsAPI.callBack({
          name: fields.name,
          phone: formatPhoneNumberWithoutMask(fields.phone)
        });

        if (resultCallBack.status === 200) {
          notifyShowToast('success', resultCallBack?.data?.message || 'Заявка успешно получена.');
        } else {
          notifyShowToast('error', resultCallBack?.data?.errorText || 'Произошла ошибка, попробуйте повторить позднее.');
        }

      } catch (e) {
        console.debug('e === ', e);
        notifyShowToast('error', e.response.data.message || 'Произошла ошибка, попробуйте повторить позднее.');
      }
    }
  };

  return (
      <section className={`${stylesFontsT.newRoman400} ${styles.containerMain}`}>
        <p className={styles.title}>Обратный звонок</p>

        <input
            className={`${stylesFontsT.newRoman400} ${styles.inp}`}
            name={"name"}
            placeholder={"Имя"}
            value={fields.name}
            onChange={handleInputChange}
            onClick={() => setFieldsTouch({...fieldsTouch, nameTouch: true})}
        />
        {fieldsTouch.nameTouch && !checkName.valid && (
            <p className={styles.errorText}>{checkName.message}</p>
        )}

        <input
            className={`${stylesFontsT.newRoman400} ${styles.inp}`}
            name={"phone"}
            placeholder={"9892436080"}
            value={fields.phone}
            onChange={handleInputChange}
            onClick={() => setFieldsTouch({...fieldsTouch, phoneTouch: true})}
        />
        {fieldsTouch.phoneTouch && !checkPhone.valid && (
            <p className={styles.errorText}>{checkPhone.message}</p>
        )}

        <div className={styles.containerCheckbox}>
          <input
              type={"checkbox"}
              value={checked}
              onChange={(e) => setChecked(!checked)}
          />
          <p>
            Соглашаюсь с правилами <span>политики конфиденциальности</span>
          </p>
        </div>

        <Button
            text={text}
            hotel={numberHotel}
            disabled={!checkName.valid || !checkPhone.valid || !checked}
            handleClick={handleCallBack}
        />
      </section>
  );
};

export default FormCall;
