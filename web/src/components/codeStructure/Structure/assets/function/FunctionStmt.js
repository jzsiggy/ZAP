import React , { Component } from 'react';

class FunctionStmt extends Component {
  render() {
    return (
      <>
        <h1>Function Statment</h1>
        <p>{this.props.stmt.value}</p>
      </>
    )
  };
};

export default FunctionStmt;