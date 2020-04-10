const { Lexer } = require('../lexer/lexer');
const { Binary , Unary , Literal , Group } = require('./expressions');

class Binary {
  constructor(leftNode, operator, rightNode) {
    this.leftNode = leftNode;
    this.operator = operator;
    this.rightNode = rightNode;
  };
  operate() {
    if (leftNode is Literal && rightNode is literal) {
      //do operation;
    } else {
      parse(leftNode);
      parse(rightNode);
    };
  };
};

class Group {
  constructor(expression) {
    parse(expression);
  };
};

class Unary {

}

class Literal {
  constructor(literal) {
    this.value = Literal.value;
  };
};

const getClosingParen = (expression, index) => {

}

const parse = (expression) => {
  for ( let [index , token] in expression.entries()) {
    if (token.type == "PLUS" || token.type == "MINUS") {
      const result = new Binary( this.tokens.slice(0, index) , this.currentToken.type , this.tokens.slice(index) );
      return result.operate();
    };
  };

  for ( let [index , token] in expression.entries()) {
    if (token.type == "MULTIPLY" || token.type == "DIVIDE" || token.type == "MODULO") {
      return new Binary( this.tokens.slice(0, index) , this.currentToken.type , this.tokens.slice(index) )
    };
  };

  for ( let [index , token] in expression.entries()) {
    if (token.type == "LPAREN") {
      let closingParen = getClosingParen(expression, index);
      return new Group( this.tokens.slice(index, closingParen) )
    };
  };

  if (expression.length == 1 || expression[0][type] == "NUMBER") {
    return new Literal(expression[0]);
  }
};

