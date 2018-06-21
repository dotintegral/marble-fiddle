import React from "react";
import withStyles from "react-jss";

import * as fxjs from "../../fxjs";

import * as styles from "./Marble.jss";

const marbleClasses = ({ classes, operation, value }) => {
  const result = [classes.marble];
  const combinationFunctions = ["concat", "merge"];

  if (Object.keys(fxjs).includes(operation.name)) {
    result.push(classes.marbleCreated);
    return result.join(" ");
  }

  if (
    operation.streamId !== value.streamId &&
    combinationFunctions.includes(operation.name)
  ) {
    result.push(classes.marbleCreated);
    return result.join(" ");
  }

  switch (typeof value.value) {
    case "number": {
      result.push(classes.marbleNumber);
      break;
    }

    case "string": {
      result.push(classes.marbleString);
      break;
    }

    default: {
      result.push(classes.marbleGeneric);
    }
  }

  return result.join(" ");
};

const Marble = ({ value, operation, classes }) => (
  <div className={marbleClasses({ classes, value, operation })}>
    {value.value}
  </div>
);

const HiddenMarble = ({ classes }) => <div className={classes.hiddenMarble} />;

export default {
  HiddenMarble: withStyles(styles)(HiddenMarble),
  Marble: withStyles(styles)(Marble)
};
