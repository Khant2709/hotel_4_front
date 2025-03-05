'use client'

import React, {useState} from 'react';


import styles from './button.module.css';
import stylesFontsT from '../../../../styles/fonts/timesNewRoman.module.css';
import {mainColorHotel, colorHoverBtn} from "../../../../config/colorConfig";


const Button = ({text, hotel, disabled, handleClick}) => {
  const [isHover, setIsHover] = useState(false);

  const buttonStyle = {
    background: `${mainColorHotel[hotel]}`,
    border: isHover && `4px solid ${colorHoverBtn[hotel]}`,
  }

  return (
      <button
          className={`${stylesFontsT.newRoman400} ${styles.btn} ${disabled && styles.disabled}`}
          style={buttonStyle}
          disabled={disabled}
          onClick={handleClick}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
      >
        {text || ''}
      </button>
  );
};

export default Button;