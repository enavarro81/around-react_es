import logo from "./logo.svg";
import Header from "./components/Header.js";
import Main from "./components/Main.js";
import Footer from "./components/Footer";
import PopupWithForm from "./components/PopupWithForm";
import ImagePopup from "./components/ImagePopup";
import React from "react";

function App() {
  const [isEditProfilePopupOpen, setProfile] = React.useState(false);
  const [isAddPlacePopupOpen, setPlace] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatar] = React.useState(false);
  const [selectedCard, setCard] = React.useState("");

  function setEditProfile() {
    setProfile(true);
  }

  function setEditPlace() {
    setPlace(true);
  }

  function setEditAvatar() {
    setAvatar(true);
  }

  function setSelectedCard(card) {
    setCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatar();
  }

  function handleEditProfileClick() {
    setEditProfile();
  }

  function handleAddPlaceClick() {
    setEditPlace();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setProfile(false);
    setPlace(false);
    setAvatar(false);
    setCard("");
  }

  return (
    <>
      <div
        className={`popup ${
          isEditProfilePopupOpen ||
          isAddPlacePopupOpen ||
          isEditAvatarPopupOpen ||
          selectedCard != ""
            ? "popup_theme_opened"
            : ""
        }`}
      >
        <PopupWithForm
          onClose={closeAllPopups}
          title="Actualizar foto de perfil"
          name="actualizar-foto-perfil"
          isOpen={isEditAvatarPopupOpen}
        >
          <input
            className="popup__input popup__input_1"
            id="input-url-avatar"
            name="input-url-avatar"
            placeholder="Enlace a la imagen"
            type="url"
            required
          ></input>
          <span className="popup__form-error input-1-error"></span>
        </PopupWithForm>
        <PopupWithForm
          onClose={closeAllPopups}
          title="Editar perfil"
          name="editar-perfil"
          isOpen={isEditProfilePopupOpen}
        >
          <input
            className="popup__input popup__input_1"
            id="input-profile-name"
            name="input-profile-name"
            placeholder="Nombre"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__form-error input-1-error"></span>
          <input
            className="popup__input popup__input_2"
            id="input-profile-about"
            name="input-profile-about"
            placeholder="Acerca de mi"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__form-error input-2-error"></span>
        </PopupWithForm>
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
    </>
  );
}

export default App;
