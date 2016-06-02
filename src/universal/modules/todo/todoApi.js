import axios from 'axios';

import { authHeader } from '../../tools/apiCalls';

export function fetch({ token }) {
  return axios.get('/todos', authHeader(token));
}

export function create({ token, text }) {
  return axios.post('/todos', { text }, authHeader(token));
}

export function edit({ token, todo }) {
  const { id, text, done } = todo;

  return axios.put(`/todos/${id}`, { text, done }, authHeader(token));
}

export function remove({ token, todo }) {
  return axios.delete(`/todos/${todo.id}`, authHeader(token));
}
