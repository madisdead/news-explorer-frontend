import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';

class LoginPopup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      emailLogin: '',
      passwordLogin: ''
    }
    this.state = {
      isEmailValid: true,
      isPasswordValid: true
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
    }
  }

  handleSubmit(e){
    e.preventDefault();
    if (!this.state.emailLogin || !this.state.passwordLogin){
      return;
    }
    this.props.onLogin(this.state.emailLogin, this.state.passwordLogin)
      .then(() => {
        this.setState({emailLogin: '', passwordLogin: ''}); 
      })
      .catch(err => console.log(err));
  }


  render(){
    return (
    <PopupWithForm title="Вход" isOpen={this.props.isOpen} name="login" onClose={this.props.onClose} handleSubmit={this.handleSubmit}>
      <label className="popup__field">
        <span className="popup__label">E-mail</span>
        <input type="email" value={this.state.emailLogin} onChange={this.handleChange} className="popup__input popup__input_email" 
          id="email-input-login" name="emailLogin" required placeholder="Введите почту" />
        <span className={`popup__input-error ${!this.state.isEmailValid && "popup__input-error_active"}`}>Неправильный формат email</span>
      </label>
      <label className="popup__field">
        <span className="popup__label">Пароль</span>
        <input minLength="6" type="password" value={this.state.passwordLogin} onChange={this.handleChange} 
          className="popup__input popup__input_password" id="password-input-login" name="passwordLogin" required placeholder="Введите пароль" />
        <span className={`popup__input-error ${!this.state.isPasswordValid && "popup__input-error_active"}`}>Неправильный формат пароля</span>
      </label>
      <button disabled={!(this.state.isEmailValid&&this.state.isPasswordValid)} type="submit" 
        className={`popup__button ${!(this.state.isEmailValid&&this.state.isPasswordValid) && "popup__button_disabled"}`} onSubmit={this.handleSubmit}>Войти</button>
      <div className="popup__choice">
        <p className="popup__text">или</p>
        <p className="popup__link" onClick={this.props.onRegisterClick}>&nbsp;Зарегистрироваться</p>
      </div>
    </PopupWithForm>
  );
}
}

export default LoginPopup;