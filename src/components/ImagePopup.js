import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup__image ${
        props.imagePopup === null
          ? "popup__image_theme_no-display"
          : "popup__image_theme_visible"
      }`}
    >
      <div
        className="popup__button-close popup__button-close_theme_image"
        onClick={props.onClose}
      >
        +
      </div>
      <img
        className="popup__image-frame"
        src={props.imagePopup === null ? "" : props.imagePopup.link}
        alt={props.imagePopup === null ? "" : props.imagePopup.name}
      />
      <p className="popup__image-caption">
        {props.imagePopup === null ? "" : props.imagePopup.name}
      </p>
    </div>
  );
}

export default ImagePopup;
