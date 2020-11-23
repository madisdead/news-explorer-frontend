import './Preloader.css';
import React from 'react';

function Preloader() {
  return (
    <section className="preloader">
        <i className="preloader__cirlce"></i>
        <p className="preloader__text">Идет поиск новостей...</p>
    </section>
  );
}

export default Preloader;


