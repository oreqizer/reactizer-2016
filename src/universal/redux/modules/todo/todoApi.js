import { Map } from 'immutable';

import Todo from '../../../containers/Todo';

import axios from 'axios';

export async function fetch() {
  const res = await axios.get('/todos');

  return res.data.todos.reduce((map, todo) => map.set(todo.id, new Todo(todo)), new Map());
}

export async function create({ text }) {
  const res = await axios.post('/todos', { text });

  return new Todo(res.data);
}

export async function edit({ id, text, done }) {
  const res = await axios.put(`/todos/${id}`, { text, done });

  return new Todo(res.data);
}

export async function remove({ id }) {
  return await axios.delete(`/todos/${id}`);
}
