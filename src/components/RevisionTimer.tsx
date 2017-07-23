import * as React from "react";
import { TaskList } from "./TaskList";

export interface RevisionTimerProps {
  workSeconds: number;
  breakSeconds: number;
}

export interface RevisionTimerState {
  secondsRemaining: number;
  break: boolean;
  paused: boolean;
}

export class RevisionTimer extends React.Component<RevisionTimerProps, RevisionTimerState> {

  private intervalId: number;

  constructor(props: RevisionTimerProps) {
    super(props);
    this.state = {secondsRemaining: this.props.workSeconds, break: false, paused: true};
  }

  private formatTime(secondsRemaining: number): string {
    let minutes = Math.floor(secondsRemaining / 60);
    let seconds = secondsRemaining % 60;

    return ("0" + String(minutes)).slice(-2) + ":" + ("0" + String(seconds)).slice(-2);
  }

  private tick() {
    if(!this.state.paused) {
      this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    }

    if(this.state.secondsRemaining < 0) { 
      if(this.state.break) {
        this.setState({secondsRemaining: this.props.workSeconds, break: false});
      } else {
        this.setState({secondsRemaining: this.props.breakSeconds, break: true});
       }
      
    }
  }

  componentDidMount() {
    this.intervalId = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  render() {
    return(
      <div>
        <h1>Morwenna's Revision Nerve Centre</h1>
        <p>I'm a timer!</p>
        <h2>{this.formatTime(this.state.secondsRemaining)}</h2>
        <button onClick={() => this.setState({paused: !this.state.paused})}>{this.state.paused ? "Start" : "Pause"}</button>

        <TaskList break={this.state.break}/>
      </div>
    );
  }
}