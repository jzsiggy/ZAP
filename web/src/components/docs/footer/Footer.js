import { FooterText, FooterContainer } from './styles';
import React , { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <>
        <FooterContainer>
          <FooterText>Made with &hearts; by <a href='https://github.com/jzsiggy/'>jzsiggy</a></FooterText>
        </FooterContainer>
      </>
    )
  }
}

export default Footer;