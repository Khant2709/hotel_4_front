import React from 'react';

import styles from './yaMap.module.css';

const YaMap = ({code}) => (
    <iframe
        src={code || "https://yandex.ru/map-widget/v1/?um=constructor%3Acb50cfafaa5452366f623c29287055b9fb4b1b33f8e763d134a5b487d26e5f74&amp;source=constructor"}
        className={styles.map}
        title={"Расположение базы отдыха на карте"}
        width="1280"
        height="720"
        frameBorder="0"
        loading={'lazy'}
    />
);

export default YaMap;