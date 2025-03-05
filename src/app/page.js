import BannerContainer from "../particles/mainPage/bannerComponent/bannerContainer";
import ApartmentsByHotelComponent from "../particles/mainPage/apartmentsByHotelComponent/apartmentsByHotelComponent";
import TerritoryView from "../particles/mainPage/territoryComponent/territoryView";
import DescriptionView from "../particles/mainPage/descriptionComponent/descriptionView";
import ContactsMapView from "../particles/mainPage/contactsMapComponent/contactsMapView";

import WrapperFaq from "../components/ui/wrapperFaq/wrapperFaq";
import FullWidthWrapper from "../components/ui/wrapperPage/fullWidthWrapper";
import CenteredWrapper from "../components/ui/wrapperPage/centeredWrapper";
import ErrorPage from "../components/ui/errorLadingData/errorPage";
import FormSearchDate from "../components/ui/formSerchDate/formSerchDate";

import {batchRequest} from "../services/utils/requestUtils";
import {hotelsAPI, apartmentsAPI, faqAPI} from '../services/api';

import {jsonLDMainPage} from "../data/seoData";
import {metaDataMainPage} from "../data/metaData";
import {TIME_CASH} from "../config/envData";

import styles from "../styles/page.module.css";


export const metadata = metaDataMainPage;

async function fetchData() {
  const initial = {
    currentHotelData: null,
    faqFromHotel: null,
    apartmentsFromHotel: null,
  };

  const request = [
    () => hotelsAPI.getCurrentHotelData(),
    () => faqAPI.getFAQ(),
    () => apartmentsAPI.getApartmentByHotel(),
  ];

  return await batchRequest(initial, request);
}

export default async function Home() {
  const {currentHotelData, apartmentsFromHotel, faqFromHotel} =
      await fetchData();

  if (currentHotelData.status !== 200 || apartmentsFromHotel.status !== 200) {
    return (
        <ErrorPage
            page={'HOME'}
            textClient={currentHotelData?.error || apartmentsFromHotel?.error || 'Произошла ошибка при загрузке данных отеля. =('}
        />
    );
  }

  const hotelMainData = currentHotelData.data.data.hotel;
  const hotelImages = currentHotelData.data.data.images;
  const apartments = apartmentsFromHotel.data.data;

  const {
    name,
    territory,
    description,
    address,
    link_to_ya_map,
    code_iframe_map,
    phone,
    phone_tg,
    email,
  } = hotelMainData;

  const grouped = hotelImages.reduce((acc, img) => {
        if (img.image_type === "banner" && !acc.banner) acc.banner = img;
        if (img.image_type === "aboutUs") {
          acc.aboutUs.push(img);
        }
        if (img.image_type === "territory") {
          if (img.priority === 0 && !acc.mainTerritory) {
            acc.mainTerritory = img;
          } else {
            acc.territory.push(img);
          }
        }
        return acc;
      },
      {banner: null, mainTerritory: null, territory: [], aboutUs: []}
  );

  const hasFaq = faqFromHotel.status !== 200 || faqFromHotel.data.data.length === 0;

  return (
      <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDMainPage)}}
        />
        <FullWidthWrapper>
          <BannerContainer name={name} banner={grouped.banner}/>
          <CenteredWrapper>
            <div className={styles.wrapperForm}>
              <FormSearchDate/>
            </div>
            <TerritoryView territory={territory} images={grouped.territory}/>
            <ApartmentsByHotelComponent apartments={apartments}/>
            <DescriptionView description={description} images={grouped.aboutUs} phone={phone}/>
            {!hasFaq && <WrapperFaq faqData={faqFromHotel.data.data} hasSlice={true}/>}
          </CenteredWrapper>
          <ContactsMapView
              address={address}
              yaMap={link_to_ya_map}
              iframeYa={code_iframe_map}
              phone={phone}
              phoneTg={phone_tg}
              email={email}
          />
        </FullWidthWrapper>
      </>
  );
}

export const revalidate = TIME_CASH["60min"] / 1000;
