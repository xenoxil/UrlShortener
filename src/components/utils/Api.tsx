export class Api {
  _options: any;
  _headers: any;
  constructor(options: any) {
    // тело конструктора
    this._options = options;
    this._headers = this._options.headers;
  }

  register(email: string, password: string) {
    return fetch(`${this._options.baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    });
  }

  login(email: string, password: string) {
    return fetch(`${this._options.baseUrl}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    });
  }

  logout() {
    return fetch(`${this._options.baseUrl}/signout`, {
      method: 'delete',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    });
  }

  //получаем короткую ссылку
  getSqueeze() {
    return fetch(`${this._options.baseUrl}/squeeze`, {
      headers: this._options.headers,
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //получаем статистику по ссылкам
  getStatistics() {
    return fetch(`${this._options.baseUrl}/statistics`, {
      headers: this._options.headers,
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const mainApi = new Api({
  // baseUrl: 'http://localhost:3001',
  baseUrl: 'http://79.143.31.216/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
