/* eslint-disable no-unused-vars */
import * as rx from "rxjs";
import * as rxop from "rxjs/operators";
import * as r from "ramda";
import { nextObservable } from "./id";
import { before, after, register, inspect, error, complete } from "./inspector";

const FakeObservable = cb => {
  const observableId = nextObservable();
  const { stream$, name, streamId, initialValues } = cb(observableId);

  register({
    name,
    streamId,
    observableId
  });

  if (initialValues) {
    initialValues.forEach(v => after({ streamId, observableId })(v));
  }

  const createFO = f =>
    FakeObservable(id => ({
      stream$: stream$.pipe(
        rxop.tap(before({ streamId, observableId: id })),
        rxop.flatMap(({ value, timeId, valueId }) =>
          rx.of(value).pipe(
            f.real(),
            rxop.map(realVal => ({
              value: realVal,
              timeId: f.transformTime(timeId),
              valueId: f.transformValue(valueId)
            }))
          )
        ),
        rxop.tap(after({ streamId, observableId: id }))
      ),
      name: f.name,
      streamId
    }));

  return {
    pipe: (f, ...moreFunctions) => {
      if (moreFunctions && moreFunctions.length > 0) {
        return createFO(f).pipe(...moreFunctions);
      } else {
        return createFO(f);
      }
    },

    subscribe: (f, e = () => {}, c = () => {}) => {
      const onValue = v => {
        f(v.value);
      };

      const onError = e;

      const onComplete = () => {
        c();
      };

      return stream$.subscribe(onValue, null, onComplete);
    }
  };
};

export default FakeObservable;
