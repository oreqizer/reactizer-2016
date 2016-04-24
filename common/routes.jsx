import React from 'react';
import { Route } from 'react-router';

import Index from './paths/Index';

export default (
    <Route name="app" component={Index} path="/" />
);
