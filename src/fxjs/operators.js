import * as rxop from "rxjs/operators";

export const map = f => ({
  real: () => rxop.map(f),
  name: "map",
  transform: f,
  transformTime: t => t,
  transformValue: v => v
});

export const filter = f => ({
  real: () => rxop.filter(f),
  name: "filter",
  transform: f,
  transformTime: t => t,
  transformValue: v => v
});
