import React , { Component } from 'react';
import { Container , Dot , DotContainer , TextField } from './styles';

class Terminal extends Component {
  render() {
    return (
      <Container>
        <DotContainer>
          <Dot left='10px' color='rgb(256, 93, 91)' />
          <Dot left='17px' color='rgb(254, 188, 64)' />
          <Dot left='24px' color='rgb(51, 199, 72)' />
        </DotContainer>
        <TextField>
          hey
        </TextField>
      </Container>
    )
  };
};

export default Terminal;