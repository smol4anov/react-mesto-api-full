import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import '../blocks/app/App.css';

import ImagePopup from './ImagePopup';
import Main from './Main';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import api from '../utils/Api';
import * as auth from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [errorPopupText, setErrorPopupText] = useState("");
  const [selectedCard, setSelectedCard] = useState();
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [tooltipState, setTooltipState] = useState(true);

  const [savingState, setSavingState] = useState(false);
  const [removedCard, setRemovedCard] = useState();
  const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleRequestError = (errorText) => {
    setErrorPopupText(errorText);
  };

  const handleUpdateUser = (userInfo) => {
    setSavingState(true);
    api.sendUserInfo(userInfo)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(errorText => handleRequestError(errorText))
      .finally(() => setSavingState(false));
  };

  const handleUpdateAvatar = (avatarUrl) => {
    setSavingState(true);
    api.updateAvatar(avatarUrl)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(errorText => handleRequestError(errorText))
      .finally(() => setSavingState(false));
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setErrorPopupText("");
    setSelectedCard(null);
    setRemovedCard(undefined);
    setIsTooltipPopupOpen(false);
  };

  const handleCardLike = (card) => {

    const isLiked = card.likes.some(item => item._id === currentUser._id);

    api.likeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((item) => item._id === card._id ? newCard : item));
      })
      .catch(errorText => handleRequestError(errorText));
  }

  const handleCardDeleteButtonClick = (card) => {
    setRemovedCard(card);
  }

  const handleCardDelete = () => {
    setSavingState(true);
    api.deleteCard(removedCard._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== removedCard._id));
      })
      .catch(errorText => handleRequestError(errorText))
      .finally(() => {
        setRemovedCard(undefined);
        setSavingState(false);
      });
  }

  const handleAddPlace = (newCardData) => {
    setSavingState(true);
    api.addNewCard(newCardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(errorText => handleRequestError(errorText))
      .finally(() => setSavingState(false));
  }

  const openFailTooltip = () => {
    setTooltipState(false);
    setIsTooltipPopupOpen(true);
  }

  const handleRegister = (registerData) => {
    auth.register(registerData)
      .then(() => {
        navigate('/login');
        setTooltipState(true);
        setIsTooltipPopupOpen(true);
      })
      .catch(openFailTooltip);
  }

  const handleLogin = (loginData) => {
    setUserEmail(loginData.email);
    auth.login(loginData)
      .then((data) => {
        if (!data.token) {
          openFailTooltip();
          return;
        }
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        navigate('/');
        api.setTokenData(data.token);
      })
      .catch(openFailTooltip);
  }

  const handleExitClick = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  const mainProps = {
    onEditProfile: handleEditProfileClick,
    onAddPlace: handleAddPlaceClick,
    onEditAvatar: handleEditAvatarClick,
    onCardClick: handleCardClick,
    handleRequestError: handleRequestError,
    cards,
    onCardLike: handleCardLike,
    onCardDelete: handleCardDeleteButtonClick
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) return;

    auth.checkToken(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(res.email);
          api.setTokenData(token);
        }
      })
      .catch(openFailTooltip);
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([resUserInfo, resCards]) => {
          setCurrentUser(resUserInfo);
          setCards(resCards);
        })
        .catch(errorText => handleRequestError(errorText));
      navigate('/');
    } else {
      navigate('/signin');
    }
  }, [loggedIn]);

  return (
    <div className="App">
      <div className="page__wrapper">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Header linkText="Выйти" userEmail={userEmail} onClick={handleExitClick} />
                <Main {...mainProps} />
              </ProtectedRoute>
            } />
            <Route path="/signin" element={
              <>
                <Header linkPath="/signup" linkText="Регистрация" />
                <Login onLogin={handleLogin} />
              </>
            } />
            <Route path="/signup" element={
              <>
                <Header linkPath="/signin" linkText="Войти" />
                <Register onRegister={handleRegister} />
              </>
            } />
            <Route path="*" element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
            }
            />
          </Routes>
          <EditProfilePopup savingState={savingState} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup savingState={savingState} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
          <EditAvatarPopup savingState={savingState} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <PopupWithForm
            title={errorPopupText}
            name="error"
            children=""
            buttonText="Попробую еще раз"
            isOpen={errorPopupText !== ""}
            validOnOpen={true}
            onClose={closeAllPopups}
          />
          <PopupWithForm
            title="Вы уверены?"
            name="delete-card"
            children=""
            buttonText={savingState ? "Удаление..." : "Да"}
            isOpen={removedCard !== undefined}
            validOnOpen={true}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            isOpen={isTooltipPopupOpen}
            success={tooltipState}
            onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
