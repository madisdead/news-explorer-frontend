import './Main.css';
import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import About from '../About/About.js';
import Preloader from '../Preloader/Preloader.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import NewsCard from '../NewsCard/NewsCard.js';
import {article1, article2, article3} from '../../utils/constants.js';

function Main() {
  return (
    <main className="main">
      <SearchForm />
      <NewsCardList visiable={false}>
        <NewsCard article={article1} />
        <NewsCard article={article2} />
        <NewsCard article={article3} />
      </NewsCardList>
      <Preloader />
      <About />
    </main>
  );
}

export default Main;
