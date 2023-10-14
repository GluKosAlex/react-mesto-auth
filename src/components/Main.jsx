import { React, useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete
}) {
  const { name, about, avatar } = useContext(CurrentUserContext);

  return (
    <main className='content page__content wrapper'>
      <section className='profile'>
        <div className='profile__wrap'>
          <div className='profile__avatar-wrap' onClick={onEditAvatar}>
            <img className='profile__avatar-img' src={avatar} alt='Аватарка' />
          </div>
          <div className='profile__info'>
            <div className='profile__name-wrap'>
              <h1 className='profile__username'>{name}</h1>
              <button
                type='button'
                className='profile__edit'
                aria-label='Редактировать профиль'
                onClick={onEditProfile}
              ></button>
            </div>
            <p className='profile__about'>{about}</p>
          </div>
        </div>
        <button
          type='button'
          className='profile__add-btn'
          aria-label='Добавить пост'
          onClick={onAddPlace}
        ></button>
      </section>

      <section>
        <ul className='elements'>
          {cards.map(item => {
            return (
              <Card
                key={item._id}
                cardData={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
