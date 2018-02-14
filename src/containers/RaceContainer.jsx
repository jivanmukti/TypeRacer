import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import {diffChars} from 'diff';
import ScoreBoard from '../components/ScoreBoardComponent.jsx'



let socket;

export default class RaceContainer extends Component {

  constructor(){
    super()
    this.state = {diff:[],flag:false}
    
    this.handleInput = this.handleInput.bind(this)
    this.diff = this.diff.bind(this)
  }

  componentDidMount(){
    //socket = openSocket('https://immense-tor-65130.herokuapp.com/');
    socket = openSocket();
    socket.on('init',(data) => this.setState(JSON.parse(data)));
    socket.on('game',(data) => {
      this.setState({game:JSON.parse(data)})
    })
  }


  handleInput(e){
    socket.emit('gameMessage',JSON.stringify({
      player:this.state.player,
      room:this.state.room,
      type:'stringChange',
      body:e.target.value,
    }))
    this.setState({user_input:' ' + e.target.value})
    this.diff();
  }

  diff(){
    let user_string = this.state.user_input + this.state.text.substr(this.state.user_input.length )
    var diff = diffChars(this.state.text,user_string )
    this.setState({diff:diff,flag:true})

  }
  
  render () {
    return (
      <div style={{'text-align':'center', 'margin-top':70}}>
        {
          !this.state.flag &&
          <div style={{width:600, display:'inline-block', 'margin-bottom':25}}>
              {
                this.state.text
                }
        </div>
          }
          {
            this.state.flag && 
              <div style={{width:600, height:200,display:'inline-block','margin-bottom':25}}>
                  {
                    this.state.diff.map((obj,i) => {
                      if( !obj.hasOwnProperty('removed') && i !== this.state.diff.length - 1){
                        return <span style={{color:'green'}} >{obj.value}</span>
                      }else if( !obj.hasOwnProperty('removed') && i === this.state.diff.length-1){
                        return <span style={{color:'grey'}}>{obj.value}</span>
                      }else{
                        return <span style={{color:'red'}}>{obj.value}</span>
                      }
                    })
                    }
                </div>
              }
              <br/>
        <input type='text' onChange={this.handleInput}/>
        <br/>
        <br/>
        <br/>
        <br/>
        <b>SCORES</b>
        {
          (this.state.game && this.state.text) &&
            <ScoreBoard data={this.state.game[this.state.room]} text={this.state.text}/>
        }
        
      </div>
    )
  }
}
