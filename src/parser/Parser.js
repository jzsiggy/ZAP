const { ErrorHandler } = require('../errorHandler/ErrorHandler');
const { Evaluator } = require('../evaluator/Evaluator');
const { Environment } = require('../environment/Environment');
const { ZapFunction } = require('./ZapFunction');

class BlockStmt {
  constructor(statement, environment) {
    this.statement = statement;
    this.body = this.fetchBody();
    this.parser = new Parser(environment);
    this.execute()
  };

  fetchBody() {
    return this.statement.slice(1, -1);
  };

  execute() {
    this.parser.load(this.body);
    this.statements = this.parser.parse();
  };
};

class PrintStmt {
  constructor(statement, evaluator) {
    this.statement = statement;
    this.expression = this.fetchExpression();
    this.evaluator = evaluator;
    this.value = null;
    this.execute();
  };

  fetchExpression() {
    return this.statement.slice(1);
  };

  execute() {
    this.evaluator.load(this.expression);
    this.value = this.evaluator.evaluate().value;

    if (this.value != undefined) {
      console.log(this.value);
    } else {
      console.log();
    };
  };
};

class ExprStmt {
  constructor(statement, evaluator) {
    this.expression = statement;
    this.evaluator = evaluator;
    this.evaluator.load(this.expression);
    this.value = this.evaluator.evaluate().value;
  }
}

class DeclarationStmt {
  constructor(statement, evaluator, environment) {
    this.errorHandler = new ErrorHandler();
    this.statement = statement;
    this.evaluator = evaluator;
    this.environment = environment;

    this.value = null;
    this.identifier = statement[1].value;
    this.execute()
  };

  fetchValue() {
    let value = null;
    if (this.statement[2]) {
      if (this.statement[2].type == 'EQUALS') {
        let expression = this.statement.slice(3);
        this.evaluator.load(expression);
        value = this.evaluator.evaluate().value;
        if (value == undefined) {
          this.errorHandler.throw(
            'INVALID DECLARATION STATEMENT',
            this.statement[0].line,
            this.statement[0].col
          );
        };
      }
      else {
        this.errorHandler.throw(
          'INVALID DECLARATION STATEMENT',
          this.statement[0].line,
          this.statement[0].col
        );
      };
    };
    return value;
  };
    
  
  execute() {
      this.value = this.fetchValue();
      return this.environment.define(this.identifier, this.value);
  };
};

class IfStmt {
  constructor(statement, evaluator, environment) {
    this.evaluator = evaluator;
    this.parser = new Parser(environment);
    this.errorHandler = new ErrorHandler();

    this.statement = statement;

    this.expression = [];
    this.thenBlock = [];
    this.elseBlock = null;

    this.index = 1;
    this.currentToken = this.statement[this.index];
    this.prevToken = null;

    this.openingBrace = 0;
    this.closingBrace = 0;

    this.execute();
  };

  next() {
    this.prevToken = this.statement[this.index];
    this.index++;
    this.currentToken = this.statement[this.index];
    this.checkBrace();
  };

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

  isInBlock() {
    return this.closingBrace != this.openingBrace;
  };

  splitBlock() {
    while (!this.isInBlock()) {
      this.expression.push(this.currentToken);
      this.next();
      if (!this.currentToken) {
        this.errorHandler.throw(
          `EXPECTED '{' AFTER EXPRESSION`,
          this.prevToken.line,
          this.prevToken.col
        );
      };
    };

    while (this.isInBlock()) {
      this.thenBlock.push(this.currentToken);
      this.next();
      if (!this.currentToken) {
        this.errorHandler.throw(
          `EXPECTED '}' AFTER THEN BLOCK`,
          this.prevToken.line,
          this.prevToken.col
        );
      }
    };
    this.thenBlock.push(this.currentToken);
    this.thenBlock.push({
      type: 'SEMICOLON', 
      value: ';'
    });
    this.next();

    if (this.currentToken) {
      if (this.currentToken.type == 'ELSE') {
        this.next();
        if (this.isInBlock()) {
          this.elseBlock = [];

          while (this.isInBlock()) {
            this.elseBlock.push(this.currentToken);
            this.next();
            if (!this.currentToken) {
              this.errorHandler.throw(
                `EXPECTED '}' AFTER ELSE BLOCK`,
                this.prevToken.line,
                this.prevToken.col
              );
            };
          };
          this.elseBlock.push(this.currentToken);
          this.elseBlock.push({
            type: 'SEMICOLON', 
            value: ';'
          });
          this.next();
        }
        else {
          this.errorHandler.throw(
            `UNABLE TO PARSE ELSE STATEMENT`,
            this.prevToken.line,
            this.prevToken.col
          );
        };
      }
      else {
        this.errorHandler.throw(
          `UNEXPECTED KEYWORD AFTER IF STATEMENT`,
          this.prevToken.line,
          this.prevToken.col
        );
      };
    };
  };

  execute() {
    this.splitBlock();

    this.evaluator.load(this.expression);
    let approve = this.evaluator.evaluate().value;

    if (approve) {
      this.parser.load(this.thenBlock);
      this.parser.parse();
    };
    if (!approve) {
      if (this.elseBlock) {
        this.parser.load(this.elseBlock);
        this.parser.parse();
      };
    };
  };
};

class WhileStmt {
  constructor(statement, evaluator, environment) {
    this.evaluator = evaluator;
    this.parser = new Parser(environment);
    this.errorHandler = new ErrorHandler();

    this.statement = statement;

    this.expression = [];
    this.body = [];

    this.index = 1;
    this.currentToken = this.statement[this.index];
    this.prevToken = null;

    this.openingBrace = 0;
    this.closingBrace = 0;

    this.execute();
  };

  next() {
    this.prevToken = this.statement[this.index];
    this.index++;
    this.currentToken = this.statement[this.index];
    this.checkBrace();
  };

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

  isInBlock() {
    return this.closingBrace != this.openingBrace;
  };

  splitBlock() {
    while (!this.isInBlock()) {
      this.expression.push(this.currentToken);
      this.next();
      if (!this.currentToken) {
        this.errorHandler.throw(
          `EXPECTED '{' AFTER EXPRESSION`,
          this.prevToken.line,
          this.prevToken.col
        );
      };
    };

    while (this.isInBlock()) {
      this.body.push(this.currentToken);
      this.next();
      if (!this.currentToken) {
        this.errorHandler.throw(
          `EXPECTED '}' AFTER BODY OF WHILE`,
          this.prevToken.line,
          this.prevToken.col
        );
      }
    };
    this.body.push(this.currentToken);
    this.body.push({
      type: 'SEMICOLON', 
      value: ';'
    });
    this.next()

    if (this.currentToken) {
      this.errorHandler.throw(
        `UNEXPECTED TOKEN AFTER WHILE STATEMENT`,
        this.currentToken.line,
        this.currentToken.col
      );
    };
  };


  execute() {
    this.splitBlock();

    this.evaluator.load(this.expression);

    while (!!this.evaluator.evaluate().value) {
      this.parser.load(this.body);
      this.parser.parse();
      this.evaluator.load(this.expression);
    };
  };
};

class FunctionStmt {
  constructor(statement, evaluator, environment) {
    this.evaluator = evaluator;
    this.environment = environment;
    this.errorHandler = new ErrorHandler();

    this.statement = statement;

    this.identifier = null;
    this.args = [];
    this.body = [];

    this.index = 1;
    this.currentToken = this.statement[this.index];
    this.prevToken = null;

    this.execute();
  };

  next() {
    this.prevToken = this.statement[this.index];
    this.index++;
    this.currentToken = this.statement[this.index];
  };

  splitBlock() {
    this.identifier = this.currentToken.value;
    this.next();
    if (!this.currentToken || this.currentToken.type != 'BAR') {
      this.errorHandler.throw(
        `EXPECTED '|' AFTER FUNCTION DECLARATION`,
        this.prevToken.line,
        this.prevToken.col
      );
    };
    this.next();

    let currentArgument = [];
    while (this.currentToken.type != 'BAR') {
      if (this.currentToken.type != 'COMMA') {
        currentArgument.push(this.currentToken);
      } else {
        this.args.push(currentArgument);
        currentArgument = [];
      };
      this.next();
      if (!this.currentToken) {
        this.errorHandler.throw(
          `EXPECTED '|' after argument list`,
          this.prevToken.line,
          this.prevToken.col
        )
      };
    };
    if (currentArgument.length) {
      this.args.push(currentArgument);
      currentArgument = [];
    }
    this.next();

    if (!this.currentToken || this.currentToken.type != 'FATARROW') {
      this.errorHandler.throw(
        `EXPECTED '=>' AFTER FN DECLARATION`,
        this.prevToken.line,
        this.prevToken.col
      );
    };
    this.next();

    this.body = this.statement.slice(this.index);
  };

  execute() {
    this.splitBlock();
    const zapFunction = new ZapFunction(this.args, this.body, this.environment);
    this.environment.define(this.identifier, zapFunction);
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

    this.openingBrace = 0;
    this.closingBrace = 0;

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

  handleBlock(statement) {
    let stmt = new BlockStmt(
      statement,
      new Environment(this.environment),
    );
    // console.log(stmt);
    return stmt;
  };

  handlePrint(statement) {
    let stmt = new PrintStmt(
      statement,
      this.evaluator
    );
    // console.log(stmt);
    return stmt;
  };

  handleDeclaration(statement) {
    let stmt = new DeclarationStmt(
      statement,
      this.evaluator,
      this.environment,
    );
    // console.log(stmt);
    return stmt;
  };

  handleIf(statement) {
    // console.log(statement);
    let stmt = new IfStmt(
      statement,
      this.evaluator,
      this.environment
    );
    // console.log(stmt);
    return stmt;
  };

  handleExpression(statement) {
    let stmt = new ExprStmt(
      statement,
      this.evaluator,
    );
    // console.log(stmt);
    return stmt;
  };

  handleWhile(statement) {
    let stmt = new WhileStmt(
      statement,
      this.evaluator,
      this.environment
    );
    // console.log(stmt);
    return stmt;
  }

  handleFunction(statement) {
    let stmt = new FunctionStmt(
      statement,
      this.evaluator,
      this.environment
    );
    // console.log(stmt);
    return stmt;
  }

  handleStatement(statement) {
    // console.log(statement);
    if (statement[0].type == 'LBRACE') {
      return this.handleBlock(statement)
    };

    if (statement[0].type == 'SHOW') {
      return this.handlePrint(statement);
    };

    if (statement[0].type == 'DECLARATOR') {
      return this.handleDeclaration(statement);
    };

    if (statement[0].type == 'IF') {
      return this.handleIf(statement);
    };

    if (statement[0].type == 'WHILE') {
      return this.handleWhile(statement);
    };

    if (statement[0].type == 'FUNCTION') {
      return this.handleFunction(statement);
    };

    return this.handleExpression(statement);
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
        'YOU MUST HAVE FORGOTTEN A SEMICOLON OR CLOSING BRACE',
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