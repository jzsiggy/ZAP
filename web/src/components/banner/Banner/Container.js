import React, { Component } from 'react';
import { BannerContainer , CodeContainer, GithubMark } from './styles';
import Editor from '../Editor/Editor';
import Terminal from '../Terminal/Terminal';
import Logo from '../Logo/Logo';
import Footer from '../Footer/Footer';

class Banner extends Component {
  render () {
    const gradientList = [
      '(to right, #ff5f6d, #ffc371)',
      '(to right, #ffafbd, #ffc3a0)',
      '(to right, #2193b0, #6dd5ed)',
      '(to right, #ee9ca7, #ffdde1)',
      '(to right, #ee9ca7, #ffdde1)',
      '(to right, #06beb6, #48b1bf)',
      '(to right, #eb3349, #f45c43)',
      '(to right, #dd5e89, #f7bb97)',
      '(to right, #56ab2f, #a8e063)',
      '(to right, #614385, #516395)',
      '(to right, #eecda3, #ef629f)',

    ]
    return (
      <BannerContainer
      gradient={gradientList[Math.floor(Math.random() * gradientList.length)]}
      >
        <Logo />
        <GithubMark 
          href='https://github.com/jzsiggy/ZAP'
        />
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