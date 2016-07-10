import React from 'react';
import {
  Navigator,
} from 'react-native';

import { home, noUser } from '../routes';

const App = () =>
  <Navigator
    initialRouteStack={noUser}
    initialRoute={home}
    renderScene={({ RouteView }, nav) =>
      <RouteView nav={nav} />
    }
  />;

export default App;
