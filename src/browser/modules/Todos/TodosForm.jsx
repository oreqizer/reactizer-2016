import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import TextInput from '../../components/TextInput';

import { TODO } from '../../../universal/consts/formConsts';
import { todoMessages } from '../../../universal/messages';


const TodosForm = props => (
  <form onSubmit={props.handleSubmit}>
    <Field
      id={todoMessages.prompt.id}
      name="todo"
      component={TextInput}
      hintText={props.formatMessage(todoMessages.prompt)}
    />
  </form>
);

TodosForm.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: TODO,
})(TodosForm);
