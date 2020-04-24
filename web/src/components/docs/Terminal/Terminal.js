import React , { Component } from 'react';
import { Container , Dot , DotContainer , TextField } from './styles';

class Terminal extends Component {

  getDate() {
    const monthNames = [
      "Jan", "Feb", "Marc", "Apr", "May", "June",
      "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];

    const weekDays = [
      "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"
    ];

    const d = new Date();
    const weekDay = weekDays[d.getDay()];
    const day = d.getDate()
    const month = monthNames[d.getMonth()];
    const hour = d.getHours();
    const minute = d.getMinutes();
    const sec = d.getSeconds();
    return (`${weekDay} ${month} ${day} ${hour}:${minute}:${sec}`)
  }

  getError = () => {

  };

  render() {
    return (
      <Container>
        <DotContainer>
          <Dot left='10px' color='rgb(256, 93, 91)' />
          <Dot left='17px' color='rgb(254, 188, 64)' />
          <Dot left='24px' color='rgb(51, 199, 72)' />
        </DotContainer>
        <TextField>
          <span>Last login: {this.getDate()} on ttys002</span>
          <br/>
          <br/>
          {this.props.text}
        </TextField>
      </Container>
    )
  };
};

export default Terminal;