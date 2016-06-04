import { Map } from 'immutable';
import { sortBy, prop } from 'ramda';

import Todo from '../../containers/Todo';

export function toMap(todos = []) {
  // data need to be sorted for checksums to match on client/server
  return sortBy(prop('id'), todos)
    .reduce((map, todo) => map.set(todo.id, new Todo(todo)), new Map());
}
