import React, { PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { reduxForm, Field } from 'redux-form/immutable';

import TextField from '../../components/TextField';

import { TODO } from '../../../../universal/consts/formConsts';

const messages = defineMessages({
  prompt: {
    id: 'todos.form_prompt',
    defaultMessage: 'Enter a TODO',
  },
});

const TodosForm = props =>
  <form onSubmit={props.handleSubmit}>
    <Field
      id={messages.prompt.id}
      name="todo"
      component={TextField}
      hintText={<FormattedMessage {...messages.prompt} />}
    />
  </form>;

TodosForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: TODO,
})(TodosForm);
