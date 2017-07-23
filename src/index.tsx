import * as React from "react";
import * as ReactDOM from "react-dom";

import { RevisionTimer } from "./components/RevisionTimer";

ReactDOM.render(
  <RevisionTimer workSeconds={1500} breakSeconds={300}/>,
  document.getElementById("root")
);