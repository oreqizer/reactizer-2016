import { Record } from 'immutable';

import { SET_LOCALE } from './intlActions';

const InitialState = new Record({
  defaultLocale: null,
  locale: null,
  locales: null,
  initialNow: null,
  messages: {},
});

export default function intlReducer(state = new InitialState(), action) {
  if (!(state instanceof InitialState)) return new InitialState(state);

  switch (action.type) {

    case SET_LOCALE:
      return state.set('locale', action.locale);

    default:
      return state;

  }
}

export function setLocale(locale) {
  return {
    type: SET_LOCALE,
    locale,
  };
}
