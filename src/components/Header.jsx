import React from 'react';
import logo from './../images/logo.svg';

export default function Header() {
  return (
    <header className='header wrapper'>
      <img className='header__logo' src={logo} alt='Логотип сайта Mesto Russia' />
    </header>
  );
}
