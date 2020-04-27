import React , { Component } from 'react';
import AppContext from '../../banner/context/AppContext';
import { Container , Close } from './styles';

import { handleStmt } from './assets/HandleStmt';

class Structure extends Component {
  
  handleClose = () => {
    this.context.showStmt(false);
  };

  render() {
    return (
      this.context.state.showStmt &&
      <Container>
        <Close onClick={this.handleClose}/>
        {
          this.context.state.program.statements.map((stmt, index) => {
            return handleStmt(stmt, index);
          })
        }
      </Container>
    )
  }
}

Structure.contextType = AppContext;

export default Structure;