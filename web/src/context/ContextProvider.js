import React , { Component } from 'react';

import AppContext from './AppContext';

class ContextProvider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      
    };
  };

  render () {
    const contextValues = {
      
    };
    
    return (
      <AppContext.Provider value={contextValues}>
        {this.props.children}
      </AppContext.Provider>
    );
  };
};

export default ContextProvider;