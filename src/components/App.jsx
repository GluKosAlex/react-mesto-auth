// System imports
import { React, useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

// Components imports
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ModalWithImage from './ModalWithImage';
import EditProfileModal from './EditProfileModal';
import EditAvatarModal from './EditAvatarModal';
import AddPlaceModal from './AddPlaceModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import useEscapeKey from './../utils/useEscapeKey';
import useOutsideClick from './../utils/useOverlayClick';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

// APIs imports
import api from './../utils/api';
import auth from './../utils/auth';

// Utils Imports
import avatarPlaceholder from '../images/avatar_placeholder.svg';
import successIcon from '../images/icon-success.svg';
import failIcon from '../images/icon-fail.svg';
import { INFO_TOOLTIP_TEXT } from '../utils/constants';

function App() {
  const navigate = useNavigate();

  const { successText, failText } = INFO_TOOLTIP_TEXT;

  const loggedInFromStorage = JSON.parse(localStorage.getItem('loggedIn'));
  const [loggedIn, setLoggedIn] = useState(JSON.parse(loggedInFromStorage));

  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isAddPlaceModalOpen, setIsAddPlaceModalOpen] = useState(false);
  const [isEditAvatarModalOpen, setIsEditAvatarModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [editProfileBtnText, setEditProfileBtnText] = useState('Сохранить');
  const [addPlaceBtnText, setAddPlaceBtnText] = useState('Создать');
  const [editAvatarBtnText, setEditAvatarBtnText] = useState('Сохранить');
  const [deleteConfirmBtnText, setDeleteConfirmBtnText] = useState('Да');

  const [infoTooltipContent, setInfoTooltipContent] = useState({ icon: successIcon, text: '' });

  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: '...',
    about: '...',
    avatar: avatarPlaceholder,
    _id: '',
    cohort: ''
  });

  const [userEmail, setUserEmail] = useState('');

  function authToken(token) {
    auth
      .tokenCheck(token)
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            return Promise.reject(`Ошибка: ${res.status} ${err.message}`);
          });
        } else {
          setLoggedIn(true);
          localStorage.setItem('loggedIn', 'true');
          res.json().then(({ data }) => {
            setUserEmail(data.email);
          });
        }
      })
      .catch(err => {
        console.error(err);
        navigate('/sign-in', { replace: true });
      });
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    authToken(token);
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch(err => console.error(err));
    }
  }, [loggedIn]);

  function handleRegister({ email, password }) {
    return auth.register({ email, password }).then(res => {
      if (!res.ok) {
        return res.json().then(err => {
          setInfoTooltipContent({ icon: failIcon, text: err.message || err.error || failText });
          setIsInfoTooltipOpen(true);
          return Promise.reject(`Ошибка: ${res.status} ${err.message}`);
        });
      } else {
        return res.json().then(() => {
          setInfoTooltipContent({ icon: successIcon, text: successText });
          setIsInfoTooltipOpen(true);
        });
      }
    });
  }

  function handleLogin({ email, password }) {
    return auth.authorize({ email, password }).then(res => {
      if (!res.ok) {
        return res.json().then(err => {
          setInfoTooltipContent({ icon: failIcon, text: err.message || failText });
          setIsInfoTooltipOpen(true);
          return Promise.reject(`Ошибка: ${res.status} ${err.message}`);
        });
      } else {
        return res.json().then(res => {
          setLoggedIn(true);
          setUserEmail(email);
          localStorage.setItem('token', res.token);
        });
      }
    });
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.setItem('loggedIn', 'false');
    localStorage.removeItem('token');
    navigate('/signin', { replace: true });
  }

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
    setIsInfoTooltipOpen(false);
  }

  useEscapeKey(closeAllModals);

  useOutsideClick(closeAllModals);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header className='header_with-menu'>
                <nav className='header__menu menu header__menu_closed'>
                  <p className='menu__user-email'>{userEmail}</p>
                  <Link to='sign-in' className='link menu__link' onClick={handleLogout} replace>
                    Выход
                  </Link>
                  <button
                    className='menu__toggle menu__toggle_closed'
                    onClick={e => {
                      e.target.classList.toggle('menu__toggle_closed');
                      e.target.parentNode.classList.toggle('header__menu_closed');
                    }}
                  >
                    <span>Открыть меню</span>
                  </button>
                </nav>
              </Header>

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

              <ModalWithImage
                card={selectedCard}
                onClose={closeAllModals}
                isOpen={isImageModalOpen}
              />
            </ProtectedRoute>
          }
        />
        <Route path='sign-up' element={<Register onRegister={handleRegister} />} />
        <Route path='sign-in' element={<Login onLogin={handleLogin} />} />
      </Routes>

      <InfoTooltip
        title={infoTooltipContent.text}
        icon={infoTooltipContent.icon}
        isOpen={isInfoTooltipOpen}
        onClose={closeAllModals}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
