import React , { Component } from 'react';
import AppContext from './AppContext';

import { Zap } from 'jzap';

class ContextProvider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      'value': '',
    };
  };

  setValue = (value) => {
    this.setState({
      value,
    });
  };

  execute = () => {
    // console.log('executing')
    new Zap(this.state.value);
  };

  render () {
    const contextValues = {
      state: this.state,
      setValue: this.setValue,
      execute: this.execute,
    };
    
    return (
      <AppContext.Provider value={contextValues}>
        {this.props.children}
      </AppContext.Provider>
    );
  };
};

export default ContextProvider;