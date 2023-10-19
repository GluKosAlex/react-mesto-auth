import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';

export default function Register() {
  const [inputData, setInputData] = useState({ email: '', password: '' });

  //Handle multiple input change
  function handleInputsChange(evt) {
    const { name, value } = evt.target;
    setInputData({ ...inputData, [name]: value });
  }

  return (
    <>
      <Header>
        <Link to='/sign-in' className='link header__link'>
          Войти
        </Link>
      </Header>
      <main className='content page__content wrapper'>
        <section className='auth'>
          <h1 className='content__title'>Регистрация</h1>
          <form className='form'>
            <input
              id='email'
              className='form__text-input form__text-input_location_page'
              type='email'
              name='email'
              placeholder='Email'
              value={inputData.email}
              onChange={handleInputsChange}
              required
            />
            <span className='form__input-error email-error'></span>
            <input
              id='password'
              className='form__text-input form__text-input_location_page'
              type='password'
              name='password'
              placeholder='Пароль'
              value={inputData.password}
              onChange={handleInputsChange}
              required
            />
            <span className='form__input-error password-error'></span>
            <button className='form__button form__button_location_page'>Зарегистрироваться</button>
            <p className='form__button-caption'>
              Уже зарегистрированы?
              <Link to='/sign-in' className='link'>
                Войти
              </Link>
            </p>
          </form>
        </section>
      </main>
    </>
  );
}
