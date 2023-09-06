import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // Verificando si el usuario actual es el propietario de la tarjeta actual
  const isOwn = props.card.owner._id === currentUser._id;
  // Verifica si el usuario actual le dio "like" a la tarjeta
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  /*console.log(currentUser);
  console.log(props);
  console.log(isOwn);
  console.log(isLiked);*/

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="element">
      <img
        className="element__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div
        className={`element__trash ${
          isOwn ? "" : "element__trash_theme_invisible"
        }`}
        onClick={handleDeleteClick}
      ></div>
      <div className="element__descripcion">
        <p className="element__title">{props.card.name}</p>
        <div className="element__likes">
          <div
            className={`element__like ${
              isLiked
                ? "element__like_theme_active"
                : "element__like_theme_inactive"
            }`}
            onClick={handleLikeClick}
          ></div>
          <div className="element__total-likes">{props.card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
