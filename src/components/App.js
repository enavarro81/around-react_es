import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import React from "react";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInformation("/users/me")
      .then((resp) => {
        setCurrentUser(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getInformation("/cards")
      .then((resp) => {
        setCards(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ userName: name, userJob: about })
      .then((resp) => {
        setCurrentUser(resp);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar(avatar)
      .then((resp) => {
        setCurrentUser(resp);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSubmit({ name, link }) {
    api
      .postCard({ name, link })
      .then((resp) => {
        setCards([resp, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya le han dado like
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Envía una petición a la API y obtén los datos actualizados de la tarjeta
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then((newCard) => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div
        className={`popup ${
          isEditProfilePopupOpen ||
          isAddPlacePopupOpen ||
          isEditAvatarPopupOpen ||
          selectedCard !== null
            ? "popup_theme_opened"
            : ""
        }`}
      >
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleSubmit}
        />

        <PopupWithForm
          onClose={closeAllPopups}
          title="¿Estás seguro?"
          name="eliminar-lugar"
        />
        <ImagePopup imagePopup={selectedCard} onClose={closeAllPopups} />
      </div>
      <div className="page">
        <Header />
        <Main
          onEditAvatarClick={handleEditAvatarClick}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
