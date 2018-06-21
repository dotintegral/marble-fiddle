import * as rx from "rxjs";

import FakeObservable from "./FakeObservable";
import { nextStream, nextValue } from "./id";

export const of = (...values) => {
  const streamId = nextStream();

  const initialValues = values.map(v => ({
    value: v,
    timeId: 0,
    valueId: nextValue(),
    streamId
  }));

  return FakeObservable(() => ({
    stream$: rx.of(...initialValues),
    name: "of",
    streamId,
    initialValues
  }));
};
