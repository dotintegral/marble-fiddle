import * as rx from "rxjs";

import FakeObservable from "./FakeObservable";
import { nextStream, nextValue } from "./id";

export const of = (...values) => {
  const initialValues = values.map(v => ({
    value: v,
    timeId: 0,
    valueId: nextValue(),
  }));

  return FakeObservable(() => ({
    stream$: rx.of(...initialValues),
    name: "of",
    streamId: nextStream(),
    initialValues
  }));
};
