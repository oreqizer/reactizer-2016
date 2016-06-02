import { Map } from 'immutable';

import Todo from '../../containers/Todo';

export function toMap(todos = []) {
  return todos.reduce((map, todo) => map.set(todo.id, new Todo(todo)), new Map());
}
