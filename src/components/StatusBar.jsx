import React, { Component } from 'react'
import { render } from 'react-dom'

class StatusBar extends Component {
  constructor(props) {
    super(props);
    this.message = this.message.bind(this);
  }

  message() {
    switch(this.props.stage) {
      case 'waiting':
        this.message = 'Waiting for Players...';
        break;
      case 'countdown':
        this.message = 'Counting down';
        break;
      case 'race':
        this.message = 'Go!';
        break;
      case 'finish':
        this.message = 'Finished!'
        break;
      default:
    }
  }
  
  render() {
    return (
      <h3>{this.message()}</h3>
    )
  }
}

export default StatusBar;