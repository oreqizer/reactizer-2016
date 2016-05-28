import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Index from './Index';
// import Todos from './routes/Todos';
import Home from './modules/Home';
import Signup from './modules/Signup';
import Profile from './modules/Profile';

export default (
  <Route path="/" component={Index}>
    <IndexRoute component={Home} />
    <Route path="signup" component={Signup} />
    <Route path="profile" component={Profile} />
  </Route>
);
