import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Index from './Index';
import Home from './routes/Home';
import About from './routes/About';

export default (
  <Route name="app" component={Index} path="/">
    <IndexRoute component={Home} />
    <Route component={About} path="about" />
  </Route>
);
