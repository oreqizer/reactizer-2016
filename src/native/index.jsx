import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { reducer } from '../universal/reduxRoot';

import App from './app/App';

const store = createStore(reducer);

// Provider needs to be wrapped in a Root component
// otherwise, this happens: https://github.com/oreqizer/reactizer/issues/5
const Root = () =>
  <Provider store={store}>
    <App />
  </Provider>;

// ----------------------------------------
// Hot-reloading: Index needs to be a class
// ----------------------------------------

/* eslint-disable react/prefer-stateless-function, class-methods-use-this */
export default class Index extends Component {
  render() {
    return (
      <Root />
    );
  }
}
