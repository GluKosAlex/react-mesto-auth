import React from 'react';
import logo from './../images/logo.svg';

export default function Header({ children, className }) {
  return (
    <header className={`header ${className || ''}`}>
      <img className='header__logo' src={logo} alt='Логотип сайта Mesto Russia' />
      {children}
    </header>
  );
}
