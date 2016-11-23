export default function fetchNeeds(store, params) {
  // check also for wrapped components
  const wrapped = params.components
    .filter(component => component.WrappedComponent)
    .map(component => component.WrappedComponent);

  // extract observables from flat/wrapped components
  const promises = params.components
    .concat(wrapped)
    .filter(component => component.needs)
    .reduce((list, component) => list.concat(component.needs), [])
    .map(observable => observable.toPromise());

  return Promise.all(promises);
}
