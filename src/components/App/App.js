import React, { Component } from "react";
import withStyles from "react-jss";
import * as R from "ramda";
import * as fx from "../../fxjs";
import * as fxop from "../../fxjs/operators";

import * as rxop from "rxjs/operators";

import Stream from "../Stream";

import * as styles from "./App.jss.js";

const allOperators = Object.keys(rxop);
const supportedOperators = Object.keys(fxop);
const toBeImplemented = R.without(supportedOperators)(allOperators);

console.log("Supported:", supportedOperators.length, { supportedOperators });
console.log("To be implemented:", toBeImplemented.length, { toBeImplemented });

class App extends Component {
  constructor() {
    super();

    this.state = {
      streamId: null
    };
  }

  componentDidMount() {
    const s$ = fx.of(1, 2);
    const s1$ = fx.of(1, 2);

    fx.of(1, 2, 3, 4, 5, 6, 7)
      .pipe(
        fxop.merge(s$),
        fxop.concat(s1$),
        fxop.map(x => x + 1),
        fxop.scan((acc, x) => acc + x, 0),
        fxop.filter(x => x % 2 === 0),
        fxop.map(x => x * 2),
        fxop.map(x => "" + x),
        fxop.mapTo("s"),
        fxop.tap(console.log)
      )
      .subscribe(x => console.log(x), null, () => {
        this.setState({ streamId: 2 });
      });
  }

  render() {
    return (
      <div className={this.props.classes.app}>
        <Stream streamId={this.state.streamId} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
