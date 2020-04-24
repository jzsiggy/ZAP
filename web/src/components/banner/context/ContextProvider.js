import React , { Component } from 'react';
import AppContext from './AppContext';
import { examples } from './examples';

import { Zap } from 'jzap';

class CodeContextProvider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      result: [],
    };
  };

  setValue = (value) => {
    this.setState({
      value,
    });
  };

  setSelection = (selection) => {
    this.setValue(examples[selection]);
  };

  execute = () => {
    const program = new Zap(this.state.value);
    const logs = program.interpreter.parser.log.values;
    console.log(program);

    this.setState({
      result : logs,
    });
  };

  render () {
    const contextValues = {
      state: this.state,
      setValue: this.setValue,
      execute: this.execute,
      setSelection: this.setSelection,
    };
    
    return (
      <AppContext.Provider value={contextValues}>
        {this.props.children}
      </AppContext.Provider>
    );
  };
};

export default CodeContextProvider;