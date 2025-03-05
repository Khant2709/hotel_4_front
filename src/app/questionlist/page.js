import React from "react";

import HeaderLineBackground from "../../components/ui/headerLineBackgrund/headerLineBackground";

import ErrorPage from "../../components/ui/errorLadingData/errorPage";
import WrapperFaq from "../../components/ui/wrapperFaq/wrapperFaq";
import CenteredWrapper from "../../components/ui/wrapperPage/centeredWrapper";

import {faqAPI} from "../../services/api";
import {singleRequest} from "../../services/utils/requestUtils";

import {metaDataQuestionPage} from "../../data/metaData";
import {jsonLDQuestionPage} from "../../data/seoData";
import {TIME_CASH} from "../../config/envData";

import styles from '../../styles/page.module.css';


export const metadata = metaDataQuestionPage;

async function getFAQData() {
  return singleRequest(() => faqAPI.getFAQ())
}

export default async function QuestionListPage() {
  const faqData = await getFAQData();

  if (faqData.status !== 200) {
    return (
        <ErrorPage
            page={'FAQ'}
            textClient={faqData?.error || 'Произошла ошибка при загрузке данных отеля. =('}
        />
    );
  }

  const faq = faqData.data.data;
  const jsonData = jsonLDQuestionPage(faq?.data || []);

  return (
      <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(jsonData)}}
        />
        <HeaderLineBackground display={true}/>
        <CenteredWrapper>
          <div className={styles.faqWrapperPage}>
            <WrapperFaq faqData={faq}/>
          </div>
        </CenteredWrapper>
      </>
  );
}

export const revalidate = TIME_CASH["60min"] / 1000;