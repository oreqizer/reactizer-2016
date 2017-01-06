import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'redux-form-lite';
import { isSubmitting } from 'redux-form-lite/selectors';
import { RaisedButton } from 'material-ui';

import TextInput from '../../components/TextInput';

import { formMessages, userMessages } from '../../../universal/messages';
import { REGISTER } from '../../../universal/consts/formConsts';
import { isRequired, isEmail, isPassword } from '../../../universal/tools/validator';


const RegisterForm = props => (
  <Form
    name={REGISTER}
    onSubmit={props.onSubmit}
    className="Signup-form"
  >
    <div className="Form-field">
      <Field
        name="username"
        component={TextInput}
        validate={isRequired}
        id={userMessages.username.id}
        floatingLabelText={props.formatMessage(userMessages.username)}
      />
    </div>
    <div className="Form-field">
      <Field
        name="email"
        component={TextInput}
        validate={isEmail}
        id={userMessages.email.id}
        floatingLabelText={props.formatMessage(userMessages.email)}
        type="email"
      />
    </div>
    <div className="Form-field">
      <Field
        name="password"
        component={TextInput}
        validate={isPassword}
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
  </Form>
);

RegisterForm.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default connect(state => ({
  submitting: isSubmitting(REGISTER, state),
}))(RegisterForm);
