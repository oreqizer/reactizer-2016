import chalk from 'chalk';

export default () => next => action => {
  // TODO more clever
  console.log(chalk.white.bgBlack(action.type)); // eslint-disable-line

  return next(action);
};

