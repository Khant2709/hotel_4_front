'use client'

import React, {useState} from "react";

import DesktopContent from "./desktopContent/desktopContent";
import MobileContent from "./mobileContent/mobileContent";
import Title from "../../../components/ui/title/title";

import {useWindowWidth} from "../../../hooks/UseWidth";


const TerritoryView = ({territory, images}) => {
  const width = useWindowWidth();

  const [imageHover, setImageHover] = useState(null);

  const toggleImage = (img) => {
    setImageHover(img || null);
  }

  const imagesToDesktop = images.slice(0, 4);

  return (
      <>
        <Title Tag={"h2"} text={"Територия"}/>
        {width > 768
            ? <DesktopContent
                images={imagesToDesktop} territory={territory} imageHover={imageHover} toggleImage={toggleImage}
            />
            : <MobileContent images={images} territory={territory}/>
        }
      </>
  );
};

export default TerritoryView;
