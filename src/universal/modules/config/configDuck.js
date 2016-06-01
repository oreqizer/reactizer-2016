import { Record } from 'immutable';

const InitialState = new Record({
  appName: null,
});

export default function configReducer(state = new InitialState(), action) {
  if (!(state instanceof InitialState)) return new InitialState(state);

  switch (action.type) {

    // no actions here yet
    default:
      return state;

  }
}
