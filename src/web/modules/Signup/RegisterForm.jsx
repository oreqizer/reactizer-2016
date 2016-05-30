import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { injectIntl, intlShape } from 'react-intl';
import { RaisedButton } from 'material-ui';
import adapter from 'redux-form-material-ui'

import { formMessages, userMessages } from '../../../universal/messages';

const ID_PREFIX = 'register_id_';

const RegisterForm = props =>
  <form
    className="RegisterForm"
    onSubmit={props.handleSubmit}
    onChange={ev => ev.stopPropagation()}
  >
    <div className="Form-field">
      <Field
        name="username"
        component="TextField"
        id={ID_PREFIX + userMessages.username.id}
        floatingLabelText={props.intl.formatMessage(userMessages.username)}
      />
    </div>
    <div className="Form-field">
      <Field
        name="email"
        component="TextField"
        id={ID_PREFIX + userMessages.email.id}
        floatingLabelText={props.intl.formatMessage(userMessages.email)}
        type="email"
      />
    </div>
    <div className="Form-field">
      <Field
        name="password"
        component="TextField"
        id={ID_PREFIX + userMessages.password.id}
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

RegisterForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

const Intled = injectIntl(RegisterForm);

export default reduxForm({
  form: 'register',
  adapter,
})(Intled);
