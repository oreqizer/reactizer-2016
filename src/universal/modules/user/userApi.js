import axios from 'axios';

import { APP_WEB } from '../../consts/apiConsts';

export function login({ username, password }) {
  return axios
    .post('/users/login', {
      username,
      password,
      app: APP_WEB,
    });
}

export function refreshLogin({ refreshToken }) {
  return axios
    .post('/users/refresh', {
      refresh_token: refreshToken,
    });
}

export function register({ username, password, email }) {
  return axios
    .post('/users/register', {
      username,
      password,
      email,
      app: APP_WEB,
    });
}
