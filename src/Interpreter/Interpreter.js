const { ErrorHandler } = require('../errorHandler/ErrorHandler');
const { Lexer } = require('../lexer/Lexer');
const { Parser } = require('../parser/Parser');

class BlockStmt {
  constructor(tokens) {
    this.tokens = tokens;
    this.statementSeparator = new StatementSeparator(tokens);
    this.statements = this.statementSeparator.statements;
  };
};

class PrintStmt {
  constructor(expression) {
    this.expression = expression;
    this.parser = new Parser(this.expression);
    this.value = this.parser.parse().value;
    // this.execute();
  };
  execute() {
    console.log(this.value);
  };
}

class ExprStmt {
  constructor(expression) {
    this.expression = expression;
    this.parser = new Parser(this.expression);
    this.value = this.parser.parse().value;
  }
}

class DeclarationStmt {
  constructor(tokens) {
    this.value=tokens;
  };
};

class StatementSeparator {
  constructor (tokens) {
    this.errorHandler = new ErrorHandler();
    this.tokens = tokens;
    this.index = 0;
    this.currentToken = this.currentToken = this.tokens[this.index];
    
    this.statements = [];
    this.currentStatement = [];

    this.openingBrace = 0;
    this.closingBrace = 0;

    this.checkBrace();
    this.separateStatements();
  };

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
    this.checkBrace();
  };

  isInBlock() {
    return this.openingBrace != this.closingBrace;
  };

  isSemicolon() {
    return this.currentToken.type == 'SEMICOLON';
  };

  parseStatement(statement) {
    if (statement[0].type == 'LBRACE') {
      let stmt = new BlockStmt(statement.slice(1, -1));
      // console.log(stmt);
      return stmt;
    }
    if (statement[0].type == 'SHOW') {
      let stmt = new PrintStmt(statement.slice(1));
      // console.log(stmt);
      return stmt;
    };
    if (statement[0].type == 'SYMBOLSETTER') {
      let stmt = new DeclarationStmt(statement);
      // console.log(stmt);
      return stmt;
    };
    let stmt = new ExprStmt(statement);
    // console.log(stmt);
    return stmt;
  };

  separateStatements() {
    while (this.currentToken) {
      if (!this.isInBlock())
      {
        if (!this.isSemicolon()) {
          this.currentStatement.push(this.currentToken);
        } else {
          let stmt = this.parseStatement(this.currentStatement);
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
          let stmt = this.parseStatement(this.currentStatement);
          this.statements.push(stmt);
          this.resetCurrentStatement();
        };
        this.next();
      };
    };
    if (this.currentStatement.length) {
      this.errorHandler.throw(
        'YOU MUST HAVE FORGOTTEN A SEMICOLON',
        null,
        null
      );
    };
  };
};

class Interpreter {
  constructor(statements) {
    this.statements = statements;
  };
};



const lexer = new Lexer("{ 1; show 34; };1; 1+5; show 3; @a = 6;");
const statementSeparator = new StatementSeparator(lexer.tokens);
const { statements } = statementSeparator;

const interpreter = new Interpreter(statements);

console.log(interpreter.statements)
