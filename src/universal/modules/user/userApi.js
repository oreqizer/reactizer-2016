import axios from 'axios';

import { URL, APP_WEB } from '../../consts/apiConsts';

export function login({ username, password }) {
  return axios
    .post(`${URL}/users/login`, {
      username,
      password,
      app: APP_WEB,
    });
}

export function refreshLogin({ refreshToken }) {
  return axios
    .post(`${URL}/users/refresh`, {
      refresh_token: refreshToken,
    });
}

export function register({ username, password, email }) {
  return axios
    .post(`${URL}/users/register`, {
      username,
      password,
      email,
      app: APP_WEB,
    });
}
