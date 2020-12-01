import React, { useState } from 'react';
import { useHistory, Route, Switch, Redirect, Link } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';

class RegisterPopup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    }
    this.state = {
      isEmailValid: true,
      isPasswordValid: true,
      isNameValid: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value 
    });
    if(e.target.classList.contains("popup__input_email")) {
      this.setState({
        isEmailValid: e.target.checkValidity()
      })
    } else if (e.target.classList.contains("popup__input_password")) {
      this.setState({
        isPasswordValid: e.target.checkValidity()
      })
    } else if  (e.target.classList.contains("popup__input_name")) {
      this.setState({
        isNameValid: e.target.checkValidity()
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onRegister(this.state.email, this.state.password, this.state.name)
      .catch(err => console.log(err));
  }

  render(){
    return (
      <PopupWithForm title="Регистрация" isOpen={this.props.isOpen} name="register" onClose={this.props.onClose} handleSubmit={this.handleSubmit}>
      <label className="popup__field">
        <span className="popup__label">E-mail</span>
        <input type="email" name="email" value={this.state.email} className="popup__input popup__input_email" id="email-input-register" onChange={this.handleChange} required placeholder="Введите почту" />
        <span className={`popup__input-error ${!this.state.isEmailValid && "popup__input-error_active"}`}>Неправильный формат email</span>
      </label>
      <label className="popup__field">
        <span className="popup__label">Пароль</span>
        <input type="password" minLength="6" name="password" value={this.state.password} className="popup__input popup__input_password" id="password-input-register" onChange={this.handleChange} required placeholder="Введите пароль" />
        <span className={`popup__input-error ${!this.state.isPasswordValid && "popup__input-error_active"}`}>Неправильный формат пароля</span>
      </label>
      <label className="popup__field">
        <span className="popup__label">Имя</span>
        <input type="text" minLength="2" name="name" value={this.state.name} className="popup__input popup__input_name" id="name-input" onChange={this.handleChange} required placeholder="Введите имя" />
        <span className={`popup__input-error ${!this.state.isNameValid && "popup__input-error_active"}`}>Неправильный формат имени</span>
      </label>
      <button disabled={!(this.state.isEmailValid&&this.state.isPasswordValid&&this.state.isNameValid)} type="submit" className={`popup__button ${!(this.state.isEmailValid&&this.state.isPasswordValid&&this.state.isNameValid) &&"popup__button_disabled"}`} onSubmit={this.handleSubmit}>Зарегистрироваться</button>
      <div className="popup__choice">
        <p className="popup__text">или</p>
        <p className="popup__link" onClick={this.props.onLoginClick}>&nbsp;Войти</p>
      </div>
      </PopupWithForm>
    );
  }
}

export default RegisterPopup;