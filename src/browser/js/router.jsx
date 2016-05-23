import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Index from './Index';
// import Todos from './routes/Todos';
import Home from './routes/Home';

export default (
  <Route name="app" component={Index} path="/">
    <IndexRoute component={Home} />
  </Route>
);
