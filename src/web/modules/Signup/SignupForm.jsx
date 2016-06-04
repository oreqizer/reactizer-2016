import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { injectIntl, intlShape } from 'react-intl';
import { RaisedButton } from 'material-ui';
import { TextField } from 'redux-form-material-ui'; // eslint-disable-line

import { formMessages, userMessages } from '../../../universal/messages';

const SignupForm = props =>
  <form
    className="LoginForm"
    onSubmit={props.handleSubmit}
    onChange={ev => ev.stopPropagation()}
  >
    <div className="Form-field">
      <Field
        name="username"
        component={TextField}
        id={userMessages.username.id}
        floatingLabelText={props.intl.formatMessage(userMessages.username)}
      />
    </div>
    {props.register &&
      <div className="Form-field">
        <Field
          name="email"
          component={TextField}
          id={userMessages.email.id}
          floatingLabelText={props.intl.formatMessage(userMessages.email)}
          type="email"
        />
      </div>
    }
    <div className="Form-field">
      <Field
        name="password"
        component={TextField}
        id={userMessages.password.id}
        floatingLabelText={props.intl.formatMessage(userMessages.password)}
        type="password"
      />
    </div>
    <RaisedButton
      primary
      disabled={props.submitting}
      type="submit"
      label={props.intl.formatMessage(formMessages.submit)}
    />
  </form>;

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  register: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

const Intled = injectIntl(SignupForm);

export default reduxForm({
  form: 'signup',
})(Intled);
