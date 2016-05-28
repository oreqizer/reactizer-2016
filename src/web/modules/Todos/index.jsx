import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { defineMessages, FormattedMessage } from 'react-intl';

import * as todoActions from '../../../universal/redux/modules/todo/todoDuck';
import * as todoSagas from '../../../universal/redux/modules/todo/todoSagas';

import { CLEAN } from '../../../universal/consts/phaseConsts';

const messages = defineMessages({
  header: {
    id: 'todos.header',
    defaultMessage: 'Todos',
  },
});

@connect(state => ({
  todo: state.todo,
}), todoActions)
export default class Home extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    fetchTodos: PropTypes.func.isRequired,
  };

  static needs = [
    todoSagas.fetchTodos,
  ];

  componentDidMount() {
    const { todo, fetchTodos } = this.props;

    if (todo.phase === CLEAN) {
      fetchTodos();
    }
  }

  render() {
    return (
      <div className="Todos">
        <div className="Todos-header markdown-body">
          <h2>
            <FormattedMessage {...messages.header} />
          </h2>
        </div>
      </div>
    );
  }
}

