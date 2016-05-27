import { Record, fromJS } from 'immutable';

import {
  TOGGLE_SIDEBAR,
} from './uiActions';

const InitialState = new Record({
  sidebar: false,
});

export default function uiReducer(state = new InitialState(), action) {
  if (!(state instanceof InitialState)) return new InitialState(fromJS(state));

  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return state.set('sidebar', !state.sidebar);

    default:
      return state;
  }
}

export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR,
  };
}
