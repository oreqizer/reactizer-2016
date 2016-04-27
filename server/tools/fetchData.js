export default function (dispatch, components, params) {
  const needs = components
      .filter(component => component.needs)
      .reduce((list, component) => list.concat(component.needs), []);

  const promises = needs.map(need => dispatch(need(params)));

  return Promise.all(promises);
}
