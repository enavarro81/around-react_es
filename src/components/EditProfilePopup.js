import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(undefined);
  const [description, setDescription] = React.useState(undefined);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    //console.log("nombre: " + e.target.value);
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    //console.log("descripction: " + e.target.value);
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    //console.log("entro al submit");
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Editar perfil"
      name="editar-perfil"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_1"
        id="input-profile-name"
        name="input-profile-name"
        placeholder="Nombre"
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleNameChange}
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
        value={description || ""}
        onChange={handleDescriptionChange}
        required
      />
      <span className="popup__form-error input-2-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
