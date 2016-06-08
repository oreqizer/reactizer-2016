import React, { Component } from 'react';
import { Provider } from 'react-redux';

import App from './app/App';

import configureStore from '../universal/configureStore';
import configureGlobals from '../universal/configureGlobals';
import { NATIVE } from '../universal/consts/envConsts';

configureGlobals(NATIVE);

const store = configureStore();

// Provider needs to be wrapped in a Root component
// otherwise, this happens: https://github.com/oreqizer/reactizer/issues/5
const Root = () =>
  <Provider store={store}>
    <App />
  </Provider>;

// ----------------------------------------
// Hot-reloading: Index needs to be a class
// ----------------------------------------

/* eslint-disable react/prefer-stateless-function */
export default class Index extends Component {
  render() {
    return (
      <Root />
    );
  }
}
