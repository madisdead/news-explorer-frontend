import './SavedNews.css';
import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';
import NewsCardList from '../NewsCardList/NewsCardList.js';
import NewsCard from '../NewsCard/NewsCard.js';

function SavedNews(props) {
  return (
    <main className="saved-news">
      <SavedNewsHeader articles={props.articles}/>
      <NewsCardList visiable={true} articles={props.articles}>
        {props.articles.map((element, i) => (
          <NewsCard article={element} key={i} loggedIn={props.loggedIn} onSave={props.handleSaveArticle} onDelete={props.handleCardDelete} id={props.id}/>
        ))}
      </NewsCardList>
    </main>
  );
}

export default SavedNews;


