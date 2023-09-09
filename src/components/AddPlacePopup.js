import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    /*console.log("tittle " + titleRef.current.value);
    console.log("link " + linkRef.current.value);*/

    props.onAddPlaceSubmit({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      onClose={props.onClose}
      title="Nuevo lugar"
      name="nuevo-lugar"
      isOpen={props.isOpen}
      onSubmit={handleAddPlaceSubmit}
    >
      <input
        className="popup__input popup__input_1"
        id="input-place-title"
        name="input-place-title"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        ref={nameRef}
        required
      ></input>
      <span className="popup__form-error input-1-error"></span>
      <input
        className="popup__input popup__input_2"
        id="input-place-image"
        name="input-place-image"
        placeholder="Enlace a la imagen"
        type="url"
        ref={linkRef}
        required
      ></input>
      <span className="popup__form-error input-2-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
