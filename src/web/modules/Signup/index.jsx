import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl, defineMessages, intlShape, FormattedMessage } from 'react-intl';
import { Paper, Tabs, Tab } from 'material-ui';
import { autobind } from 'core-decorators';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import * as userActions from '../../../universal/modules/user/userDuck';
import { userMessages } from '../../../universal/messages';

const messages = defineMessages({
  signup: {
    id: 'signup.header',
    defaultMessage: 'Sign up',
  },
  loggedInAs: {
    id: 'signup.logged_in_as',
    defaultMessage: 'Hi {name}, you are already logged in.',
  },
});

const LOGIN = 'login';
const REGISTER = 'register';

@injectIntl
@connect(state => ({
  user: state.user,
}), userActions)
export default class Signup extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      tab: LOGIN,
    };
  }

  @autobind
  handleLogin(data) {
    this.props.loginUser(data);
  }

  @autobind
  handleRegister(data) {
    this.props.registerUser(data);
  }

  @autobind
  handleTabSwitch(tab) {
    this.setState({
      tab,
    });
  }

  render() {
    const { intl, user } = this.props;
    const { tab } = this.state;

    const login = intl.formatMessage(userMessages.login);
    const register = intl.formatMessage(userMessages.register);

    return (
      <div className="Signup">
        <div className="Signup-header markdown-body">
          <h2>
            <FormattedMessage {...messages.signup} />
          </h2>
          {user.user &&
            <FormattedMessage
              {...messages.loggedInAs}
              values={{ name: user.user.username }}
            />
          }
        </div>
        <Paper>
          <Tabs value={tab} onChange={this.handleTabSwitch}>
            <Tab label={login} value={LOGIN}>
              <div className="Signup-form">
                <LoginForm onSubmit={this.handleLogin} />
              </div>
            </Tab>
            <Tab label={register} value={REGISTER}>
              <div className="Signup-form">
                <RegisterForm onSubmit={this.handleRegister} />
              </div>
            </Tab>
          </Tabs>
        </Paper>
      </div>
    );
  }
}
