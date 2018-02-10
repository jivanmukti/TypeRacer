import React, { Component } from 'react';
import Circle from '../Circle';

class Row2 extends Component {

    renderCircles() {
        let row = [];

        for (let i = 0; i < 5; i++) {
            row.push(<Circle />);
        }
        return row;
    }

    render() {

        return (
            <div className="row2">
                {this.renderCircles()}
            </div>
        )
    }
}


export default Row2;