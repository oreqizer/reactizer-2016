import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { FontIcon } from 'material-ui';
import { autobind } from 'core-decorators';

@connect(state => ({
  user: state.user,
  appName: state.config.appName,
}), { push })
export default class Home extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
  };

  @autobind
  handleRedirect(path) {
    this.props.push(path);
  }

  render() {
    return (
      <div className="Home">
      </div>
    );
  }
}
