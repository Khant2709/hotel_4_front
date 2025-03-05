import React from 'react';

import {getFullPathImage} from "../../../../utils/getFullPathImage";

import styles from './desktopContent.module.css';
import stylesFont from '../../../../styles/fonts/timesNewRoman.module.css';


const DesktopContent = ({territory, images, imageHover, toggleImage}) => {
  return (
      <div className={styles.container}>
        <p className={`${stylesFont.newRoman400} ${styles.text}`}>{territory}</p>
        <div
            className={`${styles.containerImages} ${imageHover ? styles.showImage : ''}`}
            onMouseOut={() => toggleImage()}
        >
          {
            imageHover
                ? <div style={{backgroundImage: `url(${imageHover})`}} className={styles.image}/>
                : <>
                  {images.map((image) => {
                    const pathToImage = getFullPathImage(image.image_path, image.image_name);
                    return <div
                        key={image.id}
                        onMouseEnter={() => toggleImage(pathToImage)}
                        style={{backgroundImage: `url(${pathToImage})`}}
                        className={styles.image}
                    />
                  })}
                </>
          }
        </div>
      </div>
  );
};

export default DesktopContent;