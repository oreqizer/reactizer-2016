import axios from 'axios';

export function fetch() {
  return axios.get('/todos');
}

export function create({ text }) {
  return axios.post('/todos', { text });
}

export function edit({ id, text, done }) {
  return axios.put(`/todos/${id}`, { text, done });
}

export function remove({ id }) {
  return axios.delete(`/todos/${id}`);
}
