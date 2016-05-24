import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Paper } from 'material-ui';

import SignupForm from './SignupForm';

const messages = defineMessages({
  signup: {
    id: 'signup.header',
    defaultMessage: 'Sign up',
  },
});

const Signup = props =>
  <div id="Login">
    <div className="markdown-body">
      <h2>
        <FormattedMessage {...messages.signup} />
      </h2>
    </div>
    <Paper>
      <SignupForm />
    </Paper>
  </div>;

export default Signup;
