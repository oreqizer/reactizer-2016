import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'todos.seo.title',
    defaultMessage: 'Todos',
  },
  header: {
    id: 'todos.header',
    defaultMessage: 'Todos',
  },
  overview: {
    id: 'todos.overview',
    defaultMessage: 'Displaying {todos, plural,' +
    '=0 {no todos}' +
    'one {one todo}' +
    'other {# todos}' +
    '}.',
  },
  show: {
    id: 'todos.show',
    defaultMessage: 'Show:',
    description: 'Followed by filter options',
  },
  all: {
    id: 'todos.filters.all',
    defaultMessage: 'All',
  },
  active: {
    id: 'todos.filters.active',
    defaultMessage: 'Active',
  },
  done: {
    id: 'todos.filters.done',
    defaultMessage: 'Done',
  },
  prompt: {
    id: 'todos.form_prompt',
    defaultMessage: 'Enter a TODO',
  },
});
