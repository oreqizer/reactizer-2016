import axios from 'axios';

import todoMapper from './todoMapper';

import Todo from '../../containers/Todo';
import { URL } from '../../consts/apiConsts';


export function fetchTodos() {
  const call = axios.get(`${URL}/todos`);

  return call.then(res => todoMapper(res.data.todos));
}

export function createTodo(text) {
  const call = axios.post(`${URL}/todos`, { text });

  return call.then(res => new Todo(res.data));
}

export function editTodo(todo) {
  const { id, text, done } = todo;

  const call = axios.put(`${URL}/todos/${id}`, { text, done });

  return call.then(res => new Todo(res.data));
}

export function deleteTodo(id) {
  const call = axios.delete(`${URL}/todos/${id}`);

  return call.then(id);
}
