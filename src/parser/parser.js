const { Lexer } = require('../lexer/lexer');

class Binary {
  constructor(leftNode, operator, rightNode) {
    this.leftNode = parse(leftNode);
    this.operator = operator;
    this.rightNode = parse(rightNode);
  };
  operate() {
    if (this.leftNode instanceof Literal && this.rightNode instanceof Literal) {
      console.log('doing operation' + this.leftNode.value + this.operator.type + this.rightNode.value); 
    };
  };
};

class Literal {
  constructor(value) {
    this.value = value;
  };
};

class Group {
  constructor(expression) {
    this.value = parse(expression);
  };
};


const getClosingParen = (expression, index) => {
  let openingParen = 1;
  let closingParen = 0;
  while (index < expression.length) {
    if (expression[index]['type'] == "LPAREN") {
      openingParen++;
    };
    if (expression[index]['type'] == "RPAREN") {
      closingParen++;
    };
    if (openingParen == closingParen) {
      return index;
    };
    index++;
  };
}

const parse = (expression) => {
  console.log("expression to be parsed");
  console.log(expression)


  if (expression[0]['type'] == "LPAREN") {
    console.log("ISPAREN")
    let closingParen = getClosingParen(expression , 1);
    let node = new Group( expression.slice(1, closingParen) );
    console.log(node);
    return node;
  };


  for ( let [index , token] of expression.entries()) {
    if (token.type == "PLUS" || token.type == "MINUS") {
      let node = new Binary( expression.slice(0, index) , token.type , expression.slice(index+1) );
      console.log(node);
      return node;
    };
  };

  for ( let [index , token] of expression.entries()) {
    if (token.type == "MULTIPLY" || token.type == "DIVIDE" || token.type == "MODULO") {
      let node = new Binary( expression.slice(0, index) , token.type , expression.slice(index+1) );
      console.log(node);
      return node;    };
  };

  if (expression.length == 1 && expression[0]['type'] == "NUMBER") {
    console.log('making literal' + ' ' + expression[0]['value'])
    return new Literal(expression[0]['value']);
  };
};


const lexer = new Lexer(' 1 / 5 + (6 * ( 8 / 2) + 3)');
parse(lexer.tokens);