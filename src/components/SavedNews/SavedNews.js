import './SavedNews.css';
import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import NewsCard from '../NewsCard/NewsCard.js';
import {article4, article5, article6, article7, article8} from '../../utils/constants.js';

function SavedNews() {
  return (
    <main className="saved-news">
      <SavedNewsHeader />
      <NewsCardList visiable={true}>
        <NewsCard article={article4} />
        <NewsCard article={article5} />
        <NewsCard article={article6} />
        <NewsCard article={article7} />
        <NewsCard article={article8} />
      </NewsCardList>
    </main>
  );
}

export default SavedNews;


