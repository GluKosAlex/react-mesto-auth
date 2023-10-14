import React from 'react';
import ModalWithForm from './ModalWithForm'

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, btnText }) {
  return (
    <ModalWithForm
      title='Вы уверены?'
      name='confirm'
      btnText={btnText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onConfirm}
    ></ModalWithForm>
  );
}
