import { values } from 'lodash';

export default function (groups, sagaMiddleware) {
  // groups: Object has bunches of sagas
  values(groups)
      .forEach(bunch => {
        // each bunch: Object has sagas
        values(bunch)
            .forEach(saga => {
              sagaMiddleware.run(saga);
            });
      });
}
