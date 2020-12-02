import './NewsCard.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

function NewsCard(props) {
  let isSaved = false;
  let date;
  let card = {_id: props.id};
  function dateToNormalFormat() {
    const months = ['января' , 'февраля' , 'марта' , 'апреля' , 'мая' , 'июня' , 'июля' , 'августа' , 'сентября' , 'октября' , 'ноября' , 'декабря'];
    let newDate = props.article.publishedAt.slice(0, 10).split('-');
    newDate[1] = months[newDate[1]-1];
    return `${parseInt(newDate[2])} ${newDate[1]}, ${newDate[0]}`
  }

  function handleSaveDeleteArticle(e) {
    e.preventDefault();
    if(e.target.classList.contains('card__bookmark_saved')) {
      props.onDelete(card);
      e.target.classList.remove('card__bookmark_saved');
    } else {
      const date = dateToNormalFormat();
      card = {
        keyword: props.article.keyword,
        title: props.article.title,
        text: props.article.description,
        date: date,
        source: props.article.source.name,
        link: props.article.url,
        image: props.article.urlToImage
      };
      props.onSave(card);
      e.target.classList.add('card__bookmark_saved');
    }
  }

  function handleDeleteArticle(e) {
    e.preventDefault();
    props.onDelete(props.article);
  }

  return (
    <a className="card" href={window.location.pathname === '/saved-news' ? props.article.link : props.article.url} target="_blank" rel="noreferrer">
      <Switch>
        <Route path="/saved-news">
          <p className="card__keyword">{props.article.keyword}</p>
          <button className="card__trash" onClick={handleDeleteArticle}></button>
          <p className="card__notation">Убрать из сохранённых</p>
        </Route>
        <Route path="/">
          <button disabled={!props.loggedIn} className={`card__bookmark ${isSaved && "card__bookmark_saved"}`} onClick={handleSaveDeleteArticle}></button>
          {!props.loggedIn && <p className="card__notation">Войдите, чтобы сохранять статьи</p>}
        </Route>
      </Switch>
      <img className="card__image" alt="тестовое фото" src={window.location.pathname === '/saved-news' ? props.article.image : props.article.urlToImage} />
      <p className="card__date">{window.location.pathname === '/saved-news' ? props.article.date : date = dateToNormalFormat()}</p>
      <h2 className="card__title">{props.article.title}</h2>
      <p className="card__text">{window.location.pathname === '/saved-news' ? props.article.text : props.article.description}</p>
      <p className="card__source">{window.location.pathname === '/saved-news' ? props.article.source : props.article.source.name}</p>
    </a>
  );
}

export default NewsCard;


