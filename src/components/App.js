import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import React from "react";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, isSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState("");

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
    isSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    isSelectedCard(null);
  }

  function handleUpdateUser({ name, about }) {
    //console.log(name + " " + about);

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
    //console.log("OJO " + avatar);
    api
      .setUserAvatar(avatar)
      .then((resp) => {
        //console.log(resp);
        setCurrentUser(resp);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
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
        <PopupWithForm
          onClose={closeAllPopups}
          title="Nuevo lugar"
          name="nuevo-lugar"
          isOpen={isAddPlacePopupOpen}
        >
          <input
            className="popup__input popup__input_1"
            id="input-place-title"
            name="input-place-title"
            placeholder="Título"
            minLength="2"
            maxLength="30"
            required
          ></input>
          <span className="popup__form-error input-1-error"></span>
          <input
            className="popup__input popup__input_2"
            id="input-place-image"
            name="input-place-image"
            placeholder="Enlace a la imagen"
            type="url"
            required
          ></input>
          <span className="popup__form-error input-2-error"></span>
        </PopupWithForm>
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
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
