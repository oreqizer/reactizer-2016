import React from 'react';
import { render } from 'react-dom';

import immutable from 'immutable';
import immutableDevtools from 'immutable-devtools';

// nice console logs
immutableDevtools(immutable);

import Root from './modules/Root.jsx';

const view = document.getElementById('react-view');

render(
  <Root />,
  view
);

// -------------------
// Hot-reloading React
// -------------------

/* eslint-disable no-undef */
if (module.hot) {
  module.hot.accept('./modules/Root.jsx', () => {
    render(
      <Root />,
      view
    );
  });
}
