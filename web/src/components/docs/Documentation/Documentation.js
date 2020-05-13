import React , { Component } from 'react';
import { DocContainer , CodeContainer, GithubMark } from './styles';
import Terminal from '../Terminal/Terminal';
import Doc from '../Doc/Doc';
import Navigation from '../Navigation/Navigation';
import Footer from '../footer/Footer';

import data from '../context/data';

import DocContext from '../context/DocContext';

class Documentation extends Component {
  render() {
    return (
      <DocContainer>
        <GithubMark 
          href='https://github.com/jzsiggy/ZAP'
        />
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
        <Footer />
      </DocContainer>
    )
  };
};

Documentation.contextType = DocContext;

export default Documentation;