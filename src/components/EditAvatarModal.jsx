import { useEffect, useRef } from 'react';
import ModalWithForm from './ModalWithForm';

export default function EditAvatarModal({ isOpen, onClose, onUpdateAvatar, btnText }) {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen]);

  return (
    <ModalWithForm
      title='Обновить аватар'
      name='avatar-update'
      btnText={btnText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        id='avatar-url'
        className='form__text-input form__text-input_data_avatar-url'
        type='url'
        name='avatar-url'
        placeholder='Ссылка на аватар'
        required
      />
      <span className='form__input-error avatar-url-error'></span>
    </ModalWithForm>
  );
}
