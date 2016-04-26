import shell from 'shelljs';

import logger from './etc/tools/logger';
import server from './server/server';
import env from './etc/config/env';

shell.exec('npm run watch', { async: true });

server.listen(env.PORT, () =>
    logger.info(`Express listening at port: ${env.PORT}`));
