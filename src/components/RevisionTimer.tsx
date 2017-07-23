import * as React from "react";
import { TaskList } from "./TaskList";
import { CountDownTimer } from "./CountDownTimer"

export class RevisionTimer extends React.Component<undefined, undefined> {
  render() {
    return(
      <div>
        <h1>Morwenna's Revision Nerve Centre</h1>
        <CountDownTimer longInterval={10} shortInterval={4} breakInterval={3}/>
        <TaskList />
      </div>
    );
  }
}