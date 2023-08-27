import React from "react";

function PopupWithForm(props) {
  // no fue necesario crear la variable onClose porque con el isOpen controlo perfectamente tanto abrir como cerrar los modals

  return (
    <div
      className={`popup__container popup_type_${props.name} ${
        props.isOpen
          ? "popup__container_theme_visible"
          : "popup__container_theme_no-display"
      }
        `}
    >
      <div className="popup__button-close" onClick={props.onClose}>
        +
      </div>
      <form className="popup__form" name={props.name} noValidate>
        <p className="popup__title">{props.title}</p>
        {props.children}
        <button
          type="submit"
          className="popup__button-save popup__button_disabled"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;
