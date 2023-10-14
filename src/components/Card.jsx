import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ cardData, onCardClick, onCardLike, onCardDelete }) {
  function handleClick() {
    onCardClick(cardData);
  }

  const { _id: currentUserId } = useContext(CurrentUserContext);
  const { likes, name, link, owner } = cardData;

  const isOwn = owner._id === currentUserId;
  const isLiked = likes.some(like => like._id === currentUserId);

  return (
    <li className='element'>
      <img src={link} alt='' className='element__image' onClick={handleClick} />
      <div className='element__caption'>
        <h2 className='element__title'>{name}</h2>
        <div className='element__like-wrap'>
          <button
            type='button'
            className={`element__like-button ${isLiked && 'element__like-button_active'}`}
            aria-label='Отметить как понравившееся'
            onClick={() => onCardLike(cardData)}
          ></button>
          <span className='element__like-count'>{likes.length}</span>
        </div>
      </div>
      {isOwn && (
        <button
          type='button'
          className='element__delete'
          aria-label='Удалить пост'
          onClick={() => onCardDelete(cardData)}
        ></button>
      )}
    </li>
  );
}
