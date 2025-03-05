"use client";

import React, {useCallback, useMemo, useState} from "react";

import {ReservationWindow} from "./reservationWindow";

import {formatPhoneNumberWithoutMask} from "../../../utils/mask/transfomNumber";
import {handleFieldChange} from "../../../utils/handleFieldChange";
import {notifyShowToast} from "../../../utils/showToast";

import {useReservationStore} from "../../../stores/reservationStore";

import {actionClientsAPI} from "../../../services/api";

import {fieldsDefault, reservationFields} from "./fields";


const prepareReservationData = ({dataReservation, fields}) => {
  const {
    idHotel,
    idApartment,
    apartment_number,
    countAdults,
    countChildren,
    startData,
    endData,
    finishPrice,
  } = dataReservation;

  const data = {
    hotel_id: idHotel,
    apartment_id: idApartment,
    apartment_number: apartment_number,
    count_adults: +countAdults,
    count_children: +countChildren,
    start_date: startData,
    end_date: endData,
    total_price: finishPrice,
    status: "WAITING",
  };

  return fields.reduce((acc, field) => {
    if (field.name === "checkbox") return acc;
    let value;

    switch (field.name) {
      case "guest_phone":
        value = formatPhoneNumberWithoutMask(field.value);
        break;
      case "comments":
        value = field?.value || "нет";
        break;
      default:
        value = field.value;
        break;
    }

    acc[field.name] = value;
    return acc;
  }, data);
};

const WindowPopUp = () => {
  const {isPopUpOpen, openClosePopUp, dataReservation, clearReservation} = useReservationStore();
  const [fields, setFields] = useState(fieldsDefault);
  const fieldCheckbox = fields.find((field) => field.type === "checkbox");

  const checkDataReservation = useMemo(
      () =>
          Object.keys(dataReservation)
              .every((key) => key !== "countChildren" ? !!dataReservation[key] : true),
      [dataReservation]
  );

  const checkFields = useMemo(
      () =>
          fields.every((field) =>
              field.isEdit ? !field.errorText : field.name === "comments"
          ),
      [fields]
  );

  const handleFieldsChange = useCallback(
      (e) => {
        handleFieldChange(e, fields, setFields);
      },
      [fields]
  );

  const dataReservationFields = checkDataReservation && reservationFields(dataReservation);

  const closeWindow = () => {
    setFields(fieldsDefault);
    clearReservation();
    openClosePopUp();
  }

  const sendReservation = async () => {
    if (checkDataReservation && checkFields) {
      const finishData = prepareReservationData({dataReservation, fields});
      const result = await actionClientsAPI.createReservation(finishData);

      if (result.status === 200) {
        notifyShowToast(
            "success",
            result?.data?.message ||
            "Благодарим за бронирование, прошло успешно. Вам должно придти письмо на указанную почту (в течении часа), если письмо не пришло напишите или позвоните нам."
        );
        closeWindow();
      } else {
        notifyShowToast(
            "error",
            result?.response?.data?.errorText ||
            "Произшла ошибка при бронировании, попробуйте пожалуйста заново."
        );
      }
    }
  };

  if (!isPopUpOpen) return null;

  if (!checkDataReservation) {
    openClosePopUp();
    notifyShowToast('error', 'Произшла ошибка в заполнении данных брони, перезагрузите страницу и попробуйте заного пожалуйста.');
  }

  return (
      <ReservationWindow
          fields={fields}
          fieldCheckbox={fieldCheckbox}
          handleFieldsChange={handleFieldsChange}
          hotelName={dataReservation?.nameHotel || "Ошибка"}
          apartmentName={dataReservation?.nameApartment || "Ошибка"}
          disableBtn={!checkDataReservation || !checkFields}
          closeWindow={closeWindow}
          dataReservationFields={dataReservationFields}
          sendReservation={sendReservation}
      />
  );
};

export default WindowPopUp;