export default () => next => action => {
  const color = '#FFF';
  const bg = '#222';

  // TODO more clever

  console.log(`%c ${action.type} `, `background: ${bg}; color: ${color}`); // eslint-disable-line

  return next(action);
};

