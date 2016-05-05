import React from 'react';
import { render } from 'react-dom';

import Root from './modules/Root.jsx';

const view = document.getElementById('react-view');

render(
  <Root />,
  view
);

// -------------------
// Hot-reloading React
// -------------------

/* eslint-disable */
if (module.hot) {
  module.hot.accept('./modules/Root.jsx', () => {
    render(
      <Root />,
      view
    );
  })
}
