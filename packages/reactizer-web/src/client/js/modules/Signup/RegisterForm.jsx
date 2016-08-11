import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import { injectIntl, intlShape } from 'react-intl';
import { RaisedButton } from 'material-ui';

import TextField from '../../components/TextField';

import { formMessages, userMessages } from '../../../../universal/messages';
import { REGISTER } from '../../../../../packages/reactizer-core/src/consts/formConsts';
import validate, * as check from '../../../../../packages/reactizer-core/src/tools/validator';

const RegisterForm = props =>
  <form
    className="Signup-form"
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
    <div className="Form-field">
      <Field
        name="email"
        component={TextField}
        id={userMessages.email.id}
        floatingLabelText={props.intl.formatMessage(userMessages.email)}
        type="email"
      />
    </div>
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

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default compose(
  injectIntl,
  reduxForm({
    form: REGISTER,
    validate: values => ({
      username: validate(values.username, check.isRequired),
      email: validate(values.email, check.isRequired, check.isEmail),
      password: validate(values.password, check.isRequired, check.isPassword),
    }),
  })
)(RegisterForm);
