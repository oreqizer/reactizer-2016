import util from 'util';
import chalk from 'chalk';
import moment from 'moment';

const report = (prefix, messages) => {
  const time = chalk.gray(moment().format('DD-MM-YYYY HH:mm:ss'));
  messages.forEach(msg => {
    process.stdout.write(`[${time}] ${prefix} ${util.format(msg)}\n`);
  });
};

function info(...messages) {
  report(chalk.cyan('[INFO] '), messages);
}

function warn(...messages) {
  report(chalk.yellow('[WARN] '), messages);
}

function error(...messages) {
  report(chalk.red('[ERROR]'), messages);
}

export default {
  info,
  warn,
  error,
};
