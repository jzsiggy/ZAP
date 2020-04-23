import React from 'react';

const data = {
  expressions : {
    title: `Expressions`,

    description: <>Expression Statements are at the root of the ZAP interpreter. 
    These statements are defined by arithmetic or logical expressions 
    not followed or trailed by ZAP keywords. The value of these statements 
    are calculated by the Evaluator class.
    The supported operators are: 
    <br/><br/> 
    '+', '-', '*', '/', '%', '>', '&lt;', '&gt;=', '&lt;=', '==' & '!='
    <br/><br/>
    The order of execution follows 'PEMDAS'.</>,

    terminal: `1 + 2 / (3 - 4) * 5 % 6 != 8`,
  },

  declarations : {
    title: `Declarations`,

    description: <>
    
    </>,

    terminal: `@variable = 'I am a string'`,
  },

  conditionals : {
    title: `Conditionals`,

    description: <>
    
    </>,
    
    terminal: ``,
  },

  loops : {
    title: `Loops`,

    description: <>
    
    </>,
    
    terminal: ``,
  },

  functions : {
    title: `Functions`,

    description: <>
    
    </>,
    
    terminal: ``,
  },
};

export default data;