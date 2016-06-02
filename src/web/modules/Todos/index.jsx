import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { defineMessages, FormattedMessage } from 'react-intl';

import Todos from './Todos';

import * as todoActions from '../../../universal/modules/todo/todoDuck';
import * as todoSagas from '../../../universal/modules/todo/todoSagas';

import { SUCCESS } from '../../../universal/consts/phaseConsts';

const messages = defineMessages({
  header: {
    id: 'todos.header',
    defaultMessage: 'Todos',
  },
});

@connect(state => ({
  token: state.user.token,
  todo: state.todo,
}), todoActions)
export default class Home extends Component {
  static propTypes = {
    token: PropTypes.string,
    todo: PropTypes.object.isRequired,
    fetchTodos: PropTypes.func.isRequired,
    createTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
  };

  static needs = [
    todoSagas.fetchTodos,
  ];

  componentDidMount() {
    const { token, todo, fetchTodos } = this.props;

    if (todo.phase !== SUCCESS) {
      fetchTodos({ token });
    }
  }

  render() {
    const { todo: { todos }, token, editTodo, deleteTodo } = this.props;

    return (
      <div className="Todos">
        <div className="Todos-header markdown-body">
          <h2>
            <FormattedMessage {...messages.header} />
          </h2>
        </div>
        <div className="Todos-list">
          <Todos
            token={token}
            todos={todos}
            onEdit={editTodo}
            onDelete={deleteTodo}
          />
        </div>
      </div>
    );
  }
}

