const { Lexer } = require('../lexer/lexer');

class Binary {
  constructor(leftNode, operator, rightNode) {
    this.leftNode = parse(leftNode);
    this.operator = operator;
    this.rightNode = parse(rightNode);
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
    if (this.operator == 'MODULO') {
      return this.leftNode.value % this.rightNode.value;
    };
  }
};

class Literal {
  constructor(value) {
    this.value = parseFloat(value);
  };
};

class Group {
  constructor(expression) {
    this.value = parse(expression).value;
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

  let openingParen = 0;
  let closingParen = 0;

  let isInGroup = () => openingParen != closingParen;
  
  
  for ( let [index , token] of expression.entries()) {
    if (token.type == "LPAREN") {
      openingParen++;
    };
    if (token.type == "RPAREN") {
      closingParen++;
    }
    if ((token.type == "PLUS" || token.type == "MINUS") && !isInGroup()) {
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
    
    for ( let [index , token] of expression.entries()) {
      if (token.type == "LPAREN") {
        console.log("ISPAREN")
        let closingParen = getClosingParen(expression , index+1);
        let node = new Group( expression.slice(index+1, closingParen) );
        console.log(node);
        return node;
      }
    };

  if (expression.length == 1 && expression[0]['type'] == "NUMBER") {
    let node = new Literal(expression[0]['value']);
    console.log(node);
    return node;
  };
};


const lexer = new Lexer(' 4 * (3 + 2) * 45 + 4 ');
parse(lexer.tokens);