const { ErrorHandler } = require('../errorHandler/ErrorHandler');
const { Evaluator } = require('../evaluator/Evaluator');

class BlockStmt {
  constructor(tokens, parser) {
    this.tokens = tokens;
    this.parser = parser;
    this.parser.load(tokens);
    this.statements = this.parser.parse();
  };
};

class PrintStmt {
  constructor(expression, evaluator) {
    this.expression = expression;
    this.evaluator = evaluator;
    this.evaluator.load(this.expression);
    this.value = this.evaluator.evaluate().value;
    this.execute();
  };
  execute() {
    console.log(this.value);
  };
}

class ExprStmt {
  constructor(expression, evaluator) {
    this.expression = expression;
    this.evaluator = evaluator;
    this.evaluator.load(this.expression);
    this.value = this.evaluator.evaluate().value;
  }
}

class DeclarationStmt {
  constructor(statement, environment, evaluator) {
    this.errorHandler = new ErrorHandler();
    this.statement = statement;
    this.environment = environment;
    this.evaluator = evaluator;
    
    this.identifier = null;
    this.value = null;

    this.execute()
  };
  
  execute() {
    if (this.statement[1].type == 'IDENTIFIER') {
      this.identifier = this.statement[1].value;
      if (this.statement[2].type == 'EQUALS') {
        this.evaluator.load(this.statement.slice(2));
        this.value = this.evaluator.evaluate().value;
        return this.environment.define(this.identifier, this.value);
      };
    }

    this.errorHandler.throw(
      'INVALID DECLARATION STATEMENT',
      this.statement[0].line,
      this.statement[0].col
    );
  };
};

class Parser {
  constructor (environment) {
    this.environment = environment
    this.evaluator = new Evaluator(this.environment);
    this.errorHandler = new ErrorHandler();

    this.tokens = null;
    this.index = null;
    this.currentToken = null;
    this.previousToken = null;

    this.statements = [];
    this.currentStatement = [];

    this.openingBrace = 0;
    this.closingBrace = 0;
  };

  load(tokens) {
    this.tokens = tokens;
    this.index = 0;
    this.currentToken = this.currentToken = this.tokens[this.index];
    this.previousToken = null;

    this.checkBrace();
  }

  resetCurrentStatement() {
    this.currentStatement = [];
  }

  checkBrace() {
    if (this.currentToken) {
      if (this.currentToken.type == 'LBRACE') {
        this.openingBrace++;
      };
      if (this.currentToken.type == 'RBRACE') {
        this.closingBrace++;
      };
    };
  };

  next() {
    this.index++;
    this.currentToken = this.tokens[this.index];
    this.previousToken = this.tokens[this.index-1];

    this.checkBrace();
  };

  isInBlock() {
    return this.openingBrace != this.closingBrace;
  };

  isSemicolon() {
    return this.currentToken.type == 'SEMICOLON';
  };

  handleStatement(statement) {
    if (statement[0].type == 'LBRACE') {
      let stmt = new BlockStmt(
        statement.slice(1, -1),
        this
      );
      // console.log(stmt);
      return stmt;
    }
    if (statement[0].type == 'SHOW') {
      let stmt = new PrintStmt(
        statement.slice(1),
        this.evaluator
      );
      // console.log(stmt);
      return stmt;
    };
    if (statement[0].type == 'DECLARATOR') {
      let stmt = new DeclarationStmt(
        statement,
        this.environment,
        this.evaluator
      );
      // console.log(stmt);
      return stmt;
    };
    let stmt = new ExprStmt(
      statement,
      this.evaluator
    );
    // console.log(stmt);
    return stmt;
  };

  parse() {
    while (this.currentToken) {
      if (!this.isInBlock())
      {
        if (!this.isSemicolon()) {
          this.currentStatement.push(this.currentToken);
        } else {
          let stmt = this.handleStatement(this.currentStatement);
          this.statements.push(stmt);
          this.resetCurrentStatement();
        };
        this.next()
        continue;
      } 
      else 
      {
        this.currentStatement.push(this.currentToken);
        if (!this.isInBlock()) {
          let stmt = this.handleStatement(this.currentStatement);
          this.statements.push(stmt);
          this.resetCurrentStatement();
        };
        this.next();
      };
    };

    if (this.currentStatement.length) {
      this.errorHandler.throw(
        'YOU MUST HAVE FORGOTTEN A SEMICOLON',
        this.previousToken.line,
        this.previousToken.col
      );
    };

    return this.statements;

  };
};

module.exports = {
  Parser,
};