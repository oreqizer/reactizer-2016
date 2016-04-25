import { fromJS } from 'immutable';

// TODO add support for Records
// dat dere dot syntax too good to pass

export default function (initialState) {
  const state = {};

  Object
      .keys(initialState)
      .forEach(key => {
        state[key] = fromJS(initialState[key]);
      });

  return state;
}
