/* eslint-disable no-console */
import util from 'util';
import chalk from 'chalk';
import moment from 'moment';

const time = () => chalk.gray(moment().format('DD-MM-YYYY HH:mm:ss'));

function info(...args) {
  process.stdout.write(`[${time()}] ${chalk.cyan('[INFO] ')} ${util.format(...args)}\n`);
}

function warn(...args) {
  process.stdout.write(`[${time()}] ${chalk.yellow('[WARN] ')} ${util.format(...args)}\n`);
}

function error(...args) {
  process.stderr.write(`[${time()}] ${chalk.red('[ERROR]')} ${util.format(...args)}\n`);
}

export default {
  info,
  warn,
  error,
};
