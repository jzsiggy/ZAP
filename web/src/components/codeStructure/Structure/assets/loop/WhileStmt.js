import React , { Component } from 'react';

class WhileStmt extends Component {
  render() {
    return (
      <>
        <h1>While Statment</h1>
        <p>{this.props.stmt.value}</p>
      </>
    )
  };
};

export default WhileStmt;