import React , { Component } from 'react';
import { Pic , Slogan , LogoContainer } from './styles';

class Logo extends Component {
  render() {
    return (
      <LogoContainer>
        <Pic />
        <Slogan>A Javscript Interpreted Language</Slogan>
      </LogoContainer>
    );
  };
};

export default Logo;