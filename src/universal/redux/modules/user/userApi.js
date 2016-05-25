import axios from 'axios';

export function login({ username, password }) {
  return axios
    .post('https://reactizer.herokuapp.com/api/users/login', {
      username,
      password,
    });
}

export function refreshLogin({ refreshToken }) {
  return axios
    .post('https://reactizer.herokuapp.com/api/users/refresh', {
      refreshToken,
    });
}

export function register({ username, password, email }) {
  return axios
    .post('https://reactizer.herokuapp.com/api/users/register', {
      username,
      password,
      email,
    });
}
