import React from "react";
import { api } from "../utils/api.js";
import Card from "../components/Card.js";

function Main(props) {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescripction] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInformation("/users/me")
      .then((resp) => {
        setUserName(resp.name);
        setUserDescripction(resp.about);
        setUserAvatar(resp.avatar);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getInformation("/cards")
      .then((resp) => {
        setCards(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar">
            <img
              className="profile__avatar-image"
              src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
              alt=""
              style={{ backgroundImage: `url(${userAvatar})` }}
            />
            <div
              className="profile__avatar-button-edit"
              onClick={props.onEditAvatarClick}
            ></div>
          </div>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{userName}</h1>
              <button
                className="profile__button-edit"
                onClick={props.onEditProfileClick}
              ></button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
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
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={props.onCardClick} />
        ))}
      </ul>
    </main>
  );
}

export default Main;
