import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { reduxForm, Field } from 'redux-form/immutable';

import TextField from '../../components/TextField';

import { TODO } from '../../../../universal/consts/formConsts';
import { todoMessages } from '../../../../universal/messages';

const TodosForm = props =>
  <form onSubmit={props.handleSubmit}>
    <Field
      id={todoMessages.prompt.id}
      name="todo"
      component={TextField}
      hintText={<FormattedMessage {...todoMessages.prompt} />}
    />
  </form>;

TodosForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: TODO,
})(TodosForm);
