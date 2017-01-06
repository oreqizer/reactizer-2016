import validator from 'validator';

import { formMessages } from '../messages';

function check(ok, error) {
  return ok ? null : error;
}

export function isRequired(input = '') {
  return check(input.length > 0, formMessages.required);
}

export function isEmail(input) {
  return isRequired(input) ||
    check(validator.isEmail(input), formMessages.invalid);
}

export function isPassword(input = '') {
  const lower = /[a-z]/.test(input);
  const upper = /[A-Z]/.test(input);
  const num = /[0-9]/.test(input);

  return isRequired(input) ||
    check(input.length >= 8 && lower && upper && num, formMessages.weakPassword);
}
