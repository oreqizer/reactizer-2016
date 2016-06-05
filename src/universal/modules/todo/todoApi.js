import axios from 'axios';

export function fetch({ token }) {
  return axios.get('/todos', {
    headers: {
      Authorization: token,
    },
  });
}

export function create({ token, text }) {
  return axios.post('/todos', { text }, {
    headers: {
      Authorization: token,
    },
  });
}

export function edit({ token, todo }) {
  const { id, text, done } = todo;

  return axios.put(`/todos/${id}`, { text, done }, {
    headers: {
      Authorization: token,
    },
  });
}

export function remove({ token, id }) {
  return axios.delete(`/todos/${id}`, {
    headers: {
      Authorization: token,
    },
  });
}
