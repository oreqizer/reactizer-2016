import path from 'path';
import express from 'express';
import shell from 'shelljs';

import startReact from './server/server';
import logger from './etc/tools/logger';
import env from './etc/config/env';

const app = express();

shell.exec('npm run watch', { async: true });

app.use(express.static(path.join(__dirname, env.TMP)));
logger.info(`Static files served from directory: ${env.TMP}`);

const server = startReact(app);

server.listen(env.PORT, () =>
    logger.info(`Express listening at port: ${env.PORT}`));
