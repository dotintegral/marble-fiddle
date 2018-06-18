import React, { Component } from "react";
import * as fx from "../../fxjs";
import * as fxop from "../../fxjs/operators";

fx.of(1, 2, 3)
  .pipe(
    fxop.map(x => x + 1),
    fxop.map(x => x * 2)
  )
  .subscribe(x => console.log(x));

class App extends Component {
  render() {
    return <div className="App">Test</div>;
  }
}

export default App;
