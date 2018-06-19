import React, { Component } from "react";
import withStyles from "react-jss";
import * as fx from "../../fxjs";
import * as fxop from "../../fxjs/operators";

import Stream from "../Stream";

import * as styles from "./App.jss.js";

class App extends Component {
  constructor() {
    super();

    this.state = {
      streamId: null
    };
  }

  componentDidMount() {
    fx.of(1, 2, 3, 4)
      .pipe(
        fxop.map(x => x + 1),
        fxop.filter(x => x % 2),
        fxop.map(x => x * 2),
        fxop.map(x => "" + x)
      )
      .subscribe(x => console.log(x), null, () => {
        this.setState({ streamId: 0 });
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
