import * as rx from "rxjs";

import FakeObservable from "./FakeObservable";
import { nextStream } from "./id";

export const of = (...values) =>
  FakeObservable(() => ({
    stream$: rx.of(...values.map(v => ({ value: v, timeId: 0 }))),
    name: "of",
    streamId: nextStream()
  }));
