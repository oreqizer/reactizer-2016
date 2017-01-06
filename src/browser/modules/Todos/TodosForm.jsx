import React, { PropTypes } from 'react';
import { Form, Field } from 'redux-form-lite';

import TextInput from '../../components/TextInput';

import { TODO } from '../../../universal/consts/formConsts';
import { todoMessages } from '../../../universal/messages';


const TodosForm = props => (
  <Form name={TODO} onSubmit={props.onSubmit}>
    <Field
      name="todo"
      component={TextInput}
      id={todoMessages.prompt.id}
      hintText={props.formatMessage(todoMessages.prompt)}
    />
  </Form>
);

TodosForm.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TodosForm;
