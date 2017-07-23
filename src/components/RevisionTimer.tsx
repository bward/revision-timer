import * as React from "react";
import { TaskList } from "./TaskList";

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class RevisionTimer extends React.Component<undefined, undefined> {
  render() {
    return(
      <div>
        <h1>Morwenna's Revision Nerve Centre</h1>
        <p>What's up</p>
        <TaskList />
      </div>
    );
  }
}