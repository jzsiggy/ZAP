import React , { Component } from 'react';
import { TextField , Title , Description } from './styles';

class Doc extends Component {
  render() {
    return(
      <TextField>
        <Title>Expressions</Title>
        <Description>
          Expression Statements are at the root of the ZAP interpreter. 
          These statements are defined by arithmetic or logical expressions 
          not followed or trailed by ZAP keywords. The value of these statements 
          are calculated by the Evaluator class.
          The supported operators are: 
          <br/><br/> 
          '+', '-', '*', '/', '%', '>', '&lt;', '&gt;=', '&lt;=', '==' & '!='
          <br/><br/>
          The order of execution follows 'PEMDAS'.
        </Description>
      </TextField>
    )
  };
};

export default Doc;