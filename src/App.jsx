import React, { Component } from 'react';
import { render } from 'react-dom'
import StartContainer from './containers/StartContainer.jsx'
import RaceContainer from './containers/RaceContainer.jsx'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRace: false
    }
    this.enableRace = this.enableRace.bind(this);
  }
  
  enableRace() {
    this.setState({showRace: true});
  }

  render () {
    return (
      <div>
        <StartContainer enableRace={this.enableRace} />
        <RaceContainer enable={this.state.showRace} />
      </div>
    )
  }
}