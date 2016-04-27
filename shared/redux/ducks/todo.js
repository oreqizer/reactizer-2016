import { List } from 'immutable';

export const FETCH = 'todo/FETCH';
export const CREATE = 'todo/CREATE';
export const EDIT = 'todo/EDIT';
export const DELETE = 'todo/DELETE';

const todoState = new List();

export default function todoReducer(state = todoState, action) {
  switch (action.type) {
    case FETCH:
      return state.push(action.todos);

    case CREATE:
      return state.push(action.text);

    case EDIT:
      return state.set(action.id, action.text);

    case DELETE:
      return state.delete(action.id);

    default:
      return state;
  }
}

export function createTodo(text) {
  return {
    type: CREATE,
    text
  };
}

export function editTodo(id, text) {
  return {
    type: EDIT,
    id,
    text
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE,
    id
  };
}
