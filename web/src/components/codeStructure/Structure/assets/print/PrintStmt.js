import React , { Component } from 'react';

class PrintStmt extends Component {
  render() {
    return (
      <>
        <h1>Print Statment</h1>
        <p>{this.props.stmt.value}</p>
      </>
    )
  };
};

export default PrintStmt;