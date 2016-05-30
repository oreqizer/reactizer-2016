import axios from 'axios';

export function login({ username, password }) {
  return axios
    .post('/users/login', {
      username,
      password,
    });
}

export function refreshLogin({ refreshToken }) {
  return axios
    .post('/users/refresh', {
      refreshToken,
    });
}

export function register({ username, password, email }) {
  return axios
    .post('/users/register', {
      username,
      password,
      email,
    });
}
