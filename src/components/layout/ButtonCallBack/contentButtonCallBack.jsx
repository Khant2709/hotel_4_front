import React from 'react';

import {InputField, InputFieldCheckbox} from "../../ui/fields/fields";

import styles from "./ButtonCallBack.module.css";
import stylesFont from "../../../styles/fonts/timesNewRoman.module.css";

const ContentButtonCallBack = ({
                                   toggleCallBackForm,
                                   buttonState,
                                   fields,
                                   handleFieldsChange,
                                   hasFieldsError,
                                   handleSubmitCallBack
                               }) => {
    return (
        <>
            <div
                onClick={toggleCallBackForm}
                className={`${stylesFont.newRoman400} ${styles.startBtn} 
                    ${buttonState.isButton ? styles.startBtnExpanded : ""} 
                    ${buttonState.hiddenButton ? styles.hidden : ""}`}
            >
                Заказать звонок
            </div>

            <div
                className={`${stylesFont.newRoman400} ${styles.formStart} 
                    ${!buttonState.isButton && buttonState.hiddenButton ? styles.startFormExpanded : ""} 
                    ${!buttonState.hiddenButton ? styles.hidden : ""}`}
            >
                <p className={styles.title}>Заявка на обратный звонок</p>

                {fields.map((field, i) => {
                    if (field.type !== 'checkbox') {
                        return (
                            <InputField
                                key={i}
                                field={field}
                                onChange={handleFieldsChange}
                                styleCustom={styles.iptText}
                            />
                        );
                    } else {
                        return (
                            <InputFieldCheckbox
                                key={i}
                                field={field}
                                onChange={handleFieldsChange}
                                styleCustom={styles.label}
                            />
                        );
                    }
                })}
                <button onClick={toggleCallBackForm}>Передумал(a)</button>
                <button disabled={hasFieldsError} onClick={handleSubmitCallBack}>
                    Отправить
                </button>
            </div>
        </>
    );
};

export default React.memo(ContentButtonCallBack);