const { tokenList } = require('./tokenList');

class Lexer {
  constructor(input) {
    this.input = input;
    this.tokens = [];
  };

  tokenize() {
    let line = 1;
    let col = 1;
    for (let char of this.input.split('')) {
      for (let [ token , verification ] of Object.entries(tokenList))
      if (verification(char)) {
        const tokenDescription = {};
        tokenDescription['token'] = token;
        tokenDescription['symbol'] = char;
        tokenDescription['line'] = line;
        tokenDescription['col'] = col;
        this.tokens.push(tokenDescription);
      }
      if (char == '\n') {
        col = 1;
        line++;
      } else {
        col++;
      };
    };
    console.log(this.input);
    console.log(this.tokens);
  };
};

const lexer = new Lexer('hello + = - / % * xnciw \n 10  + 2 + 3 \n hey');
lexer.tokenize();