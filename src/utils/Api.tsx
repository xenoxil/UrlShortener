export class Api {
  _options: any;
  _headers: any;
  constructor(options: any) {
    // тело конструктора
    this._options = options;
    this._headers = this._options.headers;
  }

  register(email: string, password: string) {
    return fetch(`${this._options.baseUrl}/register?username=${email}&password=${password}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
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

  login(email: string, password: string) {
    return fetch(`${this._options.baseUrl}/login`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${email}&password=${password}`,
    }).then((res) => {
      if (res.ok) {
        console.log('res ok');
        return res.json();
      } else {
        console.log('res  ne ok');
        return Promise.reject(res.status);
      }
    });
  }

  //получаем короткую ссылку
  getSqueeze(link: string, token: string) {
    return fetch(`${this._options.baseUrl}/squeeze?link=${link}`, {
      method: 'POST',
      headers: { 
        accept: 'application/json',
       authorization: 'Bearer ' + token },      
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`${res.status}`);
        }
      })      
  }
  //получаем статистику по ссылкам
  getStatistics(token: string,offset:number,limit:number) {
    return fetch(`${this._options.baseUrl}/statistics?order=asc_short&offset=${offset}&limit=${limit}`, {
      headers: {
        accept: 'application/json',
        authorization: 'Bearer ' + token,
      },
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
  baseUrl: 'https://79.143.31.216',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
