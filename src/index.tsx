import * as React from "react";
import * as ReactDOM from "react-dom";

import { RevisionTimer } from "./components/RevisionTimer";

ReactDOM.render(
  <RevisionTimer workSeconds={15} breakSeconds={5}/>,
  document.getElementById("root")
);