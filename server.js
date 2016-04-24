import logger from './utils/logger/logger';
import server from './server/server';
import env from './config/env';

server.listen(env.PORT, () =>
    logger.info(`Express listening at port: ${env.PORT}`));
