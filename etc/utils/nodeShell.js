import { join } from 'path';
import { spawn } from 'child_process';

import logger from '../../src/server/tools/logger';

/**
 * @param fullCommand {string} command + args to run
 * @prop options.raw {boolean} don't prefix with node's path
 * @returns {function(cb: function): void}
 */
export default function (fullCommand, options = {}) {
  return cb => {
    const [command, ...args] = fullCommand.split(' ');
    const prefix = options.raw ? '' : join(__dirname, '../../node_modules/.bin/');

    logger.info(prefix + command);
    logger.info(args.join(' '));

    const child = spawn(prefix + command, args, {
      stdio: 'inherit',
    });

    child.on('close', cb);
  };
}
