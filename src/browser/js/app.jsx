import React from 'react';
import { render } from 'react-dom';
import immutable from 'immutable';
import immutableDevtools from 'immutable-devtools';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import sk from 'react-intl/locale-data/sk';

import Root from './Root';
import configureGlobals from '../../universal/configureGlobals';

// react-intl locale data
addLocaleData([...en, ...sk]);

// immutable: logging to the console and debugging
immutableDevtools(immutable);

configureGlobals();

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
  module.hot.accept('./Root', () => {
    render(
      <Root />,
      view
    );
  });
}
