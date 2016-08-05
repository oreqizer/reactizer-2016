import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';
import { autobind } from 'core-decorators';

import TodosList from './TodosList';
import TodosForm from './TodosForm';
import todosSelector from './todoSelector';

import * as todoActions from '../../../../universal/modules/todo/todoDuck';
import * as todoSagas from '../../../../universal/modules/todo/todoSagas';
import { SUCCESS } from '../../../../universal/consts/phaseConsts';
import { ACTIVE, DONE } from '../../../../universal/consts/todoConsts';
import { todoMessages } from '../../../../universal/messages';

@injectIntl
@connect((state, props) => ({
  token: state.user.token,
  todos: todosSelector({ state, props }),
  phase: state.todo.phase,
}), todoActions)
export default class Todos extends PureComponent {
  static propTypes = {
    params: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    token: PropTypes.string,
    todos: PropTypes.object.isRequired,
    phase: PropTypes.string.isRequired,
    fetchTodos: PropTypes.func.isRequired,
    createTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
  };

  static needs = [ // not actually used - I kept it for demonstration
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
        <Helmet title={intl.formatMessage(todoMessages.title)} />
        <div className="Todos-header markdown-body">
          <h2>
            <FormattedMessage {...todoMessages.header} />
          </h2>
          <p style={{ paddingBottom: 20 }}>
            <FormattedMessage {...todoMessages.overview} values={{ todos: todos.count() }} />
          </p>
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
              <FormattedMessage {...todoMessages.show} />
            </h4>
            <Link to="/todos" activeStyle={{ textDecoration: 'underline' }}>
              <FormattedMessage {...todoMessages.all} />
            </Link>
            <Link to={`/todos/${ACTIVE}`} activeStyle={{ textDecoration: 'underline' }}>
              <FormattedMessage {...todoMessages.active} />
            </Link>
            <Link to={`/todos/${DONE}`} activeStyle={{ textDecoration: 'underline' }}>
              <FormattedMessage {...todoMessages.done} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

