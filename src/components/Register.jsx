import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { config } from '../utils/constants';

import Header from './Header';
import FormValidator from '../utils/FormValidator.js';
import { handleInputsChange } from './../utils/utils';

export default function Register({ onRegister }) {
  const [inputData, setInputData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  function submitHandle(evt) {
    evt.preventDefault();

    onRegister(inputData)
      .then(() => setInputData({ email: '', password: '' }))
      .then(() => {
        navigate('/sign-in');
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
        <Link to='/sign-in' className='link header__link'>
          Войти
        </Link>
      </Header>
      <main className='content page__content wrapper'>
        <section className='auth'>
          <h1 className='content__title'>Регистрация</h1>
          <form ref={form} className='form' onSubmit={submitHandle}>
            <input
              id='email'
              className='form__text-input form__text-input_location_page'
              type='email'
              name='email'
              autoComplete='email'
              placeholder='Email'
              minLength='5'
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
              autoComplete='current-password'
              placeholder='Пароль'
              minLength='5'
              maxLength='64'
              value={inputData.password || ''}
              onChange={evt => handleInputsChange(evt, inputData, setInputData)}
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
