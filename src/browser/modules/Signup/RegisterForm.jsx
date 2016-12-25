import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { RaisedButton } from 'material-ui';

import TextInput from '../../components/TextInput';

import { formMessages, userMessages } from '../../../universal/messages';
import { REGISTER } from '../../../universal/consts/formConsts';
import validate, * as check from '../../../universal/tools/validator';


const stopPropagation = ev => ev.stopPropagation(ev);

const RegisterForm = props => (
  <form
    className="Signup-form"
    onSubmit={props.handleSubmit}
    onChange={stopPropagation}
  >
    <div className="Form-field">
      <Field
        name="username"
        component={TextInput}
        id={userMessages.username.id}
        floatingLabelText={props.formatMessage(userMessages.username)}
      />
    </div>
    <div className="Form-field">
      <Field
        name="email"
        component={TextInput}
        id={userMessages.email.id}
        floatingLabelText={props.formatMessage(userMessages.email)}
        type="email"
      />
    </div>
    <div className="Form-field">
      <Field
        name="password"
        component={TextInput}
        id={userMessages.password.id}
        floatingLabelText={props.formatMessage(userMessages.password)}
        type="password"
      />
    </div>
    <RaisedButton
      primary
      disabled={props.submitting}
      type="submit"
      label={props.formatMessage(formMessages.submit)}
    />
  </form>
);

RegisterForm.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: REGISTER,
  validate: values => ({
    username: validate(values.username, check.isRequired),
    email: validate(values.email, check.isRequired, check.isEmail),
    password: validate(values.password, check.isRequired, check.isPassword),
  }),
})(RegisterForm);
