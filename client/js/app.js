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
    render(
      <Root />,
      document.getElementById('react-view')
    );
  })
}
