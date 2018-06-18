import React, { Component } from "react";
import withStyles from 'react-jss';
import * as fx from "../../fxjs";
import * as fxop from "../../fxjs/operators";

import Stream from '../Stream'

import * as styles from './App.jss.js'

fx.of(1, 2, 3)
  .pipe(
    fxop.map(x => x + 1),
    fxop.map(x => x * 2)
  )
  .subscribe(x => console.log(x));

class App extends Component {
  render() {
    return (
      <div className={this.props.classes.app}>
        <Stream streamId={0} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
