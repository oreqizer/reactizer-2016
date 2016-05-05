import { join } from 'path';
import Koa from 'koa';
import serve from 'koa-static';

import startReact from './middleware/reactMiddleware';
import logger from './../../etc/tools/logger';
import env from './../../etc/config/env';

const app = new Koa();

if (process.env.NODE_ENV === env.BETA) {
  // served by Nginx in npmproduction
  app.use(serve(join(__dirname, '../../', env.DIST)));
  logger.info(`Static files served from directory: ${env.DIST}`);
}

const server = startReact(app);

server.listen(env.PORT, () =>
    logger.info(`Express listening at port: ${env.PORT}`));
