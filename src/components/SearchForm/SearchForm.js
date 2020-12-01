import './SearchForm.css';
import React, { useState } from 'react';

function SearchForm(props) {
  const [keyword, setKeyword] = useState('');

  function handleKeywordChange(e) {
    setKeyword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onSearch(keyword);
  }

  return (
    <section className="search-form">
      <h1 className="search-form__title">Что творится в мире?</h1>
      <p className="search-form__caption">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      <form className="search-form__form" onSubmit={handleSubmit}>
        <input name="search" type="text" className="search-form__input" placeholder="Введите тему новости" onChange={handleKeywordChange} />
        <button className="search-form__button">Искать</button>
      </form>
    </section>
  );
}

export default SearchForm;


