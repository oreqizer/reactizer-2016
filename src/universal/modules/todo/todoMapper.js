import { Map } from 'immutable';
import { sort } from 'ramda';

import Todo from '../../containers/Todo';

export function toMap(todos = []) {
  // data need to be sorted for checksums to match on client/server
  return sort((t1, t2) => t1.id - t2.id, todos)
    .reduce((map, todo) => map.set(todo.id, new Todo(todo)), new Map());
}
