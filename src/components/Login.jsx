import React from 'react'
import { Link } from 'react-router-dom';

import Header from './Header';

export default function Login() {
  return (
    <>
      <Header>
        <Link to='/sign-up' className='link header__link'>
          Регистрация
        </Link>
      </Header>
      <main className='content page__content wrapper'>
        <section className='auth'>
          <h1 className='content__title'>Вход</h1>
          <form className='form'>
            <input
              id='email'
              className='form__text-input form__text-input_location_page'
              type='email'
              name='email'
              placeholder='Email'
              required
            />
            <span className='form__input-error email-error'></span>
            <input
              id='password'
              className='form__text-input form__text-input_location_page'
              type='password'
              name='password'
              placeholder='Пароль'
              required
            />
            <span className='form__input-error password-error'></span>
            <button className='form__button form__button_location_page'>Зарегистрироваться</button>
          </form>
        </section>
      </main>
    </>
  );
}
