import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { createLocation } from 'history';

import routes from '../shared/routes';
import logger from './../utils/logger';

const app = express();

app.use((req, res) => {
    logger.info(`Request URL: ${req.url}`);
    const location = createLocation(req.url);

    match({ routes, location }, (err, redirectLocation, renderProps) => {
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
