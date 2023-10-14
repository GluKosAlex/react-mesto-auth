const CONFIG = {
  formSelector: '.form',
  inputSelector: '.form__text-input',
  modalCardAddSelector: '.modal_type_card-add',
  modalImageSelector: '.modal_type_image',
  modalConfirmSelector: '.modal_type_confirm',
  modalProfileEditSelector: '.modal_type_profile-edit',
  modalAvatarEditSelector: '.modal_type_avatar-update',
  profileUsernameSelector: '.profile__username',
  profileAboutSelector: '.profile__about',
  profileAvatarSelector: '.profile__avatar-img',
  cardTemplateSelector: '#element-template',
  cardListSelector: '.elements',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__text-input_type_error',
  errorClass: 'form__input-error_visible',
  modalOpenedClass: 'modal_opened',
  apiConfig: {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-74',
    headers: {
      authorization: 'f79f0cff-136a-4085-9856-94d44d998acc',
      'Content-Type': 'application/json'
    }
  }
};

export {
  CONFIG as config
};
