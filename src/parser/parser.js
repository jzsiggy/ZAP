const { Lexer } = require('../lexer/lexer');

class Binary {
  constructor(leftNode, operator, rightNode) {
    this.leftNodeParser = new Parser(leftNode);
    this.rightNodeParser = new Parser(rightNode);

    this.leftNode = this.leftNodeParser.parse();
    this.rightNode = this.rightNodeParser.parse();
    
    this.operator = operator.type;
    this.value = this.operate();
  };

  operate() {
    if (this.operator == 'PLUS') {
      return parseFloat(this.leftNode.value) + parseFloat(this.rightNode.value);
    };
    if (this.operator == 'MINUS') {
      return parseFloat(this.leftNode.value) - parseFloat(this.rightNode.value);
    };
    if (this.operator == 'MULTIPLY') {
      return this.leftNode.value * this.rightNode.value;
    };
    if (this.operator == 'DIVIDE') {
      return this.leftNode.value / this.rightNode.value;
    };
    if (this.operator == 'EQUALTO') {
      return this.leftNode.value == this.rightNode.value;
    };
    if (this.operator == 'NOTEQUAL') {
      return this.leftNode.value != this.rightNode.value;
    };
    if (this.operator == 'GREATERTHAN') {
      return this.leftNode.value > this.rightNode.value;
    };
    if (this.operator == 'LESSTHAN') {
      return this.leftNode.value < this.rightNode.value;
    };
  }
};

class Unary {
  constructor(operator , expression) {
    this.parser = new Parser(expression);
    this.operator = operator;
    this.expression = expression;
    this.value = this.operate();
  }
  operate() {
    if (this.operator.type == "MINUS") {  
      return ( - ( parseFloat( this.parser.parse().value ) ) );
    };
    if (this.operator.type == "PLUS") {
      return parseFloat((this.parser.parse().value));
    }
  };
}

class Literal {
  constructor(token) {
    this.value = parseFloat(token.value);
  };
};

class Group {
  constructor(expression) {
    this.parser = new Parser(expression);
    this.value = this.parser.parse().value;
  };
};

/*
                 ::::{[{[ --> THE PARSING LOGIC <-- ]}]}::::

        The logic behind the parser is to create a tree of operations.
      It starts by iterating through the Whole raw expression (token list),
                            from right to left,
              trying to find the operators of lowest precedence 
                    (the ones that will be executed last).
              As soon as it finds an operator of type "+" or "-",
                 it becomes the first expression in the tree.
       The expressions can be of 4 types: Binary, Unary, Group or Literal.

              The Parser will iterate through the raw Expression,
                  Always trying break down bigger expressions
             into smaller ones until it works with only Primaries.

                             THE EXPRESSION TYPES

          Binary Expressions :
            --> Have a left and right sub-expression, along with an operator.
            --> The expression's value is calculated by
                joining the values of the left and right 
                sub-expressions through the operator.
            --> EXAMPLES:
      
          1.     "PLUS"                    2.        "MULTPLY"                                            
                   /\                                    /\                            
                  /  \                                  /  \                           
                 5    6                               5+6  7-3                    
                                                                                  
           Calculated Value: 11                  Calculated Value: 44                                                                 
                         
            --> {{ RECURSION ALERT }}
                Notice how in Example 2,
                the sub-expressions are also of type "Binary Expression"   



          Unary Expressions :
            --> Have a sub-expression, along with a unary operator ("!" or "-").
            --> The expression's value is calculated by
                joining the value of the sub-expression with the operator.
            --> EXAMPLES:
      
          1.     "PLUS"                    2.        "MINUS"                                            
                    |                                   |                           
                    5                                   9                     
                                                                
                                                                                  
           Calculated Value: 5                  Calculated Value: -9                                                                 
                          


          Group Expressions :
            --> Are the ones in between parenthesis.
            --> The expression's value is calculated by parsing
                the expression in between parenthesis.
            --> Examples:
          
          1.    "(2 + 3)"                                                             
                    |
                    V                                                         
                   2+3    
                    |
                    V
                  "PLUS"                                           
                    /\                                            
                   /  \
                  2    3
                   
           Calculated Value: 5                   
                
                     
           
          Primary Expressions :
            --> Are the ones that represent a Literal (String, Int, Float, etc.).
            --> The expression's value is the Literal it holds.
            --> Examples:
          
          1.      "245"                                                             
                    
           Calculated Value: 245                              


                            {[{[ --> EXAMPLE <--]}]}
                                                                                                                                                                                  
                    (3 + 5) - 8 * (4 - (8 / 2) - 7) + 4 * (9)                                                                                                                                                    
                                                    |                                                                                                                              
                                                  "PLUS"                                                                                                                                           
                                                    /\                                                                                                                                         
                                                   /  \                                                                                                                                        
                     (3 + 5) - 8 * (4 - (8 / 2) - 7)   4 * (9)                                                                                                                                                                 
                             |                           |                                    
                          "MINUS"                      "MULT"                                                                                                                                  
                            /\                           /\                                                                                                                                                                                       
                           /  \                         4   (9)                                                                                                                                                       
                          /    \                             |                                                                    
                  (3 + 5)      8 * (4 - (8 / 2) - 7)         9                                                                                       
                /                |                                                                                                          
          GROUP(3+5)         "MULTIPLY"                                                                                                      
              |                  /\                                                                                         
            3 + 5               /  \                                                                     
              |                8    (4 - (8 / 2) - 7)                                                         
            "PLUS"                          |                             
              /\                     4 - (8 / 2) - 7                                                     
             /  \                                |                                         
            3    5                            "MINUS"                                 
                                                 /\                             
                                                /  \                              
                                    4 - (8 / 2)      7                         
                                      |                                        
                                   "MINUS"                                          
                                      /\                                                                        
                                     /  \                                                                                                        
                                    4    (8 / 2)                                                                    
                                            |                                                                
                                          8 / 2                                                                  
                                            |                                                                
                                         "DIVIDE"                                                                   
                                            /\                                                                
                                           /  \        
                                          8    2
                                           

*/

class Parser {
  constructor(tokens) {
    this.rawExpression = tokens;
    this.index = this.rawExpression.length - 1;
    this.previousToken = this.rawExpression[this.index - 1];
    this.currentToken = this.rawExpression[this.index];
    this.nextToken = null;
    this.openingParen = 0;
    this.closingParen = 0;

    this.checkParenthese();
  };

  reset() {
    this.index = 0;
    this.previousToken = null;
    this.currentToken = this.rawExpression[this.index];
    this.nextToken = this.rawExpression[this.index+1];
    this.openingParen = 0;
    this.closingParen = 0;

    this.checkParenthese();
  };

  resetToEnd() {
    this.index = this.rawExpression.length - 1;
    this.previousToken = this.rawExpression[this.index - 1];
    this.currentToken = this.rawExpression[this.index];
    this.nextToken = null;
    this.openingParen = 0;
    this.closingParen = 0;

    this.checkParenthese();
  };

  next() {
    this.index++;
    this.previousToken = this.rawExpression[this.index-1];
    this.currentToken = this.rawExpression[this.index];
    this.nextToken = this.rawExpression[this.index+1];
    
    this.checkParenthese();
  };

  prev() {
    this.index--;
    this.previousToken = this.rawExpression[this.index-1];
    this.currentToken = this.rawExpression[this.index];
    this.nextToken = this.rawExpression[this.index+1];
    
    this.checkParenthese();
  };

  checkParenthese() {
    if (this.currentToken) {
      if (this.currentToken.type == "LPAREN") {
        this.openingParen++;
      };
      if (this.currentToken.type == "RPAREN") {
        this.closingParen++;
      };
    };
  };

  isInGroup() {
    return (this.openingParen != this.closingParen);
  }

  isOperator(token) {
    let operators = ["MULTIPLY", "DIVIDE", "PLUS", "MINUS", "MODULO", "GREATERTHAN", "LESSTHAN", "EQUALTO"];
    return (operators.includes(token.type) );
  };

  isPrimary(type) {
    let operators = ["STRING", "NUMBER"];
    return (operators.includes(type) );
  };

  handleBinary() {
    console.log('isBinary')
    let node = new Binary(
      this.rawExpression.slice(0, this.index),
      this.currentToken,
      this.rawExpression.slice(this.index+1)
    )
    return node;
  }

  handleUnary() {
    console.log('isUnary')
    let node = new Unary(
      this.currentToken,
      this.rawExpression.slice(this.index+1)
    );
    return node;
  };

  handleOpenParen() {
    console.log('isGroup')
    let group = []
    while (this.isInGroup()) {
      group.push(this.currentToken);
      this.next();
    };
    let node = new Group(group);
    return node;
  };

  handlePrimary() {
    console.log('isPrimary')
    let node = new Literal(this.currentToken);
    return node;
  };

  parse() {
    console.log('expression to parse');
    console.log(this.rawExpression);

    /*
      Parsing the expressions with lowest precedence ("+" & "-").
      We iterate through the rawExpression from right to left due to the association rule of these operators.

      The order of precedence is as follows
      --> EQUALITY
      --> COMPARISSON
      --> ADDITION - SUBTRACTION
      --> MULTIPLICATION - DIVISION
      --> UNARY
      --> GROUP
      --> PRIMARY
    */

    while (this.index >= 0) {
      if (this.currentToken.type == "EQUALTO") {
        if (!this.isInGroup()) {
          return this.handleBinary();
        };
      };
      this.prev();
    };
    this.resetToEnd();

    while (this.index >= 0) {
      if (this.currentToken.type == "GREATERTHAN" || this.currentToken.type == "LESSTHAN") {
        if (!this.isInGroup()) {
          return this.handleBinary();
        };
      };
      this.prev();
    };
    this.resetToEnd();

    while (this.index >= 0) {
      if (this.currentToken.type == "PLUS" || this.currentToken.type == "MINUS") {
        if (!this.isInGroup()) {
          if (this.previousToken) {
            if (!this.isOperator(this.previousToken)) {
              return this.handleBinary();
            };
          };
        };
      };
      this.prev();
    };
    this.resetToEnd();

    while (this.index >= 0) {
      if (this.currentToken.type == "MULTIPLY" || this.currentToken.type == "DIVIDE" || this.currentToken.type == "MODULO") {
        if (!this.isInGroup()) {
          return this.handleBinary();
        };
      };
      this.prev();
    };
    this.reset();

    while (this.currentToken) {
      if (!this.isInGroup()) {
        if (this.currentToken.type == "MINUS" || this.currentToken.type == "NOT") {
          return this.handleUnary();
        };
      };
      this.next();
    };
    this.reset();

    while (this.currentToken) {
      if (this.currentToken.type == "LPAREN") {
        this.next();
        return this.handleOpenParen();
      };
      this.next();
    };
    this.reset();

    while (this.currentToken) {
      if (this.currentToken.type == "NUMBER" || this.currentToken.type == "STRING") {
        return this.handlePrimary();
      };
      this.next();
    };
    this.reset();
  };
};

console.time('parsing')

const lexer = new Lexer(' -- (9)');
const parser = new Parser(lexer.tokens);
result = parser.parse();
console.log(result.value);

console.timeEnd('parsing')