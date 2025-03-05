import React from "react";

import ArticlesContainer from "../../particles/blogPage/articlesContainer";
import HeaderLineBackground from "../../components/ui/headerLineBackgrund/headerLineBackground";
import ErrorPage from "../../components/ui/errorLadingData/errorPage";

import {articlesAPI} from '../../services/api';
import {singleRequest} from "../../services/utils/requestUtils";

import {metaDataBlogPage} from "../../data/metaData";
import {jsonLDBlogPage} from "../../data/seoData";
import {TIME_CASH} from "../../config/envData";


export const metadata = metaDataBlogPage;

async function fetchData() {
  return await singleRequest(() => articlesAPI.getAllArticles());
}

const BlogPage = async () => {
  const articlesData = await fetchData();

  if (articlesData.status !== 200) {
    return (
        <ErrorPage
            page={'ARTICLES'}
            textClient={articlesData?.error || 'Произошла ошибка при загрузке данных отеля. =('}
        />
    );
  }

  const articles = articlesData.data.data;

  return (
      <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLDBlogPage)}}
        />
        <HeaderLineBackground display={true}/>
        <ArticlesContainer articles={articles}/>
      </>
  );
};

export default BlogPage;

export const revalidate = TIME_CASH["60min"] / 1000;