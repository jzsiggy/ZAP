import React , { Component } from 'react';

class DeclarationStmt extends Component {
  render() {
    return (
      <>
        <h1>Declaration Statment</h1>
        <p>{this.props.stmt.value}</p>
      </>
    )
  };
};

export default DeclarationStmt;