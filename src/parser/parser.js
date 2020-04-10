const { Lexer } = require('../lexer/lexer');

class Parser {
  constructor(input) {
    this.lexer = new Lexer(input);
    this.tokens = this.lexer.tokens;
    this.ast = {};
    console.log(this.tokens);
  };
};

console.time('parsing')

// const parser = new Parser
// (
// "\
// >x = 20; \n\
// >r4 = 567; >r'y' = (x + 23) - 345;\n\
// 'hey'\
// 7'8' ;'hell0' 2'0'\
// "
// );

const parser = new Parser("1+ 3 * (2 % (45 -6) + 9) / 4")

console.timeEnd('parsing');