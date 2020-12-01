import './Main.css';
import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import About from '../About/About.js';
import Preloader from '../Preloader/Preloader.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import NewsCard from '../NewsCard/NewsCard.js';

function Main(props) {
  return (
    <main className="main">
      <SearchForm onSearch={props.handleSearch} />
      <NewsCardList visiable={props.isResultsVisiable} articles={props.articles} onShowMore={props.handleShowMore} numberOfNews={props.numberOfNews}>
        {props.articles.slice(0, props.numberOfNews).map((element, i) => (
          <NewsCard article={element} key={element.title} loggedIn={props.loggedIn} onSave={props.handleSaveArticle} onDelete={props.handleCardDelete} id={props.id}/>
        ))}
      </NewsCardList>
      <Preloader />
      <About />
    </main>
  );
}

export default Main;
