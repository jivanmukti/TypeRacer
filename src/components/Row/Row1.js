import React, { Component } from 'react';
import Circle from '../Circle';

class Row1 extends Component {

    renderCircles() {
        let row = [];
        for (let i = 0; i < 5; i++) {
            row.push(<Circle key={i}/>);
        }
        return row;
    }

    render() {
        return (
            <div className="row1">
                {this.renderCircles()}
            </div>
        );
    }
}


export default Row1;