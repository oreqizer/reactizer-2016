import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Paper, FlatButton, FontIcon } from 'material-ui';
import { autobind } from 'core-decorators';

const messages = defineMessages({
  heading: {
    id: 'profile.heading',
    defaultMessage: 'Profile',
  },
  no_user_heading: {
    id: 'profile.no_user_heading',
    defaultMessage: 'Not a profile',
  },
  no_user: {
    id: 'profile.no_user',
    defaultMessage: 'You are not logged in. :( Click the button to log in/register.',
  },
  username: {
    id: 'profile.username',
    defaultMessage: 'Username: {username}',
  },
  email: {
    id: 'profile.email',
    defaultMessage: 'Email: {email}',
  },
});

@connect(state => ({
  user: state.user,
}), { push })
export default class Profile extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  @autobind
  handleRedirect() {
    this.props.push('/signup');
  }

  @autobind
  renderUser() {
    const { username, email } = this.props.user.user;

    return (
      <div className="Profile-user markdown-body">
        <h2>
          <FormattedMessage {...messages.heading} />
        </h2>
        <p>
          <FormattedMessage {...messages.username} values={{ username }} />
        </p>
        <p>
          <FormattedMessage {...messages.email} values={{ email }} />
        </p>
      </div>
    );
  }

  @autobind
  renderNoUser() {
    return (
      <div className="Profile-no-user markdown-body">
        <h2>
          <FormattedMessage {...messages.no_user_heading} />
        </h2>
        <Paper style={{ padding: 20 }}>
          <FormattedMessage {...messages.no_user} />
          <FlatButton
            style={{ marginLeft: 20 }}
            icon={<FontIcon className="material-icons">person add</FontIcon>}
            onTouchTap={this.handleRedirect}
          />
        </Paper>
      </div>
    );
  }

  render() {
    const { user } = this.props;

    return (
      <div className="Profile">
        {!user.user && this.renderNoUser()}
        {user.user && this.renderUser()}
      </div>
    );
  }
}
