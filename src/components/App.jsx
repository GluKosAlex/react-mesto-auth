import { React, useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ModalWithImage from './ModalWithImage';
import EditProfileModal from './EditProfileModal';
import EditAvatarModal from './EditAvatarModal';
import AddPlaceModal from './AddPlaceModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import api from './../utils/api';
import useEscapeKey from './../utils/useEscapeKey';
import useOutsideClick from './../utils/useOverlayClick';

import avatarPlaceholder from '../images/avatar_placeholder.svg';

function App() {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isAddPlaceModalOpen, setIsAddPlaceModalOpen] = useState(false);
  const [isEditAvatarModalOpen, setIsEditAvatarModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);

  const [editProfileBtnText, setEditProfileBtnText] = useState('Сохранить');
  const [addPlaceBtnText, setAddPlaceBtnText] = useState('Создать');
  const [editAvatarBtnText, setEditAvatarBtnText] = useState('Сохранить');
  const [deleteConfirmBtnText, setDeleteConfirmBtnText] = useState('Да');

  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: '...',
    about: '...',
    avatar: avatarPlaceholder,
    _id: '',
    cohort: ''
  });

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch(err => console.error(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(cards => cards.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => console.error(err));
  }

  function handleCardDeleteClick(card) {
    setSelectedCard(card);
    setIsDeleteConfirmModalOpen(true);
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    const card = selectedCard;
    setDeleteConfirmBtnText('Удаление...');

    api
      .deleteCard(card._id)
      .then(res => {
        setCards(cards => cards.filter(c => c._id !== card._id));
        console.log(res.message);
        setIsDeleteConfirmModalOpen(false);
      })
      .catch(err => console.error(err))
      .finally(() => setDeleteConfirmBtnText('Да'));
  }

  function handleUpdateUser(userData) {
    setEditProfileBtnText('Сохранение...');

    api
      .setUserInfo(userData)
      .then(newUserData => setCurrentUser(newUserData))
      .then(() => closeAllModals())
      .catch(err => console.error(err))
      .finally(() => setEditProfileBtnText('Сохранить'));

  }

  function handleUpdateAvatar(newAvatar) {
    setEditAvatarBtnText('Сохранение...');
    api
      .setUserAvatar(newAvatar)
      .then(newUserData => setCurrentUser(newUserData))
      .then(() => closeAllModals())
      .catch(err => console.error(err))
      .finally(() => setEditAvatarBtnText('Сохранить'));
  }

  function handleAddPlace(card) {
    setAddPlaceBtnText('Создание...');

    api
      .setNewCard(card)
      .then(newCard => setCards([newCard, ...cards]))
      .then(() => closeAllModals())
      .catch(err => console.error(err))
      .finally(() => setAddPlaceBtnText('Создать'));
  }

  function handleEditProfileClick() {
    setIsEditProfileModalOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlaceModalOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarModalOpen(true);
  }

  function handleCardClick(cardData) {
    setIsImageModalOpen(true);
    setSelectedCard(cardData);
  }

  function closeAllModals() {
    setIsEditProfileModalOpen(false);
    setIsAddPlaceModalOpen(false);
    setIsEditAvatarModalOpen(false);
    setIsImageModalOpen(false);
    setIsDeleteConfirmModalOpen(false);
  }

  useEscapeKey(closeAllModals);

  useOutsideClick(closeAllModals);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <Main
        cards={cards}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDeleteClick}
      />

      <Footer />

      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={closeAllModals}
        onUpdateUser={handleUpdateUser}
        btnText={editProfileBtnText}
      />

      <EditAvatarModal
        isOpen={isEditAvatarModalOpen}
        onClose={closeAllModals}
        onUpdateAvatar={handleUpdateAvatar}
        btnText={editAvatarBtnText}
      />

      <AddPlaceModal
        isOpen={isAddPlaceModalOpen}
        onClose={closeAllModals}
        onAddPlace={handleAddPlace}
        btnText={addPlaceBtnText}
      />

      <DeleteConfirmModal
        isOpen={isDeleteConfirmModalOpen}
        onClose={closeAllModals}
        onConfirm={handleCardDelete}
        btnText={deleteConfirmBtnText}
      ></DeleteConfirmModal>

      <ModalWithImage card={selectedCard} onClose={closeAllModals} isOpen={isImageModalOpen} />
    </CurrentUserContext.Provider>
  );
}

export default App;
