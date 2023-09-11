import React from "react";
import Card from "../components/Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar">
            <img
              className="profile__avatar-image"
              src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
              alt=""
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
            />
            <div
              className="profile__avatar-button-edit"
              onClick={props.onEditAvatarClick}
            ></div>
          </div>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__button-edit"
                onClick={props.onEditProfileClick}
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <div className="profile__button-content">
          <div
            className="profile__button-add"
            onClick={props.onAddPlaceClick}
          ></div>
        </div>
      </section>
      <ul className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </ul>
    </main>
  );
}

export default Main;
