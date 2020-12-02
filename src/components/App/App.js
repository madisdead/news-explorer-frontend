import './App.css';
import React, { useState } from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';
import Main from '../Main/Main.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import SavedNews from '../SavedNews/SavedNews.js';
import LoginPopup from '../Login/Login.js';
import RegisterPopup from '../Register/Register.js';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import * as MainApi from '../../utils/MainApi.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import newApi from '../../utils/NewsApi.js';

function App() {
  const dark = "theme_dark";
  const light = "theme_light";
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isInfoTooltippOpen, setIsInfoTooltipOpen] = useState(false);
  const [name, setName] = useState('');
  const [userArticles, setUserArticles] = useState([]);
  const history = useHistory();
  const [searchedArticles, setSearchedArticles] = useState(JSON.parse(localStorage.getItem('articles')) ? 
    JSON.parse(localStorage.getItem('articles')) : []);
  const [isResultsVisiable, setIsResultVisiable] = useState(!!JSON.parse(localStorage.getItem('articles')) ? 
    !!JSON.parse(localStorage.getItem('articles')) : false );
  const [id, setId] = useState('');
  const [numberOfNews, setNumberOfNews] = useState(3);
  
  React.useEffect(()=>{
    MainApi.getUser()
      .then((res)=>{
        setCurrentUser(res);
      }).catch((err)=>{
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    if(isRegisterPopupOpen === true || isLoginPopupOpen=== true || isMenuOpen===true) {
      document.querySelector('.app').addEventListener('keydown', handleEscClose);
    } else {
      document.querySelector('.app').removeEventListener('keydown', handleEscClose);
    }
  });

  React.useEffect(()=>{
    handleTokenCheck();
  });

  React.useEffect(()=>{
    MainApi.getArticles()
    .then((res)=>{
      setUserArticles(res);
    }).catch((err)=>{
      console.log(err);
    });
  }, []);

  function handleShowMore() {
    setNumberOfNews(numberOfNews+3);
  }

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
    setIsInfoTooltipOpen(false);
  }

  function handleRegister(email, password, name) {
    return MainApi.register(email, password, name).then((res) => {
      if(res.ok){
        closeAllPopups();
        setIsInfoTooltipOpen(true);
      } else {
        console.log('Произошла ошибка.');
      }
    });
  }

  function handleLogin(email, password) {
    return MainApi.authorize(email, password)
      .then((data)=>{
        if (data.token){
          closeAllPopups();
          setLoggedIn(true);
        }
      });
  }

  function handleTokenCheck() {
    if (localStorage.getItem('jwt')){
      const jwt = localStorage.getItem('jwt');
      MainApi.checkToken(jwt)
        .then((res) => {
          if (res){
            setName(res.name);
            setLoggedIn(true);
          }
        })
        .catch(err => console.log(err));
    }
  }

  function handleSaveArticle(articleObj){
    MainApi.saveCard(articleObj)
      .then((res)=>{
        setUserArticles([...userArticles, res]);
        setId(res._id);
      }).catch((err)=>{
        console.log(err);
    });
  }

  function handleCardDelete(card) {
    MainApi.deleteCard(card._id)
      .then(()=>{
        const newArticles = userArticles.filter(element=>element._id!==card._id);
        setUserArticles(newArticles);
      }).catch((err)=>{
        console.log(err);
      });
  }

  function handleSearch(keyword) {
    newApi.getNews(keyword)
      .then((res) => {
        localStorage.removeItem('articles');
        setNumberOfNews(3);
        setIsResultVisiable(true);

        res.articles.forEach((card) => card['keyword']=keyword );
        localStorage.setItem('articles', JSON.stringify(res.articles));
        setSearchedArticles(res.articles);
      });
  }

  function signOut(){
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setName('');
    history.push('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="app">
      <Switch>
        <Route path="/saved-news">
          <Header onSignOut={signOut} name={name} loggedIn={loggedIn} theme={dark} isMenuOpen={isMenuOpen} 
            onClose={closeAllPopups} menuClick={handleMenuClick} isRegisterPopupOpen={isRegisterPopupOpen}/>
          <ProtectedRoute path="/saved-news" loggedIn={loggedIn} component={SavedNews} articles={userArticles} handleCardDelete={handleCardDelete} id={id}>
          </ProtectedRoute>
        </Route>
        <Route path="/">
          <Header onSignOut={signOut} name={name} onLoginClick={handleAuthClick} loggedIn={loggedIn} theme={light} isMenuOpen={isMenuOpen} 
            onClose={closeAllPopups} menuClick={handleMenuClick} isRegisterPopupOpen={isRegisterPopupOpen}/>
          <Main loggedIn={loggedIn} handleSearch={handleSearch} isResultsVisiable={isResultsVisiable} articles={searchedArticles} 
            handleShowMore={handleShowMore} numberOfNews={numberOfNews} handleSaveArticle={handleSaveArticle} handleCardDelete={handleCardDelete} id={id}/>
        </Route>
      </Switch>
      <Footer />
      <LoginPopup isOpen={isLoginPopupOpen} onClose={closeAllPopups} onRegisterClick={handleRegisterClick} onLogin={handleLogin} />
      <RegisterPopup isOpen={isRegisterPopupOpen} onClose={closeAllPopups} onLoginClick={handleLoginClick} onRegister={handleRegister} />
      <PopupWithForm isOpen={isInfoTooltippOpen} title="Пользователь успешно зарегистрирован!" onClose={closeAllPopups}>
        <p className="popup__link" onClick={handleLoginClick}>Войти</p>
      </PopupWithForm>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
