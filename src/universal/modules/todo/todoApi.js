import axios from 'axios';

import { URL } from '../../consts/apiConsts';

export function fetch({ token }) {
  return axios.get(`${URL}/todos`, {
    headers: {
      Authorization: token,
    },
  });
}

export function create({ token, text }) {
  return axios.post(`${URL}/todos`, { text }, {
    headers: {
      Authorization: token,
    },
  });
}

export function edit({ token, todo }) {
  const { id, text, done } = todo;

  return axios.put(`${URL}/todos/${id}`, { text, done }, {
    headers: {
      Authorization: token,
    },
  });
}

export function remove({ token, id }) {
  return axios.delete(`${URL}/todos/${id}`, {
    headers: {
      Authorization: token,
    },
  });
}
