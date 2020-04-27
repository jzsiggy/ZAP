import React from 'react';
import PrintStmt from './print/PrintStmt';
import WhileStmt from './loop/WhileStmt';
import IfStmt from './conditional/IfStmt';
import DeclarationStmt from './declaration/DeclarationStmt';
import ExprStmt from './expression/ExprStmt';
import FunctionStmt from './function/FunctionStmt';

const getType = (stmt) => stmt.constructor.name;

const handleStmt = (stmt , index) => {
  switch (getType(stmt)) {
    case 'ExprStmt':
      console.log(stmt)
      return <ExprStmt key={index} stmt={stmt}/>
    case 'PrintStmt':
      console.log(stmt)
      return <PrintStmt key={index} stmt={stmt}/>
    case 'IfStmt':
      console.log(stmt)
      return <IfStmt key={index} stmt={stmt}/>
    case 'WhileStmt':
      console.log(stmt)
      return <WhileStmt key={index} stmt={stmt}/>
    case 'DeclarationStmt':
      console.log(stmt)
      return <DeclarationStmt key={index} stmt={stmt}/>
    case 'FunctionStmt':
      console.log(stmt)
      return <FunctionStmt key={index} stmt={stmt}/>
    default:
      return <p>WHAT!?!?!</p>
  }
};

export {
  handleStmt,
};