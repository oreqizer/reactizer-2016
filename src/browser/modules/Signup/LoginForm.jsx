import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'redux-form-lite';
import { isSubmitting } from 'redux-form-lite/selectors';
import { RaisedButton } from 'material-ui';

import TextInput from '../../components/TextInput';

import { formMessages, userMessages } from '../../../universal/messages';
import { LOGIN } from '../../../universal/consts/formConsts';


const LoginForm = props => (
  <Form
    name={LOGIN}
    onSubmit={props.onSubmit}
    className="Signup-form"
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
  </Form>
);

LoginForm.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default connect(state => ({
  submitting: isSubmitting(LOGIN, state),
}))(LoginForm);
