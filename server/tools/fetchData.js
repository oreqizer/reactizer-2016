export default function (store, sagaMiddleware, components, params) {
  const sagas = components
      .filter(component => component.needs)
      .reduce((list, component) => list.concat(component.needs), []);

  const promises = sagas.map(saga => sagaMiddleware.run(saga, params).done);

  return Promise.all(promises);
}
