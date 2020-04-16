const { ErrorHandler } = require('../errorHandler/ErrorHandler');
const { Lexer } = require('../lexer/Lexer');
const { Environment } = require('../environment/Environment');
const { Parser } = require('../parser/Parser');

class Interpreter {
  constructor(input) {
    this.errorHandler = new ErrorHandler();
    this.environment = new Environment(null);
    
    this.lexer = new Lexer(input);
    this.parser = new Parser(this.environment);
    this.parser.load(this.lexer.tokens);
    this.statements = this.parser.parse();
  };
};

module.exports = {
  Interpreter,
};