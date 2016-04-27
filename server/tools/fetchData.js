export default function (store, sagaMiddleware, components, params) {
  const needs = components
      .filter(component => component.needs)
      .reduce((list, component) => list.concat(component.needs), []);

  // const promises = needs.map(need => dispatch(need(params))); TODO run middleware

  return Promise.all(promises);
}
