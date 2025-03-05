import React from 'react';

import styles from "./wrapperPage.module.css";


const CenteredWrapper = ({ children, asPage = false }) => {
  const Tag = asPage ? "main" : "section";
  return <Tag className={`${styles.centralWidth} ${asPage ? styles.hasMargin : ''}`}>
    {children}
  </Tag>;
};

export default CenteredWrapper;