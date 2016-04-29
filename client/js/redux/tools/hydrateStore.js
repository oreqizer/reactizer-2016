import { fromJS } from 'immutable';

// TODO add support for Records
// dat dere dot syntax too good to pass

export default function (initialState) {
  const decodedState = JSON.parse(decodeURI(initialState));

  const state = {};

  Object
    .keys(decodedState)
    .forEach(key => {
      state[key] = fromJS(decodedState[key]);
    });

  return state;
}
