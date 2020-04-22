import React , { Component } from 'react';
import { FooterContainer , FooterText , DownArrow } from './styles';

class Footer extends Component {
  render() {
    return (
      <FooterContainer>
        <FooterText>Read the Docs</FooterText>
        <DownArrow />
      </FooterContainer>
    );
  };
};

export default Footer;