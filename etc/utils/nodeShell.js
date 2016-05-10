import { join } from 'path';
import { exec } from 'shelljs';

/**
 * @param command {string} command to run
 * @prop options.raw {boolean} don't prefix with node's path
 * @returns {function(cb: function): void}
 */
export default function (command, options = {}) {
  return cb => {
    const prefix = options.raw ? '' : join(__dirname, '../../node_modules/.bin/');
    const child = exec(`${prefix}${command}`, { async: true });

    child.on('close', cb);
  };
}
