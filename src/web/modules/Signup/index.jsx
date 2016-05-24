import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { defineMessages, FormattedMessage } from 'react-intl';

import { login, register } from '../../../universal/redux/modules/user/userDuck';
import { userMessages }from '../../../universal/messages';

// const messages = defineMessages({
//  
// })

@connect(state => ({
  user: state.user,
}))
export default class Login extends Component {
  render() {
    return (
      <div id="Login">
        <h2>
          <FormattedMessage {...userMessages.login} />
        </h2>
      </div>
    );
  }
}
