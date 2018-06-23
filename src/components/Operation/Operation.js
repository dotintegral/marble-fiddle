import React from "react";
import withStyles from "react-jss";
import * as R from "ramda";

import Marble from "../Marble";
import Stream from "../Stream";

import * as styles from "./Operation.jss";

const Operation = ({ operation, valueIds, classes }) => {
  const externalStreams = [];

  const marbles = valueIds
    .map(vId => operation.output.find(v => v.valueId === vId))
    .map((v, k) => {
      if (v && v.streamId !== operation.streamId) {
        if (!externalStreams.find(i => i.streamId === v.streamId)) {
          externalStreams.push({
            startPosition: k,
            streamId: v.streamId
          });
        }
      }
      return v;
    })
    .map(
      (v, k) =>
        v !== undefined ? (
          <Marble.Marble value={v} operation={operation} key={k} />
        ) : (
          <Marble.HiddenMarble key={k} />
        )
    );

  return (
    <div>
      {externalStreams.map(stream => {
        const placeHolders = [];

        for (let i = 0; i < stream.startPosition; i++) {
          placeHolders.push(<Marble.PlaceholderMarble key={i} />);
        }

        return (
          <div className={classes.externalStream} key={stream.streamId}>
            {placeHolders}
            <Stream streamId={stream.streamId} />
          </div>
        );
      })}
      <div className={classes.row}>
        <div className={classes.name}>{operation.name}</div>
        {marbles}
      </div>
    </div>
  );
};

const StyledOperation = withStyles(styles)(Operation);

const printOperation = ({ valueIds }) => (operation, k) => (
  <StyledOperation
    operation={operation}
    valueIds={valueIds}
    key={`operation-${k}`}
  />
);

const OperationCol = ({ operations, classes }) => {
  const valueIds = R.pipe(
    R.map(v => v.output.reduce((acc, val) => [...acc, val.valueId], [])),
    R.reduce((acc, ids) => [...acc, ...ids], []),
    R.uniq
  )(operations);

  return (
    <div className={classes.column}>
      {operations.map(printOperation({ valueIds }))}
    </div>
  );
};

export default withStyles(styles)(OperationCol);
