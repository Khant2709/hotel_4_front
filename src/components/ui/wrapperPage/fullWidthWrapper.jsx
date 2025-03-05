import React from 'react';

import styles from './wrapperPage.module.css';


const FullWidthWrapper = ({children}) => (
    <main className={styles.fullWidth}>{children}</main>
);

export default FullWidthWrapper;