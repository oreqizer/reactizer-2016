import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { injectIntl, intlShape } from 'react-intl';
import { TextField, RaisedButton } from 'material-ui';

import { formMessages, userMessages } from '../../../universal/messages';

const ID_PREFIX = 'login_id_';

const LoginForm = props =>
  <form
    className="LoginForm"
    onSubmit={props.handleSubmit}
    onChange={ev => ev.stopPropagation()}
  >
    <div className="Form-field">
      <Field
        name="username"
        component={username =>
          <TextField
            id={ID_PREFIX + userMessages.username.id}
            floatingLabelText={props.intl.formatMessage(userMessages.username)}
            {...username}
          />
        }
      />
    </div>
    <div className="Form-field">
      <Field
        name="password"
        component={password =>
          <TextField
            id={ID_PREFIX + userMessages.password.id}
            floatingLabelText={props.intl.formatMessage(userMessages.password)}
            type="password"
            {...password}
          />
        }
      />
    </div>
    <RaisedButton
      primary
      disabled={props.submitting}
      type="submit"
      label={props.intl.formatMessage(formMessages.submit)}
    />
  </form>;

LoginForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

const Intled = injectIntl(LoginForm);

export default reduxForm({
  form: 'login',
})(Intled);
