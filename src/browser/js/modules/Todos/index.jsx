import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';
import { autobind } from 'core-decorators';

import TodosList from './TodosList';
import TodosForm from './TodosForm';

import * as todoActions from '../../../../universal/modules/todo/todoDuck';
import * as todoSagas from '../../../../universal/modules/todo/todoSagas';
import { todosSelector } from '../../../../universal/modules/todo/todoSelector';

import { SUCCESS } from '../../../../universal/consts/phaseConsts';
import { FILTERS } from '../../../../universal/consts/todoConsts';

const messages = defineMessages({
  title: {
    id: 'seo.title.todos',
    defaultMessage: 'Todos',
  },
  header: {
    id: 'todos.header',
    defaultMessage: 'Todos',
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
});

@injectIntl
@connect((state, props) => ({
  token: state.user.token,
  todos: todosSelector({ state, props }),
  phase: state.todo.phase,
}), todoActions)
export default class Todos extends Component {
  static propTypes = {
    token: PropTypes.string,
    intl: intlShape.isRequired,
    params: PropTypes.object.isRequired,
    todos: PropTypes.object.isRequired,
    phase: PropTypes.string.isRequired,
    fetchTodos: PropTypes.func.isRequired,
    createTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
  };

  static needs = [
    todoSagas.fetchTodos,
  ];

  componentDidMount() {
    const { token, phase, fetchTodos } = this.props;

    if (phase !== SUCCESS) {
      fetchTodos({ token });
    }
  }

  @autobind
  handleSubmit({ todo }) {
    const { token, createTodo } = this.props;

    createTodo({ token, text: todo });
  }

  render() {
    const {
      todos,
      intl,
      token,
      editTodo,
      deleteTodo,
    } = this.props;

    return (
      <div className="Todos">
        <Helmet title={intl.formatMessage(messages.title)} />
        <div className="Todos-header markdown-body">
          <h2>
            <FormattedMessage {...messages.header} />
          </h2>
        </div>
        <div className="Todos-list">
          <TodosList
            token={token}
            todos={todos}
            onEdit={editTodo}
            onDelete={deleteTodo}
          />
        </div>
        <div className="Todos-form">
          <TodosForm
            token={token}
            onSubmit={this.handleSubmit}
          />
          <div className="Todos-filters markdown-body">
            <h4>
              <FormattedMessage {...messages.show} />
            </h4>
            <Link to="/todos" activeStyle={{ textDecoration: 'underline' }}>
              <FormattedMessage {...messages.all} />
            </Link>
            <Link to={`/todos/${FILTERS.ACTIVE}`} activeStyle={{ textDecoration: 'underline' }}>
              <FormattedMessage {...messages.active} />
            </Link>
            <Link to={`/todos/${FILTERS.DONE}`} activeStyle={{ textDecoration: 'underline' }}>
              <FormattedMessage {...messages.done} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

