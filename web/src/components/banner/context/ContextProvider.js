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
      showStmt: false,
      program: null,
    };
  };

  showStmt = (show) => {
    if (show) {
      this.setState({
        showStmt: true,
      })
    } else {
      this.setState({
        showStmt: false,
      });
    };
  };

  setValue = (value) => {
    this.setState({
      value,
    });
  };

  setSelection = (selection) => {
    if (examples[selection]) {
      this.setValue(examples[selection]);
    } else {
      this.setValue('');
    }
  };

  execute = () => {
    const program = new Zap(this.state.value);
    const logs = program.interpreter.parser.log.values;
    
    this.setState({
      result : logs,
      program : program.interpreter,
    });
  };

  render () {
    const contextValues = {
      state: this.state,
      setValue: this.setValue,
      execute: this.execute,
      setSelection: this.setSelection,
      showStmt: this.showStmt,
    };
    
    return (
      <AppContext.Provider value={contextValues}>
        {this.props.children}
      </AppContext.Provider>
    );
  };
};

export default CodeContextProvider;