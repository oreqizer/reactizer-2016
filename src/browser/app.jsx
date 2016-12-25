import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import whyDidYouUpdate from 'why-did-you-update'; // eslint-disable-line import/no-extraneous-dependencies
import immutable from 'immutable';
import immutableDevtools from 'immutable-devtools'; // eslint-disable-line import/no-extraneous-dependencies
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import sk from 'react-intl/locale-data/sk';

import Root from './Root';

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// react-intl locale data
addLocaleData([...en, ...sk]);

if (process.env.NODE_ENV !== 'production') { // eslint-disable-line no-undef
  // immutable: logging to the console and debugging
  immutableDevtools(immutable);
  // puts the console on fire when unnecessary updates are done
  whyDidYouUpdate(React, { exclude: /^Connect|^IntlProvider|^InjectIntl/ });
}

const view = document.getElementById('react-view');

render(
  <Root />,
  view,
);

// -------------------
// Hot-reloading React
// -------------------

/* eslint-disable no-undef */
if (module.hot) {
  module.hot.accept('./Root', () => {
    render(
      <Root />,
      view,
    );
  });
}
