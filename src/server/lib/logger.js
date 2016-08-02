/* eslint-disable no-console */
import chalk from 'chalk';
import moment from 'moment';

const time = () => chalk.gray(moment().format('DD-MM-YYYY HH:mm:ss'));

function info(...messages) {
  console.log(`[${time()}] ${chalk.cyan('[INFO] ')}`, ...messages);
}

function warn(...messages) {
  console.log(`[${time()}] ${chalk.yellow('[WARN] ')}`, ...messages);
}

function error(...messages) {
  console.log(`[${time()}] ${chalk.red('[ERROR]')}`, ...messages);
}

export default {
  info,
  warn,
  error,
};
