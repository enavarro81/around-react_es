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
}

export const api = new Api({
  address: "https://around.nomoreparties.co/v1/",
  groupId: `web_es_07`, // CHANGE IT WITH YOUR COHORT
  token: `250c5b2d-3e06-42c3-8a5a-70bc34e003f8`, // CHANGE IT WITH YOUR TOKEN
});
