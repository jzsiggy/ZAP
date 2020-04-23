import React , { Component } from 'react';
import { DocContainer , CodeContainer } from './styles';
import Terminal from '../Terminal/Terminal';
import Doc from '../Doc/Doc';
import Navigation from '../Navigation/Navigation';

import data from '../context/data';

import DocContext from '../context/DocContext';

class Documentation extends Component {
  render() {
    return (
      <DocContainer>
        <Navigation 
        
        />
        <CodeContainer>
          <Doc 
            title={data[this.context.state.step]['title']}
            description={data[this.context.state.step]['description']}
          />
          <Terminal 
            text={data[this.context.state.step]['terminal']}
          />
        </CodeContainer>
      </DocContainer>
    )
  };
};

Documentation.contextType = DocContext;

export default Documentation;