import React, { Component } from "react";
import withStyles from "react-jss";
import * as R from "ramda";
import * as fx from "../../fxjs";
import * as fxop from "../../fxjs/operators";
import { getStreamIdByName } from "../../fxjs/id";

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
    const justAStream$ = fx.of(1);
    const someStream$ = fx.of(1, 2, 3).pipe(
      fxop.concat(justAStream$),
      fxop.map(x => x * x),
      fxop.count()
    );

    const myStream$ = fx.of(1, 2, 3, 4, 5, 6, 7).pipe(
      fxop.concat(someStream$),
      fxop.map(x => x + 1),
      fxop.scan((acc, x) => acc + x, 0),
      fxop.filter(x => x % 2 === 0),
      fxop.map(x => x * 2),
      fxop.map(x => "" + x),
      fxop.mapTo("s")
    );

    fx.name("myStream$", myStream$);
    fx.name("justAStream$", justAStream$);
    fx.name("someStream$", someStream$);

    myStream$.subscribe(() => {}, null, () => {
      this.setState({ streamId: getStreamIdByName("myStream$") });
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
