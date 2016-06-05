export default function (store, sagaMiddleware, params) {
  // check also for wrapped components
  const wrapped = params.components
    .filter(component => component.WrappedComponent)
    .map(component => component.WrappedComponent);

  // extract sagas from flat/wrapped components
  const sagas = params.components
    .concat(wrapped)
    .filter(component => component.needs)
    .reduce((list, component) => list.concat(component.needs), []);

  // token has to be passed to API calls
  const { token } = store.getState().user;

  const promises = sagas.map(saga => sagaMiddleware.run(saga, { token }).done);

  return Promise.all(promises);
}
