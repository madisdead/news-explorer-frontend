import './NewsCardList.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

function NewsCardList(props) {
  
  function handleShowMoreClick(){
    props.onShowMore();
  }
  
  return (
    <section className={`cards ${props.visiable && 'cards_visiable'}`}>
      {!props.articles.length ? 
      <Switch>
        <Route path="/saved-news" />
        <Route path="/">
          <div className="cards__not-found">
            <div className="cards__lens"></div>
            <h3 className="cards__bad-title">Ничего не найдено</h3>
            <p className="cards__text">К сожалению по вашему запросу 
              ничего не найдено.</p>
          </div>
        </Route>
      </Switch>
      :
      <div className="cards__found">
        <Switch>
          <Route path="/saved-news" />
          <Route path="/">
            <h2 className="cards__title">Результаты поиска</h2>
          </Route>
          </Switch>
          <div className="cards__grid">
            {props.children}
          </div>
          <Switch>
          <Route path="/saved-news" />
          <Route path="/">
            {props.numberOfNews<=props.articles.length && <button onClick={handleShowMoreClick} className="cards__button">Показать еще</button>}
          </Route>
        </Switch>
      </div>
      }
    </section>
  );
}

export default NewsCardList;
