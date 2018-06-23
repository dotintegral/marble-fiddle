import React from "react";
import withStyles from "react-jss";

import * as fxjs from "../../fxjs";

import * as styles from "./Marble.jss";

const marbleClasses = ({ classes, operation, value }) => {
  const result = [classes.marble];

  if (Object.keys(fxjs).includes(operation.name)) {
    result.push(classes.marbleCreated);
    return result.join(" ");
  }

  if (operation.streamId !== value.streamId) {
    result.push(classes.marbleCombined);
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

const PlaceholderMarble = ({ classes }) => (
  <div className={classes.placeholderMarble} />
);

export default {
  HiddenMarble: withStyles(styles)(HiddenMarble),
  PlaceholderMarble: withStyles(styles)(PlaceholderMarble),
  Marble: withStyles(styles)(Marble)
};
