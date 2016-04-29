import logger from './../../etc/tools/logger';

export default () => next => action => {
  let writer = logger.info;

  if (action.type.includes('_SUCCESS')) {
    writer = logger.success;
  }

  if (action.type.includes('_ERROR')) {
    writer = logger.error;
  }

  writer(`=== ${action.type} ===`);

  return next(action);
};
