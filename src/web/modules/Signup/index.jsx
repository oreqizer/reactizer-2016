import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { defineMessages, FormattedMessage } from 'react-intl';
import { reduxForm, Field } from 'redux-form';
import { Paper, TextField } from 'material-ui';

import { login, register } from '../../../universal/redux/modules/user/userDuck';
import { userMessages, formMessages } from '../../../universal/messages';

const messages = defineMessages({
  signup: {
    id: 'signup.header',
    defaultMessage: 'Sign up',
  },
});

@reduxForm({
  form: 'signup',
})
@connect(state => ({
  user: state.user,
}))
export default class Signup extends Component {
  render() {
    return (
      <div id="Login">
        <div className="markdown-body">
          <h2>
            <FormattedMessage {...messages.signup} />
          </h2>
        </div>
        <Paper>
          <Field
            name="username"
            component={username =>
              <TextField
                hintText={<FormattedMessage {...formMessages.enter} field="username" />}
                floatingLabelText={"username"}
                {...username}
              />
            }
          />
        </Paper>
      </div>
    );
  }
}
