import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Question from './components/Question';
import Answer from './components/Answer';
import UserName1 from './components/UserName/UserName1';
import UserName2 from './components/UserName/UserName2';
import Row1 from './components/Row/Row1';
import Row2 from './components/Row/Row2';
import RaisedButton from 'material-ui/RaisedButton';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: {},
      seconds: 10
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  // export const fetchUser = () => async dispatch => {
  //   const res = await axios.get('/api/current_user');
  //   dispatch({ type: FETCH_USER, payload: res.data });
  //   //res.data contains the googleID and id
  // };

  componentWillMount() {
    axios.get(`/question`).then(res => {
      const persons = res.data;
      console.log('RES!!! ', persons);

      this.setState({ persons });
    });
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }

  answers() {
    let array = [];

    for (let i = 0; i < 4; i++) {
      array.push(
        <RaisedButton key={i} className="Button" label="Answer 1" fullWidth={true} />
      );
    }
    return array;
  }

  render() {
    return (
      <div className="parent">
        <div className="timer">
          <button onClick={this.startTimer}>Start</button>
          {this.state.time.s}
        </div>

        <div className="users">
          <Row1 />
          <Row2 />
        </div>

        <div className="users">
          <UserName1 />
          <UserName2 />
        </div>
        <Question />
        {this.answers()}
      </div>
    );
  }
}

export default App;
