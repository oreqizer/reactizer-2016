import React, { PureComponent, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';
import MaterialList from 'material-ui/List';
import { List } from 'immutable';

import TodoItem from './TodoItem';
import TodosForm from './TodosForm';
import todosSelector from './todoSelector';

import * as todoActions from '../../../universal/modules/todo/todoDuck';
import { SUCCESS } from '../../../universal/consts/phaseConsts';
import { ACTIVE, DONE } from '../../../universal/consts/todoConsts';
import { todoMessages } from '../../../universal/messages';


const underline = { textDecoration: 'underline' };

class Todos extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    todos: PropTypes.instanceOf(List).isRequired,
    phase: PropTypes.string.isRequired,
    fetchTodos: PropTypes.func.isRequired,
    createTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { phase, fetchTodos } = this.props;

    if (phase !== SUCCESS) {
      fetchTodos();
    }
  }

  handleSubmit({ todo }) {
    const { createTodo } = this.props;

    createTodo(todo);
  }

  render() {
    const {
      todos,
      intl,
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
            <FormattedMessage {...todoMessages.overview} values={{ todos: todos.size }} />
          </p>
        </div>
        <div className="Todos-list">
          <MaterialList>
            {todos.map((todo, index) => (
              <TodoItem
                todo={todo}
                index={index}
                onEdit={editTodo}
                onDelete={deleteTodo}
              />
            ))}
          </MaterialList>
        </div>
        <div className="Todos-form">
          <TodosForm
            formatMessage={intl.formatMessage}
            onSubmit={this.handleSubmit}
          />
          <div className="Todos-filters markdown-body">
            <h4>
              <FormattedMessage {...todoMessages.show} />
            </h4>
            <Link to="/todos" activeStyle={underline}>
              <FormattedMessage {...todoMessages.all} />
            </Link>
            <Link to={`/todos/${ACTIVE}`} activeStyle={underline}>
              <FormattedMessage {...todoMessages.active} />
            </Link>
            <Link to={`/todos/${DONE}`} activeStyle={underline}>
              <FormattedMessage {...todoMessages.done} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  injectIntl,
  connect((state, props) => ({
    todos: todosSelector(state, props),
    phase: state.todo.phase,
  }), todoActions),
)(Todos);
