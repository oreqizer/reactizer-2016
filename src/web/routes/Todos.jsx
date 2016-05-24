import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as todoActions from '../../universal/redux/modules/todo/todoDuck';
import { fetchTodos } from '../../universal/redux/modules/todo/todoSagas';

import { CLEAN } from '../../universal/consts/stateConsts';

import TodosView from '../modules/Todos/TodosView';
import TodosForm from '../modules/Todos/TodosForm';

@connect(state => ({
  todo: state.todo.todos,
}))
export default class Home extends Component {
  static propTypes = {
    todos: PropTypes.object,
    dispatch: PropTypes.func,
  };

  static needs = [
    fetchTodos,
  ];

  componentDidMount() {
    const { todos, dispatch } = this.props;

    if (todos.state === CLEAN) {
      dispatch(todoActions.fetchTodos());
    }
  }

  render() {
    const { todos, dispatch } = this.props;

    return (
      <div id="todo-list">
        <Link to="/about">About</Link>
        <TodosView
          todos={todos.list}
          {...bindActionCreators(todoActions, dispatch)}
        />
        <TodosForm
          {...bindActionCreators(todoActions, dispatch)}
        />
      </div>
    );
  }
}
