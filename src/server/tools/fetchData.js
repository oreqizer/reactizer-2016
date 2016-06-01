export default function (store, sagaMiddleware, params) {
  const sagas = params.components
    .filter(component => component.needs)
    .reduce((list, component) => list.concat(component.needs), []);

  // we need to pass token as an arg for API calls
  const { token } = store.getState().user;

  const promises = sagas.map(saga => sagaMiddleware.run(saga, { token }).done);

  return Promise.all(promises);
}
