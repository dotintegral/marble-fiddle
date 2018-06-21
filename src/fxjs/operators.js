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

export const count = f => ({
  real: () => rxop.count(f),
  name: "count",
  transform: f,
  transformTime: t => t,
  transformValue: v => v
});
