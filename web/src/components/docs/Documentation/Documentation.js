import React , { Component } from 'react';
import { DocContainer , CodeContainer } from './styles';
import Terminal from '../Terminal/Terminal';
import Doc from '../Doc/Doc';
import Navigation from '../Navigation/Navigation';

class Documentation extends Component {
  render() {
    return (
      <DocContainer>
        <Navigation />
        <CodeContainer>
          <Terminal />
          <Doc />
        </CodeContainer>
      </DocContainer>
    )
  };
};

export default Documentation;