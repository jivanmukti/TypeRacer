import React, { Component } from 'react';

export default class ScoreBoardComponent extends Component{
  constructor(props){
    super(props);
  }

  render(){
    let display = [];
    let data = [];
    if(this.props.data) {
      let arr = Object.entries(this.props.data);
      if(arr && arr.length > 0) display = arr;
      data = display.map(player => {
        return Number.parseFloat((player[1].string.length / this.props.text.length) * 100).toPrecision(2);
      })
    }
    data.forEach((percentage, i) => {
      if (percentage >= 100 && this.props.lockGame === false) this.props.finishGame(i);
    })
    return (
      <div>{display.map(player => 
        <div>Player: {parseInt(player[0]) + 1} - Input: {Number.parseFloat((player[1].string.length / this.props.text.length) * 100).toPrecision(2)}%
        </div>)}
      </div>
    )
  }
}
