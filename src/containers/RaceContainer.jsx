import React, { Component } from 'react';
import openSocket from 'socket.io-client';



let socket;

export default class App extends Component {

  constructor(){
    super()
    this.handleInput = this.handleInput.bind(this)
  }
  
  componentDidMount(){
    socket = openSocket('http://localhost:3000');
    socket.on('join',(msg)=> console.log('msg',msg));
  }

  handleInput(e){
    console.log('here')
    socket.emit('gameMessage',JSON.stringify({
      player:Math.floor(Math.random()*3),
      room:1,
      type:'stringChange',
      body:e.target.value,
    }))
  }

  render () {
    return (
      <div>
        <input type='text' onChange={this.handleInput}/>
      </div>
    )
  }
}
