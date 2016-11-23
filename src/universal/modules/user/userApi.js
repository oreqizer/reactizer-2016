import axios from 'axios';

import User from '../../containers/User';
import { URL, APP_WEB } from '../../consts/apiConsts';


const resMapper = res => ({
  token: res.data.token,
  refreshToken: res.data['refresh_token'],  // eslint-disable-line dot-notation
  user: new User(res.data.user),
});

export function loginApi({ username, password }) {
  const call = axios
    .post(`${URL}/users/login`, {
      username,
      password,
      app: APP_WEB,
    });

  return call.then(resMapper);
}

export function refreshLoginApi({ refreshToken }) {
  const call = axios
    .post(`${URL}/users/refresh`, {
      refresh_token: refreshToken,
    });

  return call.then(resMapper);
}

export function registerApi({ username, password, email }) {
  const call = axios
    .post(`${URL}/users/register`, {
      username,
      password,
      email,
      app: APP_WEB,
    });

  return call.then(resMapper);
}
