export default function (store, sagaMiddleware, params) {
  const sagas = params.components
    .filter(component => component.needs)
    .reduce((list, component) => list.concat(component.needs), []);

  const promises = sagas.map(saga => sagaMiddleware.run(saga, params).done);

  return Promise.all(promises);
}
