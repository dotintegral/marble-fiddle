/* eslint-disable no-unused-vars */
import * as rx from "rxjs";
import * as rxop from "rxjs/operators";
import * as r from "ramda";
import { nextObservable } from "./id";
import { before, after, register, inspect, error, complete } from "./inspector";

const FakeObservable = cb => {
  const observableId = nextObservable();
  const { stream$, name, streamId } = cb(observableId);

  register({
    name,
    streamId,
    observableId
  });

  const createFO = f =>
    FakeObservable(id => ({
      stream$: stream$.pipe(
        rxop.tap(before({ streamId, observableId: id })),
        rxop.flatMap(({ value, timeId }) =>
          rx.of(value).pipe(
            f.real(),
            rxop.map(realVal => ({
              value: realVal,
              timeId: f.transformTime(timeId)
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
        console.log(inspect(streamId));
      };

      const onError = e;

      const onComplete = () => {
        c();
        console.log(complete(streamId));
      };

      stream$.subscribe(onValue);
    }
  };
};

export default FakeObservable;
