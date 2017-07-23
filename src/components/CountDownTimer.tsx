import * as React from "react";

enum TimerMode {
  long,
  short,
  break
}

export interface CountDownTimerProps {
  longInterval: number;
  shortInterval: number;
  breakInterval: number;
}

export interface CountDownTimerState {
  secondsRemaining: number;
  timerMode: TimerMode;
  paused: boolean;
}

export class CountDownTimer extends React.Component<CountDownTimerProps, CountDownTimerState> {

  private intervalId: number;

  constructor(props: CountDownTimerProps) {
    super(props);
    this.state = {secondsRemaining: this.props.longInterval, timerMode: TimerMode.long, paused: true};
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
      switch(this.state.timerMode) {
        case TimerMode.long:
          this.setState({secondsRemaining: this.props.breakInterval, timerMode: TimerMode.break});
          break;
        case TimerMode.break:
          this.setState({secondsRemaining: this.props.shortInterval, timerMode: TimerMode.short});
          break;
        case TimerMode.short:
          this.setState({secondsRemaining: this.props.longInterval, timerMode: TimerMode.long});
          break;
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
        <p>I'm a timer!</p>
        <h2>{this.formatTime(this.state.secondsRemaining)}</h2>
        <button onClick={() => this.setState({paused: !this.state.paused})}>{this.state.paused ? "Start" : "Pause"}</button>
      </div>
    );
  }
}