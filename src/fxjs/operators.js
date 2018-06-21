import * as rxop from "rxjs/operators";
import { nextValue } from "./id";

// TODO should be next time/stream
export const count = f => ({
  transform: () => stream$ =>
    stream$.pipe(
      rxop.count(),
      rxop.map(v => ({
        value: v,
        valueId: nextValue()
      }))
    ),
  name: "count"
});

export const filter = f => ({
  transform: () => rxop.filter(v => f(v.value)),
  name: "filter"
});

export const first = () => ({
  transform: () => rxop.first(),
  name: "first"
});

export const last = () => ({
  transform: () => rxop.last(),
  name: "last"
});

export const map = f => ({
  transform: () =>
    rxop.map(v => ({
      ...v,
      value: f(v.value)
    })),
  name: "map"
});

export const mapTo = f => ({
  transform: () =>
    rxop.map(v => ({
      ...v,
      value: f
    })),
  name: "map"
});

export const scan = (f, start) => ({
  transform: () =>
    rxop.scan(
      (acc, v) => {
        return {
          ...v,
          value: f(acc.value, v.value)
        };
      },
      { value: start }
    ),
  name: "scan"
});

export const single = f => ({
  transform: () => rxop.single(v => f(v.value)),
  name: "single"
});

export const skip = f => ({
  transform: () => rxop.skip(f),
  name: "skip"
});

export const tap = f => ({
  transform: () => rxop.tap(v => f(v.value)),
  name: "tap"
});
