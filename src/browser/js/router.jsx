import React from 'react';
import { Route } from 'react-router';

import Index from './Index';
import Home from './routes/Home';
import About from './routes/About';

export default (
  <Route name="app" component={Index} path="/">
    <Route component={Home} path="home" />
    <Route component={About} path="about" />
  </Route>
);
