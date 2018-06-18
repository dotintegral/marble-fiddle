import * as rxop from "rxjs/operators";

export const map = f => ({
  real: () => rxop.map(f),
  name: "map",
  transform: f,
  transformTime: t => t
});
