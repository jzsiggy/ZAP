import React , { Component } from 'react';

class ExprStmt extends Component {
  render() {
    return (
      <>
        <h1>Expression Statment</h1>
        <p>{this.props.stmt.value}</p>
      </>
    )
  };
};

export default ExprStmt;