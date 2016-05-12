import util from 'util';

import chalk from 'chalk';
// TODO consider winston in a real app

const report = (prefix, messages) => {
  messages.forEach(msg => {
    process.stdout.write(`${prefix}: ${util.format(msg)}\n`);
  });
};

function info(...messages) {
  report(chalk.cyan('[INFO]'), messages);
}

function success(...messages) {
  report(chalk.green('[SUCCESS]'), messages);
}

function warn(...messages) {
  report(chalk.yellow('[WARNING]'), messages);
}

function error(...messages) {
  report(chalk.red('[ERROR]'), messages);
}

export default {
  info,
  success,
  warn,
  error,
};
