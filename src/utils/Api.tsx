import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

export class Api {
  _options: any;
  _headers: any;
  constructor(options: any) {
    // тело конструктора
    this._options = options;
    this._headers = this._options.headers;
  }
  makeConfig(
    url: string,
    method: string,
    additionalHeaders: AxiosRequestHeaders | {},
    data: unknown | undefined,
  ): AxiosRequestConfig {
    return {
      url: `${this._options.baseUrl}${url}`,
      method,
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        ...additionalHeaders,
      },
      data,
    };
  }

  register(email: string, password: string, name: string) {
    return axios(this.makeConfig('/signup', 'post', {}, { email, password, name }));
  }

  login(email: string, password: string) {
    return axios(this.makeConfig('/signin', 'post', {}, { email, password }));
  }

  //получаем короткую ссылку
  getSqueeze(link: string) {
    return axios(this.makeConfig('/links', 'post', {}, { longLink: link }));
  }
  //получаем статистику по ссылкам
  getStatistics() {
    return axios(this.makeConfig('/links', 'get', {}, undefined));
  }
  getUserInfo() {
    return axios(this.makeConfig('/users/me', 'get', {}, undefined));
  }
}

const mainApi = new Api({
  baseUrl: 'http://localhost:3000',
  // baseUrl: 'http://79.143.31.216',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
