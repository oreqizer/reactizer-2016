import React, { Component } from 'react';
import { Provider } from 'react-redux';

import App from './app/App';

import configureStore from '../universal/redux/configureStore';

const store = configureStore();

// -----------------------------------------
// Index needs to be a class for HMR to work
// -----------------------------------------

/* eslint-disable react/prefer-stateless-function */
export default class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
