const { ErrorHandler } = require('../errorHandler/ErrorHandler');
const { Lexer } = require('../lexer/Lexer');
const { Parser } = require('../parser/Parser');
const { Environment } = require('../environment/Environment');

class BlockStmt {
  constructor(tokens, statementSeparator) {
    this.tokens = tokens;
    this.statementSeparator = statementSeparator;
    this.statementSeparator.load(tokens);
    this.statementSeparator.separateStatements();
    this.statements = this.statementSeparator.statements;
  };
};

class PrintStmt {
  constructor(expression, parser) {
    this.expression = expression;
    this.parser = parser;
    this.parser.load(this.expression);
    this.value = this.parser.parse().value;
    this.execute();
  };
  execute() {
    console.log(this.value);
  };
}

class ExprStmt {
  constructor(expression, parser) {
    this.expression = expression;
    this.parser = parser;
    this.parser.load(this.expression);
    this.value = this.parser.parse().value;
  }
}

class DeclarationStmt {
  constructor(statement, environment, parser) {
    this.errorHandler = new ErrorHandler();
    this.statement = statement;
    this.environment = environment;
    this.parser = parser;
    
    this.identifier = null;
    this.value = null;

    this.execute()
  };
  
  execute() {
    if (this.statement[1].type == 'IDENTIFIER') {
      this.identifier = this.statement[1].value;
      if (this.statement[2].type == 'EQUALS') {
        this.parser.load(this.statement.slice(2));
        this.value = this.parser.parse().value;
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

class StatementSeparator {
  constructor (environment) {
    this.environment = environment
    this.parser = new Parser(this.environment);
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

  parseStatement(statement) {
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
        this.parser
      );
      // console.log(stmt);
      return stmt;
    };
    if (statement[0].type == 'DECLARATOR') {
      let stmt = new DeclarationStmt(
        statement,
        this.environment,
        this.parser
      );
      // console.log(stmt);
      return stmt;
    };
    let stmt = new ExprStmt(
      statement,
      this.parser
    );
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
        this.previousToken.line,
        this.previousToken.col
      );
    };
  };
};

class Interpreter {
  constructor(input) {
    this.environment = new Environment();
    
    this.lexer = new Lexer(input);
    this.statementSeparator = new StatementSeparator(this.environment);
    this.statementSeparator.load(this.lexer.tokens);
    this.statementSeparator.separateStatements()
    this.statements = this.statementSeparator.statements;
  };
};


const interpreter = new Interpreter(
"\
2;                 \n\
show 3+4;                 \n\
{                 \n\
show 4 - 1 + 3 * (8 - 7 + (5 + 9) - (3 + 53)) - (1 * (4 + (-9 * 8)));                 \n\
  {               \n\
  3 + 8;               \n\
  show 5 ;              \n\
                 \n\
                 \n\
  };               \n\
                 \n\
                 \n\
};                 \n\
@a + 4 - 1 + 3 + (8 - 7 + (5 + 9) - (3 + 53)) - (1 * (4 + (-9 * 8)));                 \n\
                        \n\
show a;                        \n\
"
);

// console.log(interpreter.statements)
