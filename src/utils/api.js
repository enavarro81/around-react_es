class Api {
  constructor({ address, groupId, token }) {
    this._baseUrl = `${address}${groupId}`;
    this._token = token;
  }

  async getInformation(page) {
    const res = await fetch(`${this._baseUrl}${page}`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  async changeLikeCardStatus(idCard, isLiked) {
    const res = await fetch(`${this._baseUrl}/cards/likes/${idCard}`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`changeLikeCardStatus Error: ${res.status}`);
  }

  async deleteCard(idCard) {
    const res = await fetch(`${this._baseUrl}/cards/${idCard}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`deleteCard Error: ${res.status}`);
  }

  async setUserInfo({ userName, userJob }) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        about: userJob,
      }),
    });

    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`setUserInfo Error: ${res.status}`);
  }

  async setUserAvatar(userAvatar) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: userAvatar,
      }),
    });

    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`setUserAvatar Error: ${res.status}`);
  }
}

export const api = new Api({
  address: "https://around.nomoreparties.co/v1/",
  groupId: `web_es_07`, // CHANGE IT WITH YOUR COHORT
  token: `250c5b2d-3e06-42c3-8a5a-70bc34e003f8`, // CHANGE IT WITH YOUR TOKEN
});
