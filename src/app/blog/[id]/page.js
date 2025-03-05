import React from 'react';

import HeaderLineBackground from "../../../components/ui/headerLineBackgrund/headerLineBackground";
import ErrorPage from "../../../components/ui/errorLadingData/errorPage";
import ContentArticle from "../../../particles/currentArticlePage/contentArticle";

import {articlesAPI} from "../../../services/api";
import {singleRequest} from "../../../services/utils/requestUtils";

import {TIME_CASH} from "../../../config/envData";


async function fetchData(id) {
  return await singleRequest(() => articlesAPI.getCurrentArticle(id));
}

const CurrentArticlePage = async ({params: {id}}) => {
  const articleData = await fetchData(id);


  if (articleData.status !== 200) {
    return (
        <ErrorPage
            page={'ARTICLES'}
            textClient={articleData?.error || 'Произошла ошибка при загрузке данных отеля. =('}
        />
    );
  }

  const article = articleData.data.data;

  return (
      <>
        <HeaderLineBackground display={true}/>
        <ContentArticle article={article}/>
      </>
  );
};

export default CurrentArticlePage;

export const revalidate = TIME_CASH["60min"] / 1000;