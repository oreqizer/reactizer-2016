import Rx from 'rxjs/Rx';
import axios from 'axios';

import { URL, APP_WEB } from '../../consts/apiConsts';

export function loginApi({ username, password }) {
  const call = axios
    .post(`${URL}/users/login`, {
      username,
      password,
      app: APP_WEB,
    });

  return Rx.Observable.from(call)
    .map(res => res.data);  // TODO add mapper
}

export function refreshLoginApi({ refreshToken }) {
  const call = axios
    .post(`${URL}/users/refresh`, {
      refresh_token: refreshToken,
    });

  return Rx.Observable.from(call)
    .map(res => res.data);  // TODO add mapper
}

export function registerApi({ username, password, email }) {
  const call = axios
    .post(`${URL}/users/register`, {
      username,
      password,
      email,
      app: APP_WEB,
    });

  return Rx.Observable.from(call)
    .map(res => res.data);  // TODO add mapper
}
