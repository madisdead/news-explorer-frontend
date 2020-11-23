import './SearchForm.css';
import React from 'react';

function SearchForm() {
  return (
    <section className="search-form">
      <h1 className="search-form__title">Что творится в мире?</h1>
      <p className="search-form__caption">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      <form className="search-form__form">
        <input name="search" type="text" className="search-form__input" placeholder="Введите тему новости"/>
        <button className="search-form__button">Искать</button>
      </form>
    </section>
  );
}

export default SearchForm;


