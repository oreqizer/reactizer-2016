import axios from 'axios';

export default function (store, sagaMiddleware, params) {
  const sagas = params.components
    .filter(component => component.needs)
    .reduce((list, component) => list.concat(component.needs), []);

  const { user } = store.getState();

  if (user.token) {
    // needs to be set for API calls to work
    axios.headers.common.Authorization = user.token;
  }

  const promises = sagas.map(saga => sagaMiddleware.run(saga, params).done);

  return Promise.all(promises);
}
