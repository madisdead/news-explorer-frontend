import './NewsCard.css';
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

function NewsCard(props) {
  return (
    <div className="card">
      <Switch>
        <Route path="/saved-news">
          <p className="card__keyword">{props.article.keyword}</p>
          <button className="card__trash"></button>
        </Route>
        <Route path="/">
          <button className="card__bookmark"></button>
        </Route>
      </Switch>
      <img className="card__image" alt="тестовое фото" src={props.article.image} />
      <p className="card__date">{props.article.date}</p>
      <h2 className="card__title">{props.article.title}</h2>
      <p className="card__text">{props.article.text}</p>
      <p className="card__source">{props.article.source}</p>
    </div>
  );
}

export default NewsCard;


