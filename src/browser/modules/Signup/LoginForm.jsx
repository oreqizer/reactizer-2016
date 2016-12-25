import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { RaisedButton } from 'material-ui';

import TextInput from '../../components/TextInput';

import { formMessages, userMessages } from '../../../universal/messages';
import { LOGIN } from '../../../universal/consts/formConsts';


const stopPropagation = ev => ev.stopPropagation(ev);

const LoginForm = props => (
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

LoginForm.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: LOGIN,
})(LoginForm);
