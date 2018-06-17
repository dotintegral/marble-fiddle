import * as rx from 'rxjs';

import FakeObservable from './FakeObservable';
import { nextStream } from './id';

export const of = (...val) =>
  FakeObservable(() => ({
    stream$: rx.of(...val),
    name: 'of',
    streamId: nextStream()
  }))
