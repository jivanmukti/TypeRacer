import React, { Component } from 'react'
import { render } from 'react-dom'
import StatusBar from '../components/StatusBar.jsx'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stage: 'Waiting for Players',
      numPlayers: 0,
    }
  }
  render() {
    return (
      <div className="Nav">
        <h3 className="greeting">Hello!</h3>
        <StatusBar stage={this.state.stage} numPlayers={this.state.numPlayers} />
      </div>
    )
  }
}

export default Nav
