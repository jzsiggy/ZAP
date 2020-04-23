import React , { Component } from 'react';
import { Container , Dot } from './styles';

class Navigation extends Component {
  render() {
    return(
      <Container>
        <Dot
          size={'10px'}
          isFilled={true}
        />
        <Dot
          size={'13px'}
        />
        <Dot
          size={'18px'}
        />
        <Dot
          size={'13px'}
        />
        <Dot
          size={'10px'}
        />
      </Container>
    )
  };
};

export default Navigation;