import React from 'react';

import FormSearchDate from "../formSerchDate/formSerchDate";

import styles from './headerLineBackground.module.css';

const HeaderLineBackground = ({searchParams, display, color}) => {
    return (
        <div className={styles.backgroundLine} style={display && {height: '5.5rem'}}>
            <div className={styles.wrapperForm} style={display && {display: 'none'}}>
                <FormSearchDate color={color ? 'black' : 'white'}
                                searchParams={searchParams}
                />
            </div>
        </div>
    );
}

export default HeaderLineBackground;