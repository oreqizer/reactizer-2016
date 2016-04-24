import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory, RouterContext, match } from 'react-router';

import routes from '../shared/routes';
import logger from './../utils/logger/logger';

const app = express();

app.use((req, res) => {
    // TODO add Redux
    const history = createMemoryHistory(req.url);

    logger.info(`Request URL: ${req.url}`);

    match({ history, routes, location: req.url }, (err, redirect, renderProps) => {
        if (err) {
            logger.error(err);
            res.status(500).end('Internal server error');
            return;
        }

        if (!renderProps) {
            logger.warn('No matching route.');
            res.status(404).end('Not found.');
            return;
        }

        logger.info('Route matched.');
        const InitialComponent = (
            <RouterContext {...renderProps} />
        );

        const componentHTML = renderToString(InitialComponent);

        // TODO dynamic template in real app
        const HTML = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>Isomorphic Redux Demo</title>
                </head>
                <body>
                    <div id="react-view">${componentHTML}</div>
                    <script type="application/javascript" src="/bundle.js"></script>
                </body>
            </html>`;

        res.end(HTML);
    });
});

export default app;
