import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';
import { autobind } from 'core-decorators';

import TodosList from './TodosList';
import TodosForm from './TodosForm';

import * as todoActions from '../../../../universal/modules/todo/todoDuck';
import * as todoSagas from '../../../../universal/modules/todo/todoSagas';

import { SUCCESS } from '../../../../universal/consts/phaseConsts';

const messages = defineMessages({
  title: {
    id: 'seo.title.todos',
    defaultMessage: 'Todos',
  },
  header: {
    id: 'todos.header',
    defaultMessage: 'Todos',
  },
});

@injectIntl
@connect(state => ({
  token: state.user.token,
  todo: state.todo,
}), todoActions)
export default class Todos extends Component {
  static propTypes = {
    token: PropTypes.string,
    intl: intlShape.isRequired,
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

  @autobind
  handleSubmit({ todo }) {
    const { token, createTodo } = this.props;

    createTodo({ token, text: todo });
  }

  render() {
    const {
      todo: { todos },
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
            todos={todos.valueSeq()}
            onEdit={editTodo}
            onDelete={deleteTodo}
          />
        </div>
        <div className="Todos-form">
          <TodosForm
            token={token}
            onSubmit={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}

