import React , { Component } from 'react';
import { FooterContainer , DownArrow } from './styles';

class Footer extends Component {
  render() {
    return (
      <FooterContainer>
        <span>Read the Docs</span>
        <DownArrow />
      </FooterContainer>
    );
  };
};

export default Footer;