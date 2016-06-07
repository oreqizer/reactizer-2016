import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Index from './modules/Index';
import Home from './modules/Home';
import Profile from './modules/Profile';
import Signup from './modules/Signup';
import Todos from './modules/Todos';

export default function getRoutes(store) {
  function checkAuth(nextState, replace) {
    if (!store.getState().user.token) {
      replace({
        pathname: '/signup',
        state: { nextPathname: nextState.location.pathname },
      });
    }
  }

  return (
    <Route path="/" component={Index}>
      <IndexRoute component={Home} />
      <Route path="signup" component={Signup} />
      <Route path="profile" component={Profile} onEnter={checkAuth} />
      <Route path="todos(/:filter)" component={Todos} onEnter={checkAuth} />
    </Route>
  );
}
