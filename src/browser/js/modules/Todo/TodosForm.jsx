import React, { Component, PropTypes } from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Helmet from 'react-helmet';
import { autobind } from 'core-decorators';

const messages = defineMessages({
  title: {
    id: 'seo.title.todos',
    defaultMessage: 'Todos',
  },
  fetch: {
    id: 'todos.fetch',
    defaultMessage: 'Fetch!',
  },
  typeTodo: {
    id: 'todos.type_todo',
    defaultMessage: 'Type a todo',
  },
  ok: {
    id: 'todos.ok',
    description: 'Used as a button for submitting a TODO',
    defaultMessage: 'OK!',
  },
});

@injectIntl
export default class TodosForm extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    createTodo: PropTypes.func.isRequired,
    fetchTodos: PropTypes.func.isRequired,
  };

  @autobind
  handleSubmit() {
    const node = this.refs['todo-input'];

    this.props.createTodo(node.value);

    node.value = '';
  }

  render() {
    const { fetchTodos, intl } = this.props;

    return (
      <div className="todo-wrap">
        <Helmet title={intl.formatMessage(messages.title)} />
        <div className="todo-fetch">
          <input
            type="submit"
            value={intl.formatMessage(messages.fetch)}
            onClick={fetchTodos}
          />
        </div>
        <div id="todo-form">
          <input
            type="text"
            placeholder={intl.formatMessage(messages.typeTodo)}
            ref="todo-input"
          />
          <input
            type="submit"
            value={intl.formatMessage(messages.ok)}
            onClick={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}
