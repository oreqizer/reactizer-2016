import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl, defineMessages, intlShape, FormattedMessage } from 'react-intl';
import { Paper, Tabs, Tab } from 'material-ui';
import { autobind } from 'core-decorators';

import LoginForm from './LoginForm';
// import RegisterForm from './RegisterForm';

import * as userActions from '../../../universal/redux/modules/user/userDuck';
import { userMessages } from '../../../universal/messages';
import { LOADING } from '../../../universal/consts/phaseConsts';

const messages = defineMessages({
  signup: {
    id: 'signup.header',
    defaultMessage: 'Sign up',
  },
});

const LOGIN = 'login';
const SIGNUP = 'signup';

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
        <div className="markdown-body">
          <h2>
            <FormattedMessage {...messages.signup} />
          </h2>
        </div>
        <Paper>
          <Tabs value={tab} onChange={this.handleTabSwitch}>
            <Tab label={login} value={LOGIN}>
              <div className="Signup-form">
                <LoginForm
                  submitting={user.phase === LOADING}
                  onSubmit={this.handleLogin}
                />
              </div>
            </Tab>
            <Tab label={register} value={SIGNUP}>
              <div className="Signup-form">
                asdf
              </div>
            </Tab>
          </Tabs>
        </Paper>
      </div>
    );
  }
}
