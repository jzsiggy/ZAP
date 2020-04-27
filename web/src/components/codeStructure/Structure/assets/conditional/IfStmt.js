import React , { Component } from 'react';

class IfStmt extends Component {
  render() {
    return (
      <>
        <h1>If Statment</h1>
        <p>{this.props.stmt.value}</p>
      </>
    )
  };
};

export default IfStmt;