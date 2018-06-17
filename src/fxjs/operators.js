import * as rxop from 'rxjs/operators';

export const map = (f) => ({
  real: () => rxop.map(f),
  transform: f,
  name: 'map'
})
