import React , { Component } from 'react';
import AppContext from './AppContext';

import { Zap } from 'jzap';

class ContextProvider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      'value': `@a = 0;

while (a < 100) {
  @b = 2;
  @notprime = 0;
  while (b < (a / 2)) {
    if (!(a % b == 0)) {
      b = b+1;
    } else {
      b = a;
      notprime = 1;
    };
  };
  if (!notprime) {
    show a;
    show 'is prime';
  };
  a = a + 1;
};
`,
      'result': [],
    };
  };

  setValue = (value) => {
    this.setState({
      value,
    });
  };

  execute = () => {
    const program = new Zap(this.state.value);
    const logs = program.interpreter.parser.log.values;
    this.setState({
      result : logs
    });
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