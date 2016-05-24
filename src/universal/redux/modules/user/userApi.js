import axios from 'axios';

export async function login({ username, password }) {
  return await axios
    .post('/users/login', {
      username,
      password,
    });
}

export async function refreshLogin({ refreshToken }) {
  return await axios
    .post('/users/refresh', {
      refreshToken,
    });
}

export async function register({ username, password, email }) {
  return await axios
    .post('/users/register', {
      username,
      password,
      email,
    });
}
