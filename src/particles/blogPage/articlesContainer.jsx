'use client'

import React from 'react';
import {useRouter} from "next/navigation";

import Title from "../../components/ui/title/title";
import CenteredWrapper from "../../components/ui/wrapperPage/centeredWrapper";

import {getFullPathImage} from "../../utils/getFullPathImage";
import {transformDateFormat} from "../../utils/getDay";

import styles from './articlesContainer.module.css';
import stylesFont from '../../styles/fonts/timesNewRoman.module.css';


const ArticlesContainer = ({articles}) => {
  const router = useRouter();

  return (
      <CenteredWrapper asPage>
        <Title Tag={'h1'} text={'Статьи'}/>
        <div className={styles.containerArticles}>
          {articles.map(article => {
            return <CardArticle key={article.id} article={article} handleClick={() => router.push(`/blog/${article.id}`)}/>
          })}
        </div>
      </CenteredWrapper>
  );
};

export default ArticlesContainer;

const CardArticle = ({article, handleClick}) => (
    <div className={`${stylesFont.newRoman400} ${styles.cardArticle}`} onClick={() => handleClick(article.id)}>
      <div
          className={styles.previewImage}
          style={{backgroundImage: `url(${getFullPathImage(article.folder_img, article.preview_img_name)})`}}
      />
      <p className={styles.title}>{article.title}</p>
      <p className={styles.text}>{article.short_text}</p>
      <div className={styles.containerMore}>
        <p className={styles.miniBtn} onClick={() => handleClick(article.id)}>открыть</p>
        <p>{transformDateFormat(article.date.split('T')[0])}г.</p>
      </div>
    </div>
)