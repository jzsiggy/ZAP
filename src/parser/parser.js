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
    if (this.operator == 'MODULO') {
      return this.leftNode.value % this.rightNode.value;
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



class Parser {
  constructor(tokens) {
    this.rawExpression = tokens;
    this.index = this.rawExpression.length - 1;
    this.previousToken = null;
    this.currentToken = this.rawExpression[this.index];
    this.nextToken = this.rawExpression[this.index+1];
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
  }

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

  handleAddition() {
    if (this.previousToken && this.nextToken) {
      console.log('isBinary')
      let node = new Binary(
        this.rawExpression.slice(0, this.index),
        this.currentToken,
        this.rawExpression.slice(this.index+1)
      );
      return node;
    } else
    if (this.nextToken) {
      console.log('isUnary')
      let node = new Unary(
        this.currentToken,
        this.rawExpression.slice(this.index+1),
      );
      return node;
    };
  };

  handleMultiplication() {
    console.log('isBinary')

    let node = new Binary(
      this.rawExpression.slice(0, this.index),
      this.currentToken,
      this.rawExpression.slice(this.index+1)
    )
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

    while (this.index >= 0) {
      if (this.currentToken.type == "PLUS" || this.currentToken.type == "MINUS") {
        if (!this.isInGroup()) {
          return this.handleAddition();
        };
      };
      this.prev();
    };
    this.reset();

    while (this.currentToken) {
      if (this.currentToken.type == "MULTIPLY" || this.currentToken.type == "DIVIDE" || this.currentToken.type == "MODULO") {
        if (!this.isInGroup()) {
          return this.handleMultiplication();
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
      if (this.currentToken.type == "NUMBER" || this.currentToken.type == "STRING" || this.currentToken.type == "IDENTIFIER") {
        return this.handlePrimary();
      };
      this.next();
    };
    this.reset();
  };
};

console.time('parsing')

const lexer = new Lexer(' 1 + 3 * (8 - 7 + (5 + 9) - (3 + 53)) - (1 * (4 + (-9 * 8)))  ');
const parser = new Parser(lexer.tokens);
result = parser.parse();
console.log(result);

console.timeEnd('parsing')









// const getClosingParen = (expression, index) => {
//   let openingParen = 1;
//   let closingParen = 0;
//   while (index < expression.length) {
//     if (expression[index]['type'] == "LPAREN") {
//       openingParen++;
//     };
//     if (expression[index]['type'] == "RPAREN") {
//       closingParen++;
//     };
//     if (openingParen == closingParen) {
//       return index;
//     };
//     index++;
//   };
// }

// const parse = (expression) => {
//   console.log("expression to be parsed");
//   console.log(expression)

//   let openingParen = 0;
//   let closingParen = 0;

//   let isInGroup = () => openingParen != closingParen;
  
  
//   for ( let [index , token] of expression.entries()) {
//     if (token.type == "LPAREN") {
//       openingParen++;
//     };
//     if (token.type == "RPAREN") {
//       closingParen++;
//     };
//     if ((token.type == "PLUS" || token.type == "MINUS") && !isInGroup()) {
//       let node;
//       if (expression[index+1] && expression[index-1]) {
//         node = new Binary( expression.slice(0, index) , token.type , expression.slice(index+1) );
//       } else if (expression[index+1] && !expression[index-1])
//       node = new Unary(token , expression.slice(index+1));
//       console.log(node);
//       return node;
//     };
//   };
  
//   for ( let [index , token] of expression.entries()) {
//     if (token.type == "LPAREN") {
//       openingParen++;
//     };
//     if (token.type == "RPAREN") {
//       closingParen++;
//     };
//     if ((token.type == "MULTIPLY" || token.type == "DIVIDE" || token.type == "MODULO") && !isInGroup()) {
//       let node = new Binary( expression.slice(0, index) , token.type , expression.slice(index+1) );
//       console.log(node);
//       return node;    };
//     };
    
//     for ( let [index , token] of expression.entries()) {
//       if (token.type == "LPAREN") {
//         console.log("ISPAREN")
//         let closingParen = getClosingParen(expression , index+1);
//         let node = new Group( expression.slice(index+1, closingParen) );
//         console.log(node);
//         return node;
//       }
//     };

//   if (expression.length == 1 && expression[0]['type'] == "NUMBER") {
//     let node = new Literal(expression[0]['value']);
//     console.log(node);
//     return node;
//   };
// };


// // const lexer = new Lexer('3 + - - (1 + 7) * 4  ');
// // parse(lexer.tokens);

// module.exports = {
//   parse,
// }