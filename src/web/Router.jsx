import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Index from './Index';
// import Todos from './routes/Todos';
import Home from './routes/Home';
import Signup from './modules/Signup';

export default (
  <Route path="/" component={Index}>
    <IndexRoute component={Home} />
    <Route path="signup" component={Signup} />
  </Route>
);
