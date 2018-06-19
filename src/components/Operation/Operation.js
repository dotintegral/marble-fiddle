import React from "react";
import withStyles from "react-jss";

import * as styles from "./Operation.jss";

const Operation = ({ operation, classes }) => (
  <div className={classes.row}>
    <div className={classes.name}>{operation.name}</div>
  </div>
);

const StyledOperation = withStyles(styles)(Operation);

const printOperation = (operation, k) => (
  <StyledOperation operation={operation} key={`operation-${k}`} />
);

const OperationCol = ({ values, classes }) => (
  <div className={classes.column}>{values.map(printOperation)}</div>
);

export default withStyles(styles)(OperationCol);
