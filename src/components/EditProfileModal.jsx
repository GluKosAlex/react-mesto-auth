import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ModalWithForm from './ModalWithForm';

export default function EditProfileModal({ isOpen, onClose, onUpdateUser, btnText }) {
  const [values, setValues] = useState({});

  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    const { name, about } = values;

    onUpdateUser({
      name,
      about
    });
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
  }

  useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about
    });
  }, [currentUser, isOpen]);

  return (
    <ModalWithForm
      title='Редактировать профиль'
      name='profile-edit'
      btnText={btnText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id='name'
        className='form__text-input form__text-input_data_username'
        type='text'
        name='name'
        minLength='2'
        maxLength='40'
        placeholder='Имя'
        value={values.name}
        onChange={handleChange}
        required
      />
      <span className='form__input-error name-error'></span>
      <input
        id='about'
        className='form__text-input form__text-input_data_about'
        type='text'
        name='about'
        minLength='2'
        maxLength='200'
        placeholder='О себе'
        value={values.about}
        onChange={handleChange}
        required
      />
      <span className='form__input-error about-error'></span>
    </ModalWithForm>
  );
}
