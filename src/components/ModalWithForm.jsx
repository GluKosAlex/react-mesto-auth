import { useEffect, useRef } from 'react';
import FormValidator from '../utils/FormValidator.js';
import { config } from '../utils/constants';

export default function ModalWithForm({
  title,
  name,
  btnText,
  isOpen,
  onClose,
  onSubmit,
  children
}) {
  const form = useRef();

  useEffect(() => {
    const validator = new FormValidator(config, form.current);
    validator.enableValidation();
    validator.toggleButtonState();
    validator.removeValidationErrors();
  }, [isOpen]);

  return (
    <div className={`modal modal_type_${name} ${isOpen ? 'modal_opened' : ''}`}>
      <div className='modal__content modal__content_type_form'>
        <h2 className='modal__title'>{title}</h2>
        <form
          ref={form}
          className='form'
          action='#'
          name={name}
          method='post'
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button className='form__button' type='submit'>
            {btnText}
          </button>
        </form>
        <button type='button' className='modal__close' onClick={onClose}></button>
      </div>
    </div>
  );
}
