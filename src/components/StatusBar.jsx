import React, { Component } from 'react'
import { render } from 'react-dom'
import ReactCountdownClock from 'react-countdown-clock'

class StatusBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let status;
    switch(this.props.stage) {
      case 'Waiting':
        status = 'Waiting for ' + (3 - this.props.numPlayers) + ' Players';
        break;
      case 'Countdown':
        status = <ReactCountdownClock seconds={10} color="#000" alpha={0.9} size={300} onComplete={this.props.endCountdown} />
        break;
      case 'Race':
        status = 'Go!';
        break;
      case 'Finish':
        status = 'Finished!'
        break;
      default:
        status = 'Error'
    }
    return (
      <h3>&nbsp;{status}</h3>
    )
  }
}

export default StatusBar;