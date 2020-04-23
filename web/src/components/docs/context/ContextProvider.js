import React , { Component } from 'react';
import DocContext from './DocContext';

class DocContextProvider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      step: 'expressions',
    };
  };

  setStep = (step) => {
    this.setState({
      step,
    });
  };

  render () {
    const contextValues = {
      state: this.state,
      setStep: this.setStep,
    };
    
    return (
      <DocContext.Provider value={contextValues}>
        {this.props.children}
      </DocContext.Provider>
    );
  };
};

export default DocContextProvider;