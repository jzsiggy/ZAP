import React , { Component } from 'react';
import AppContext from '../../banner/context/AppContext';
import { Container , Close } from './styles';

import PrintStmt from './assets/print/PrintStmt';

class Structure extends Component {
  
  handleClose = () => {
    this.context.showStmt(false);
  };

  getType = (stmt) => stmt.constructor.name;

  render() {
    return (
      this.context.state.showStmt &&
      <Container>
        <Close onClick={this.handleClose}/>
        {
          this.context.state.program.statements.map((stmt, index) => {
            console.log(this.getType(stmt))
            switch (this.getType(stmt)) {
              case 'ExprStmt':
                console.log(stmt)
                return <h1 key={index}>expression</h1>
              case 'PrintStmt':
                console.log(stmt)
                return <PrintStmt key={index} stmt={stmt}/>
              case 'IfStmt':
                console.log(stmt)
                return <h1 key={index}>conditional</h1>
              case 'WhileStmt':
                console.log(stmt)
                return <h1 key={index}>loop</h1>
              case 'DeclarationStmt':
                console.log(stmt)
                return <h1 key={index}>declaration</h1>
              case 'FunctionStmt':
                console.log(stmt)
                return <h1 key={index}>function</h1>
              default:
                return <p>WHAT!?!?!</p>
            }
          })
        }
      </Container>
    )
  }
}

Structure.contextType = AppContext;

export default Structure;