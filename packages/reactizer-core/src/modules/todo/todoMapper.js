import { Map } from 'immutable';
import { sortBy, prop } from 'ramda';

import Todo from '../../containers/Todo';

export default todos => sortBy(prop('id'), todos)
  .reduce((map, todo) => map.set(todo.id, new Todo(todo)), new Map());
