import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { injectIntl, defineMessages, intlShape, FormattedMessage } from 'react-intl';
import { Paper, Tabs, Tab } from 'material-ui';
import { autobind } from 'core-decorators';

import LoginForm from './LoginForm';
// import RegisterForm from './RegisterForm';

import { loginUser } from '../../../universal/redux/modules/user/userDuck';
import { userMessages } from '../../../universal/messages';

const messages = defineMessages({
  signup: {
    id: 'signup.header',
    defaultMessage: 'Sign up',
  },
});

const LOGIN = 'login';
const SIGNUP = 'signup';

@injectIntl
@connect()
export default class Signup extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      tab: LOGIN,
    };
  }

  @autobind
  handleLogin(data) {
    this.props.dispatch(loginUser(data));
  }

  @autobind
  handleTabSwitch(tab) {
    this.setState({
      tab,
    });
  }

  render() {
    const { intl } = this.props;
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
                <LoginForm onSubmit={this.handleLogin} />
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
