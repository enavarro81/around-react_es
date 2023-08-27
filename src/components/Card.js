import React from "react";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="element" onClick={handleClick}>
      <img
        className="element__image"
        src={props.card.link}
        alt={props.card.name}
      />
      <div className="element__trash"></div>
      <div className="element__descripcion">
        <p className="element__title">{props.card.name}</p>
        <div className="element__likes">
          <div className="element__like element__like_theme_inactive"></div>
          <div className="element__total-likes">{props.card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
