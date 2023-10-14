import { useEffect, useState } from 'react';
import ModalWithForm from './ModalWithForm';

export default function AddPlaceModal({ isOpen, onClose, onAddPlace, btnText }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({ name, link });
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <ModalWithForm
      title='Новое место'
      name='card-add'
      btnText={btnText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id='img-title'
        className='form__text-input form__text-input_data_img-title'
        type='text'
        name='img-title'
        placeholder='Название'
        minLength='2'
        maxLength='30'
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <span className='form__input-error img-title-error'></span>
      <input
        id='img-url'
        className='form__text-input form__text-input_data_img-url'
        type='url'
        name='img-url'
        placeholder='Ссылка на картинку'
        value={link}
        onChange={e => setLink(e.target.value)}
        required
      />
      <span className='form__input-error img-url-error'></span>
    </ModalWithForm>
  );
}
