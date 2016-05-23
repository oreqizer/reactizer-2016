import { Map } from 'immutable';

import Todo from '../../../containers/Todo';

import axios from 'axios';

export async function fetch() {
  const { todos } = await axios.get('/todos');

  return todos.reduce((map, todo) => map.set(todo.id, new Todo(todo)), new Map());
}

export async function create({ text }) {
  const todo = await axios.post('/todos', { text });

  return new Todo(todo);
}

export async function edit({ id, text, done }) {
  const todo = await axios.put(`/todos/${id}`, { text, done });

  return new Todo(todo);
}

export async function remove({ id }) {
  return await axios.delete(`/todos/${id}`);
}