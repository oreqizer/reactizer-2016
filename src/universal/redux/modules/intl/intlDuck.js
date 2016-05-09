import { Record } from 'immutable';

export const SET_LOCALE = 'intl/SET_LOCALE';

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
      return state.set('currentLocale', action.locale);

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
