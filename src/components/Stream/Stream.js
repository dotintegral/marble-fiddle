import React from "react";
import withStyles from "react-jss";
import * as R from "ramda";

import { inspect } from "../../fxjs/inspector";
import OperationCol from "../Operation";

import Marble from "../Marble";

import * as styles from "./Stream.jss";

console.log(Marble);

//
//
//

const ValueCol = ({ values, valueId, classes }) => {
  const marbles = values
    .map(v => v.output)
    .map(v => v.find(i => i.valueId === valueId))
    .map(
      (v, k) =>
        v !== undefined ? (
          <Marble.Marble value={v} key={k} />
        ) : (
          <Marble.HiddenMarble key={k} />
        )
    );

  return <div className={classes.valueCol}>{marbles}</div>;
};

const StyledValueCol = withStyles(styles)(ValueCol);

//
//
//

const Stream = ({ streamId, classes }) => {
  if (streamId === null || streamId === undefined) {
    return null;
  }

  const inspected = inspect(streamId);
  const values = Object.values(inspected);

  const valueIds = R.pipe(
    R.map(v => v.output.reduce((acc, val) => [...acc, val.valueId], [])),
    R.reduce((acc, ids) => [...acc, ...ids], []),
    R.uniq
  )(values);

  return (
    <div className={classes.stream}>
      <OperationCol values={values} />
      {valueIds.map(valueId => (
        <StyledValueCol values={values} valueId={valueId} key={valueId} />
      ))}
    </div>
  );
};

export default withStyles(styles)(Stream);
