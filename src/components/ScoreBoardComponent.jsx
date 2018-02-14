import React, { Component } from 'react';


export default class ScoreBoardComponent extends Component{
  constructor(props){
    super(props)
  }

  render(){
    let display = []
    if(this.props.data){
      let arr = Object.entries(this.props.data)
      if(arr && arr.length > 0){
        display = arr
      }
    }

    return (
      <div>
        {
          display.map(player => {
            return <div>Player:{player[0]} - Input:{Number.parseFloat((player[1].string.length/this.props.text.length)*100).toPrecision(4)}%</div>
          })
        }
      </div>
    )
  }
}
