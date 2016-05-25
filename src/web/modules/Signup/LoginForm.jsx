import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { injectIntl, intlShape } from 'react-intl';
import { TextField, FlatButton } from 'material-ui';

import { formMessages, userMessages } from '../../../universal/messages';

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
            id={props.intl.formatMessage(userMessages.username)}
            floatingLabelText={props.intl.formatMessage(userMessages.username)}
            {...username}
          />
        }
      />
    </div>
    <div className="Form-field">
      <Field
        name="email"
        component={username =>
          <TextField
            id={props.intl.formatMessage(userMessages.email)}
            floatingLabelText={props.intl.formatMessage(userMessages.email)}
            {...username}
          />
        }
      />
    </div>
    <div className="Form-field">
      <Field
        name="password"
        component={username =>
          <TextField
            id={props.intl.formatMessage(userMessages.password)}
            floatingLabelText={props.intl.formatMessage(userMessages.password)}
            type="password"
            {...username}
          />
        }
      />
    </div>
    <FlatButton
      primary
      type="submit"
      label={props.intl.formatMessage(formMessages.submit)}
    />
  </form>;

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

const Intled = injectIntl(LoginForm);

export default reduxForm({
  form: 'login',
})(Intled);
