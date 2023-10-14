import React from 'react';

export default function ModalWithImage({ card, onClose, isOpen }) {
  return (
    <div className={`modal modal_type_image ${isOpen ? 'modal_opened' : ''}`}>
      <div className='modal__content modal__content_type_image'>
        <figure className='modal__image-wrap'>
          <img src={card.link} alt='' className='modal__image' />
          <figcaption className='modal__image-title'>{card.name}</figcaption>
        </figure>
        <button type='button' className='modal__close' onClick={onClose}></button>
      </div>
    </div>
  );
}
