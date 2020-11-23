import './App.css';
import React, { useState } from 'react';
import { useHistory, Route, Switch, Redirect, Link } from 'react-router-dom';
import Main from '../Main/Main.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import SavedNews from '../SavedNews/SavedNews.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';


function App() {
  const dark = "theme_dark";
  const light = "theme_light";
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  React.useEffect(() => {
    if(isRegisterPopupOpen=== true || isLoginPopupOpen=== true || isMenuOpen===true) {
      document.querySelector('.app').addEventListener('keydown', handleEscClose);
    } else {
      document.querySelector('.app').removeEventListener('keydown', handleEscClose);
    }
  });

  function handleMenuClick() {
    if(isMenuOpen===true || isRegisterPopupOpen===true) {
      closeAllPopups();
    } else {
      setIsMenuOpen(true);
    }
  }

  function handleEscClose(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleAuthClick() {
    setIsLoginPopupOpen(true);
  }

  function handleRegisterClick() { 
    closeAllPopups();
    setIsRegisterPopupOpen(true);
  }

  function handleLoginClick() {
    closeAllPopups();
    setIsLoginPopupOpen(true);
  }

  function closeAllPopups() {
    setIsMenuOpen(false);
    setIsRegisterPopupOpen(false);
    setIsLoginPopupOpen(false);
  }

  return (
    <div className="app">
      <Switch>
        <Route path="/saved-news">
          <Header loggedIn={loggedIn} theme={dark} isMenuOpen={isMenuOpen} onClose={closeAllPopups} menuClick={handleMenuClick} isRegisterPopupOpen={isRegisterPopupOpen}/>
          <SavedNews />
        </Route>
        <Route path="/">
          <Header onLoginClick={handleAuthClick} loggedIn={loggedIn} theme={light} isMenuOpen={isMenuOpen} onClose={closeAllPopups} menuClick={handleMenuClick} isRegisterPopupOpen={isRegisterPopupOpen}/>
          <Main />
        </Route>
      </Switch>
      <Footer />
      <PopupWithForm title="Вход" isOpen={isLoginPopupOpen} name="login" onClose={closeAllPopups}>
        <label className="popup__field">
          <span className="popup__label">E-mail</span>
          <input type="email" className="popup__input popup__input_email" id="email-input-login" required placeholder="Введите почту" />
        </label>
        <label className="popup__field">
          <span className="popup__label">Пароль</span>
          <input type="password" className="popup__input popup__input_password" id="password-input-login" required placeholder="Введите пароль" />
        </label>
        <button type="button" className="popup__button popup__button_disabled">Войти</button>
        <div className="popup__choice">
          <p className="popup__text">или</p>
          <a className="popup__link" onClick={handleRegisterClick}>&nbsp;Зарегистрироваться</a>
        </div>
      </PopupWithForm>
      <PopupWithForm title="Регистрация" isOpen={isRegisterPopupOpen} name="register" onClose={closeAllPopups}>
        <label className="popup__field">
          <span className="popup__label">E-mail</span>
          <input type="email" className="popup__input popup__input_email" id="email-input-register" required placeholder="Введите почту" />
        </label>
        <label className="popup__field">
          <span className="popup__label">Пароль</span>
          <input type="password" className="popup__input popup__input_password" id="password-input-register" required placeholder="Введите пароль" />
        </label>
        <label className="popup__field">
          <span className="popup__label">Имя</span>
          <input type="text" className="popup__input popup__input_name" id="name-input" required placeholder="Введите имя" />
        </label>
        <button type="button" className="popup__button popup__button_disabled">Зарегистрироваться</button>
        <div className="popup__choice">
          <p className="popup__text">или</p>
          <a className="popup__link" onClick={handleLoginClick}>&nbsp;Войти</a>
        </div>
      </PopupWithForm>
    </div>
  );
}

export default App;
