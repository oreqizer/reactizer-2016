import { Record, Map } from 'immutable';

const Todo = new Record({
  id: null,
  text: null,
  done: false,
});

export default Todo;

export function mapFromArray(todos = []) {
  return todos
    .reduce((map, todo) => map.set(todo.id, new Todo(todo)), new Map());
}

export function mapFromObject(todos = {}) {
  return Object.keys(todos)
    .reduce((map, key) => map.set(key, new Todo(todos[key])), new Map());
}
