import './Navigation.css';
import React from 'react';
import { Link } from 'react-router-dom';
import github from '../../images/github.png';
import fb from '../../images/fb.png';

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__links">
        <li>
          <Link to="/" className="navigation__link">Главная</Link>
        </li>
        <li>
          <a href="https://praktikum.yandex.ru/" className="navigation__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
        </li>
      </ul>
      <ul className="navigation__social">
        <li>
          <a href="https://github.com/madisdead/" className="navigation__social-link" target="_blank" rel="noreferrer">
            <img src={github} alt="github"/>
          </a>
        </li>
        <li>
          <a href="https://ru-ru.facebook.com/" className="navigation__social-link" target="_blank" rel="noreferrer">
            <img src={fb} alt="facebook"/>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;


