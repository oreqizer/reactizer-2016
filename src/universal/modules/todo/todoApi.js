import axios from 'axios';

import { URL } from '../../consts/apiConsts';

export function fetch() {
  return axios.get(`${URL}/todos`);
}

export function create({ text }) {
  return axios.post(`${URL}/todos`, { text });
}

export function edit({ todo }) {
  const { id, text, done } = todo;

  return axios.put(`${URL}/todos/${id}`, { text, done });
}

export function remove({ id }) {
  return axios.delete(`${URL}/todos/${id}`);
}
