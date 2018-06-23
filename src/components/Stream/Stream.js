import React from "react";
import withStyles from "react-jss";

import { inspect } from "../../fxjs/inspector";
import { getStreamName } from "../../fxjs/id";
import OperationCol from "../Operation";

import Marble from "../Marble";

import * as styles from "./Stream.jss";

//
//
//

const ValueCol = ({ operations, valueId, classes }) => {
  const marbles = operations
    .map(v => v.output)
    .map(v => v.find(i => i.valueId === valueId))
    .map(
      (v, k) =>
        v !== undefined ? (
          <Marble.Marble value={v} operation={operations[k]} key={k} />
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

const StreamHeader = ({ classes, streamId }) => {
  if (getStreamName(streamId)) {
    return (
      <div className={classes.streamHeader}>{getStreamName(streamId)}</div>
    );
  }

  return null;
};

const Stream = ({ streamId, classes }) => {
  if (streamId === null || streamId === undefined) {
    return null;
  }

  const inspected = inspect(streamId);
  const operations = Object.values(inspected);

  return (
    <div className={classes.stream}>
      <StreamHeader classes={classes} streamId={streamId} />
      <OperationCol operations={operations} />
    </div>
  );
};

export default withStyles(styles)(Stream);
