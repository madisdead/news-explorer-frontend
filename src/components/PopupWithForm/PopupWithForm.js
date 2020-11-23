import './PopupWithForm.css';
import React from 'react';

function PopupWithForm(props) {

  function handleOverlayClose(e) {
    if (e.target.classList.contains('popup')){
      props.onClose();
    }
  }

  return (
    <section className={`popup popup_${props.name} ${props.isOpen && "popup_opened"}`} onMouseDown={handleOverlayClose}>
      <div className="popup__container">
        <div className="popup__content">
          <h2 className="popup__title">{props.title}</h2>
          <form action="#" className={`popup__form popup__form_${props.name}`} name={`${props.name}`}>
            {props.children}
          </form>
          <button className={`popup__close-button popup__close-button_${props.name}`} onClick={props.onClose}></button>
        </div>
      </div>
    </section>
  );
}

export default PopupWithForm;