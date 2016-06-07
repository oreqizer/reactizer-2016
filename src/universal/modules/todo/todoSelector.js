import { createSelector } from 'reselect';

import { FILTERS } from '../../consts/todoConsts';

const todoSelector = ({ state }) => state.todo.todos.valueSeq();
const filterSelector = ({ props }) => props.params.filter;

export const todosSelector = createSelector(
  [todoSelector, filterSelector],
  (todos, filter = FILTERS.ALL) => {
    switch (filter) {
      case FILTERS.ALL:
        return todos;

      case FILTERS.ACTIVE:
        return todos.filter(todo => !todo.done);

      case FILTERS.DONE:
        return todos.filter(todo => todo.done);

      default:
        throw new Error(`Invalid URL filter: ${filter}`); // TODO something more reasonable
    }
  }
);

