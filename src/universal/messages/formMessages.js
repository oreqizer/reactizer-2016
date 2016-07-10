import { defineMessages } from 'react-intl';

export default defineMessages({
  submit: {
    id: 'form.submit',
    defaultMessage: 'Submit',
  },
  // errors
  required: {
    id: 'form.error.required',
    defaultMessage: 'This field is required',
  },
  invalid: {
    id: 'form.error.invalid',
    defaultMessage: 'Invalid value',
  },
  weakPassword: {
    id: 'form.error.weak_password',
    defaultMessage: 'Password too weak',
  },
});
