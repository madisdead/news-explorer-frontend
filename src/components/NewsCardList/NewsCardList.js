import './NewsCardList.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

function NewsCardList(props) {
  return (
    <section className={`cards ${props.visiable && 'cards_visiable'}`}>
      {false ? 
      <div className="cards__not-found">
        <div className="cards__lens"></div>
        <h3 className="cards__bad-title">Ничего не найдено</h3>
        <p className="cards__text">К сожалению по вашему запросу 
          ничего не найдено.</p>
      </div>
      :
      <div className="cards__found">
        <Switch>
        <Route path="/saved-news">
        </Route>
        <Route path="/">
          <h2 className="cards__title">Результаты поиска</h2>
        </Route>
        </Switch>
        <div className="cards__grid">
          {props.children}
        </div>
        <Switch>
        <Route path="/saved-news">
        </Route>
        <Route path="/">
          <button className="cards__button">Показать еще</button>
        </Route>
        </Switch>
      </div>
      }
    </section>
  );
}

export default NewsCardList;
