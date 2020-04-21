import React, { Component } from 'react';
import { BannerContainer } from './styles';
import Editor from '../Editor/Editor';
import Terminal from '../Terminal/Terminal';

class Banner extends Component {
  render () {
    return (
      <BannerContainer>
        <Editor />
        <Terminal />
      </BannerContainer>
    );
  };
};

export default Banner;