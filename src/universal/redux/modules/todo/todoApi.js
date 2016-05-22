import axios from 'axios';

export async function fetch() {
  return await axios
    .get('/todos');
}

export async function create({ text }) {
  return await axios
    .post('/todos', {
      text,
    });
}

export async function edit({ id, text, done }) {
  return await axios
    .put(`/todos/${id}`, {
      text,
      done,
    });
}

export async function remove({ id }) {
  return await axios
    .delete(`/todos/${id}`);
}
