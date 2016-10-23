import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Paper, Tabs, Tab, Snackbar } from 'material-ui';

import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

import * as userActions from '../../../universal/modules/user/userDuck';
import { userMessages, signupMessages } from '../../../universal/messages';
import { LOGIN, REGISTER } from '../../../universal/consts/formConsts';

import User from '../../../universal/containers/User';


class Signup extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    user: PropTypes.instanceOf(User).isRequired,
    loginUser: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      tab: LOGIN,
    };

    this.handleSignup = this.handleSignup.bind(this);
    this.handleTabSwitch = this.handleTabSwitch.bind(this);
  }

  handleSignup({ email, username, password }) {
    const { loginUser, registerUser } = this.props;
    const { tab } = this.state;

    if (tab === LOGIN) {
      loginUser({ username, password });
    } else {
      registerUser({ email, username, password });
    }
  }

  handleTabSwitch(tab) {
    this.setState({
      tab,
    });
  }

  render() {
    const { intl, user, clearError } = this.props;
    const { tab } = this.state;

    const login = intl.formatMessage(userMessages.login);
    const register = intl.formatMessage(userMessages.register);

    return (
      <div className="Signup">
        <div className="Signup-header markdown-body">
          <h2>
            <FormattedMessage {...signupMessages.signup} />
          </h2>
          {user.user &&
            <FormattedMessage
              {...signupMessages.loggedInAs}
              values={{ name: user.user.username }}
            />
          }
        </div>
        <Paper>
          <Tabs value={tab} onChange={this.handleTabSwitch}>
            <Tab label={login} value={LOGIN}>
              <LoginForm onSubmit={this.handleSignup} />
            </Tab>
            <Tab label={register} value={REGISTER}>
              <RegisterForm onSubmit={this.handleSignup} />
            </Tab>
          </Tabs>
          <Snackbar
            message={user.error || ''}
            open={Boolean(user.error)}
            onRequestClose={clearError}
          />
        </Paper>
      </div>
    );
  }
}

export default compose(
  injectIntl,
  connect(state => ({
    user: state.user,
  }), userActions)
)(Signup);
