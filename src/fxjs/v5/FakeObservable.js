import 'rxjs/add/operator/map.js';

const FakeObservable = (stream$, operation) => ({
  _stream$: stream$,
  _operations$: [],

  subscribe: (f) => {
    stream$.subscribe(f)
  },

  map: (f) => {
    return FakeObservable(stream$.map(f))
  }
})

export default FakeObservable;
