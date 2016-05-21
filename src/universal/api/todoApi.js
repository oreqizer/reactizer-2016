import axios from 'axios';

export async function fetch() {
  return await axios
    .get('/api/todos');
}

export async function create({ text }) {
  return await axios
    .post('/api/todos', {
      text,
    });
}

export async function edit({ id, text, done }) {
  return await axios
    .post(`/api/todos/${id}`, {
      text,
      done,
    });
}

export async function remove({ id }) {
  return await axios
    .delete(`/api/todos/${id}`);
}