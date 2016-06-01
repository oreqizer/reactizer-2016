import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { defineMessages, FormattedMessage } from 'react-intl';

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
  };

  static needs = [
    todoSagas.fetchTodos,
  ];

  componentDidMount() {
    const { token, todo, fetchTodos } = this.props;

    if (todo.phase !== SUCCESS) {
      fetchTodos(token);
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

