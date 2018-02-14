import React, { Component } from 'react'
import { render } from 'react-dom'
import openSocket from 'socket.io-client';
import StatusBar from '../components/StatusBar.jsx'

let socket;

// Nav component which controls status bar
class StartContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stage: 'Waiting',
      numPlayers: 0,
      lockGame: false
    }
    this.endCountdown = this.endCountdown.bind(this);
    this.incrementPlayers = this.incrementPlayers.bind(this);
  }

  // Add players to the room
  incrementPlayers(count) {
    this.setState({numPlayers: count});
  }

  // Change state from 'countdown' to 'race'
  endCountdown() {
    this.setState({stage: 'Race'});
  }

  // When the container mounts open the socket
  componentDidMount() {
    socket = openSocket('http://localhost:3000');
    socket.on('join',msg => console.log(msg));
    socket.on('number of players', count => {
      console.log('There are this many players sent via sockets: ', count);
      this.incrementPlayers(count);
    });
  }

  // Check if room gets full and initiate countdown      
  componentDidUpdate(prevProps, prevState) {
    if (this.state.numPlayers === 3 && this.state.lockGame === false) this.setState({stage: 'Countdown', lockGame: true});
  }

  render() {
    return (
      <div className="StartContainer">
        <h3 className="greeting">Hello!</h3>
        <StatusBar stage={this.state.stage} numPlayers={this.state.numPlayers} endCountdown={this.endCountdown} />
      </div>
    )
  }
}

export default StartContainer;

