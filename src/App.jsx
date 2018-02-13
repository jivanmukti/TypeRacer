import React, { Component } from 'react';
import { render } from 'react-dom'
import StartContainer from './containers/StartContainer.jsx'

export default class App extends Component {
  render () {
    return (
      <div>
        <StartContainer />
      </div>
    )
  }
}
