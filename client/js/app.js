import 'babel-polyfill';
// ready
import React from 'react';
import { render } from 'react-dom';

import Root from './modules/Root.jsx';

render(
  <Root />,
  document.getElementById('react-view')
);

// -------------
// Hot-reloading
// -------------

/* eslint-disable */
if (module.hot) {
  module.hot.accept('./modules/Root.jsx', () => {
    // TODO: make babel preset 'es2015-webpack' work
    // to allow a simple usage of <Root /> instead of re-importing
    const NewRoot = require('./modules/Root.jsx');
    render(
      <NewRoot />,
      document.getElementById('react-view')
    );
  })
}
