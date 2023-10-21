import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { config } from '../utils/constants';

import Header from './Header';
import FormValidator from '../utils/FormValidator.js';
import { handleInputsChange } from './../utils/utils';

export default function Login({ onLogin }) {
  const [inputData, setInputData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  function submitHandle(evt) {
    evt.preventDefault();

    onLogin(inputData)
      .then(() => setInputData({ email: '', password: '' }))
      .then(() => {
        navigate('/');
      })
      .catch(err => console.error(err));
  }

  // Enable validation
  const form = useRef();

  useEffect(() => {
    const validator = new FormValidator(config, form.current);
    validator.enableValidation();
    validator.toggleButtonState();
    validator.removeValidationErrors();
  }, []);

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
          <form ref={form} className='form' onSubmit={submitHandle}>
            <input
              id='email'
              className='form__text-input form__text-input_location_page'
              type='email'
              name='email'
              autoComplete='email'
              placeholder='Email'
              maxLength='64'
              value={inputData.email || ''}
              onChange={evt => handleInputsChange(evt, inputData, setInputData)}
              required
            />
            <span className='form__input-error email-error'></span>
            <input
              id='password'
              className='form__text-input form__text-input_location_page'
              type='password'
              name='password'
              autoComplete='new-password'
              placeholder='Пароль'
              maxLength='64'
              value={inputData.password || ''}
              onChange={evt => handleInputsChange(evt, inputData, setInputData)}
              required
            />
            <span className='form__input-error password-error'></span>
            <button className='form__button form__button_location_page'>Войти</button>
          </form>
        </section>
      </main>
    </>
  );
}
