import util from 'util';

import chalk from 'chalk';
// TODO consider winston in a real app

function info(...messages) {
  messages.forEach(msg => {
    process.stdout.write(`${chalk.cyan('[INFO]')}: `);
    process.stdout.write(util.format(msg));
    process.stdout.write('\n');
  });
}

function success(...messages) {
  messages.forEach(msg => {
    process.stdout.write(`${chalk.green('[SUCCESS]')}: `);
    process.stdout.write(util.format(msg));
    process.stdout.write('\n');
  });
}

function warn(...messages) {
  messages.forEach(msg => {
    process.stderr.write(`${chalk.yellow('[WARNING]')}: `);
    process.stderr.write(util.format(msg));
    process.stderr.write('\n');
  });
}

function error(...messages) {
  messages.forEach(msg => {
    process.stderr.write(`${chalk.red('[ERROR]')}: `);
    process.stderr.write(util.format(msg));
    process.stderr.write('\n');
  });
}

export default {
  info,
  success,
  warn,
  error
};
