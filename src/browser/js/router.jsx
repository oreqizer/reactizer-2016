import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Index from './Index';
// import Todos from './routes/Todos';
import About from './routes/About';

export default (
  <Route name="app" component={Index} path="/">
    <IndexRoute component={About} />
  </Route>
);
