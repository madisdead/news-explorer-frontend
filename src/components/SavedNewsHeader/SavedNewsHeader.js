import './SavedNewsHeader.css';
import React from 'react';

function SavedNewsHeader() {
  return (
    <section className="saved-news-header">
      <p className="saved-news-header__caption">Сохранённые статьи</p>
      <h2 className="saved-news-header__title">Грета, у вас 5 сохранённых статей</h2>
      <p className="saved-news-header__text">По ключевым словам: 
        <span className="saved-news-header__keyword">{' Природа, Тайга '}</span> и 
        <span className="saved-news-header__keyword">{' 2-м другим'}</span></p>
    </section>
  );
}

export default SavedNewsHeader;


