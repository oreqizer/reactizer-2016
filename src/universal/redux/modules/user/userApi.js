import axios from 'axios';

export async function login({ username, password }) {
  return await axios
    .post('https://reactizer.herokuapp.com/api/users/login', {
      username,
      password,
    });
}

export async function refreshLogin({ refreshToken }) {
  return await axios
    .post('https://reactizer.herokuapp.com/api/users/refresh', {
      refreshToken,
    });
}

export async function register({ username, password, email }) {
  return await axios
    .post('https://reactizer.herokuapp.com/api/users/register', {
      username,
      password,
      email,
    });
}
