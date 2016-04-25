import React from 'react';
import { Route } from 'react-router';

import Index from './routes/Index';
import Home from './routes/Home';

export default (
  <Route name="app" component={Index} path="/">
    <Route component={Home} path="home" />
  </Route>
);
