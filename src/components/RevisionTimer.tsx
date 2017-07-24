import * as React from "react";
import { TaskList } from "./TaskList";

declare var require:(moduleId:string) => any;
var ReactHowler = require("react-howler");


export interface RevisionTimerProps {
  workSeconds: number;
  breakSeconds: number;
}

export interface RevisionTimerState {
  secondsRemaining: number;
  break: boolean;
  paused: boolean;
  shouldPlaySound: boolean;
}

export class RevisionTimer extends React.Component<RevisionTimerProps, RevisionTimerState> {

  private intervalId: number;

  constructor(props: RevisionTimerProps) {
    super(props);
    this.state = {secondsRemaining: this.props.workSeconds, break: false, paused: true, shouldPlaySound: false};
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
        this.setState({secondsRemaining: this.props.workSeconds, break: false, shouldPlaySound: true});
      } else {
        this.setState({secondsRemaining: this.props.breakSeconds, break: true, shouldPlaySound: true});
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
      <div className="container">
        <div className="row justify-content-center mb-2">
          <div className="col text-center">
            <h1 className="display-2">{this.formatTime(this.state.secondsRemaining)}</h1>
            <button type="button"
                className={this.state.paused ? "btn btn-success" : "btn btn-secondary"}
                onClick={() => this.setState({paused: !this.state.paused})}>{this.state.paused ? "Start" : "Pause"}</button>
          </div>
        </div>

        <TaskList break={this.state.break}/>
        {this.state.shouldPlaySound ?
        <ReactHowler src='./zen_temple_bell.mp3' onEnd={() => this.setState({shouldPlaySound: false})}/>
        : null}
      </div>
    );
  }
}