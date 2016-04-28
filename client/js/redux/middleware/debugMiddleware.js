export default () => next => action => {
  let color = '#FFF';
  const bg = '#222';

  if (action.type.includes('_SUCCESS')) {
    color = '#7EDE8B';
  }

  if (action.type.includes('_ERROR')) {
    color = '#E88054';
  }

  console.log(`%c ${action.type} `, `background: ${bg}; color: ${color}`); // eslint-disable-line

  return next(action);
};

