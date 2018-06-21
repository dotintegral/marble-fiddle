import React from "react";
import withStyles from "react-jss";

import * as styles from "./Marble.jss";

const marbleClasses = (classes, v) => {
  const result = [classes.marble];

  switch (typeof v.value) {
    case "number": {
      result.push(classes.marbleNumber);
      break;
    }

    case "string": {
      result.push(classes.marbleString);
      break;
    }

    default: {
      console.log(v);
      result.push(classes.marbleGeneric);
    }
  }

  return result.join(" ");
};

const Marble = ({ value, classes }) => (
  <div className={marbleClasses(classes, value)}>{value.value}</div>
);

const HiddenMarble = ({ classes }) => <div className={classes.hiddenMarble} />;

export default {
  HiddenMarble: withStyles(styles)(HiddenMarble),
  Marble: withStyles(styles)(Marble)
};
