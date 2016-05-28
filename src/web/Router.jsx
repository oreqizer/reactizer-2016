import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Index from './Index';
import Home from './modules/Home';
import Profile from './modules/Profile';
import Signup from './modules/Signup';
import Todos from './modules/Todos';

export default (
  <Route path="/" component={Index}>
    <IndexRoute component={Home} />
    <Route path="profile" component={Profile} />
    <Route path="signup" component={Signup} />
    <Route path="todos" component={Todos} />
  </Route>
);
