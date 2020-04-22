import React, { Component } from 'react';
import { BannerContainer , CodeContainer } from './styles';
import Editor from '../Editor/Editor';
import Terminal from '../Terminal/Terminal';
import Logo from '../Logo/Logo';
import Footer from '../Footer/Footer';

class Banner extends Component {
  render () {
    return (
      <BannerContainer>
        <Logo />
        <CodeContainer>
          <Editor />
          <Terminal />
        </CodeContainer>
        <Footer />
      </BannerContainer>
    );
  };
};

export default Banner;