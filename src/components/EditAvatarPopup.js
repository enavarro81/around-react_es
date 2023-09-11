import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title="Actualizar foto de perfil"
      name="actualizar-foto-perfil"
    >
      <input
        className="popup__input popup__input_1"
        id="input-url-avatar"
        name="input-url-avatar"
        placeholder="Enlace a la imagen"
        type="url"
        ref={avatarRef}
        required
        defaultValue={currentUser.avatar}
      ></input>
      <span className="popup__form-error input-1-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
