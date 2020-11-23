import './Header.css';
import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import logout from '../../images/logout.svg';
import logoutDark from '../../images/logout-dark.svg';

function Header(props) {

  React.useEffect(() => {
    if(props.isMenuOpen===true || props.isRegisterPopupOpen===true) {
      document.querySelector('.header__menu-button').classList.add('header__menu-close');
    } else {
      document.querySelector('.header__menu-button').classList.remove('header__menu-close');
    }
  });

  return (
    <header className={`header header_${props.theme}`}>
      <div className="header__content">
        <Link to="/" className={`header__title header__title_${props.theme}`} onClick={props.onClose}>NewsExplorer</Link>
        <button className={`header__menu-button header__menu-button_${props.theme}`} onClick={props.menuClick}></button>
        <div className={`header__menu ${props.isMenuOpen && 'header__menu_opened'}`}>
          <div className="header__box">
            <Link to="/" className={`header__title`} onClick={props.onClose}>NewsExplorer</Link>
          </div>
          <Link to="/" className={`header__link`} onClick={props.onClose}>Главная</Link>
          {props.loggedIn && <Link to="/saved-news" className={`header__link`} onClick={props.onClose}>Сохраненные статьи</Link>}
          { props.loggedIn ?
              <button className={`header__button`} onMouseUp={props.onClose}>
                Грета
                <img src={logout} alt="выход" className="header__logout" />
              </button>
              :
              <button className={`header__button`} onClick={props.onLoginClick}>
                Авторизоваться
              </button>
          }
        </div>
        <div className={`header__container`}>
          <Switch>
            <Route path="/saved-news">
              <Link to="/" className={`header__link header__link_${props.theme} header__link_${props.theme}_not-selected`}>Главная</Link>
              <Link to="/saved-news" className={`header__link header__link_${props.theme} header__link_${props.theme}_selected`}>Сохраненные статьи</Link>
              <button className={`header__button header__button_${props.theme}`}>
                Грета
                <img src={logoutDark} alt="выход" className="header__logout" />
              </button>
            </Route>
            <Route path="/">
              <Link to="/" className="header__link header__link_selected">Главная</Link>
              {props.loggedIn && <Link to="/saved-news" className="header__link header__link_not-selected">Сохраненные статьи</Link>}
              { props.loggedIn ?
              <button className={`header__button`}>
                Грета
                <img src={logout} alt="выход" className="header__logout" />
              </button>
              :
              <button className={`header__button`} onClick={props.onLoginClick}>
                Авторизоваться
              </button>
              }
            </Route>
          </Switch>
        </div>
      </div>
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
