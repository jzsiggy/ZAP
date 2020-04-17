const { ErrorHandler } = require('../errorHandler/ErrorHandler');
const { Evaluator } = require('../evaluator/Evaluator');
const { Environment } = require('../environment/Environment');

class BlockStmt {
  constructor(tokens, environment) {
    this.tokens = tokens;
    this.parser = new Parser(environment);
    this.parser.load(this.tokens);
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
    if (this.value != undefined) {
      console.log(this.value);
    } else {
      console.log();
    };
  };
};

class ExprStmt {
  constructor(expression, evaluator) {
    this.expression = expression;
    this.evaluator = evaluator;
    this.evaluator.load(this.expression);
    this.value = this.evaluator.evaluate().value;
  }
}

class DeclarationStmt {
  constructor(identifier, value, environment) {
    this.environment = environment;
    
    this.identifier = identifier;
    this.value = value;

    this.execute()
  };
  
  execute() {
      return this.environment.define(this.identifier, this.value);
  };
};

class IfStmt {
  constructor(expression, thenBlock, elseBlock, evaluator, environment) {
    this.evaluator = evaluator;
    this.parser = new Parser(environment);

    this.expression = expression;
    this.thenBlock = thenBlock;
    this.elseBlock = elseBlock;

    this.evaluator.load(this.expression);
    this.approve = this.evaluator.evaluate().value;

    this.execute();
  };

  execute() {
    if (!!this.approve) {
      this.parser.load(this.thenBlock);
      this.parser.parse();
    };
    if (!this.approve) {
      if (this.elseBlock) {
        this.parser.load(this.elseBlock);
        this.parser.parse();
      };
    };
  };
};

class WhileStmt {
  constructor(expression, body, evaluator, environment) {
    this.expression = expression;
    this.body = body;
    this.evaluator = evaluator;
    this.environment = environment;
    this.parser = new Parser(this.environment);

    this.execute();
  };

  execute() {
    this.evaluator.load(this.expression);
    this.parser.load(this.body);

    while ( !! this.evaluator.evaluate().value ) {
      this.parser.parse();

      this.evaluator.load(this.expression);
      this.parser.load(this.body);
    };

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
    let blockTokens = statement.slice(1, -1);
    let stmt = new BlockStmt(
      blockTokens,
      new Environment(this.environment),
    );
    // console.log(stmt);
    return stmt;
  };

  handlePrint(statement) {
    let expression = statement.slice(1);
    let stmt = new PrintStmt(
      expression,
      this.evaluator
    );
    // console.log(stmt);
    return stmt;
  };

  handleDeclaration(statement) {
    let value = null;
    let identifier = statement[1].value;
    if (statement[2]) {
      if (statement[2].type == 'EQUALS') {
        let expression = statement.slice(3);
        this.evaluator.load(expression);
        value =  this.evaluator.evaluate().value;
        if (value == undefined) {
          this.errorHandler.throw(
            'INVALID DECLARATION STATEMENT',
            statement[0].line,
            statement[0].col
          );
        };
      }
      else {
        this.errorHandler.throw(
          'INVALID DECLARATION STATEMENT',
          statement[0].line,
          statement[0].col
        );
      };
    };
    
    let stmt = new DeclarationStmt(
      identifier,
      value,
      this.environment,
    );
    // console.log(stmt);
    return stmt;
  };

  handleIf(statement) {
    // console.log(statement);
    let expression = [];
    let thenBlock = [];
    let elseBlock = null;

    let i = 1;
    while (statement[i]['type'] != "LBRACE") {
      expression.push(statement[i]);
      i++;
      if (!statement[i]) {
        this.errorHandler.throw(
          `EXPECTED '{' AT IF STATEMENT`,
          statement[0].line,
          statement[0].col,
        );
      };
    };

    console.log(expression);

    while (statement[i]['type'] != "RBRACE") {
      thenBlock.push(statement[i]);
      i++;
    };
    thenBlock.push(statement[i]);
    thenBlock.push({
      type: 'SEMICOLON', 
      value: ';'
    });

    console.log(thenBlock);

    i++;

    if (statement[i]) {
      if (statement[i]['type'] == "ELSE") {
        elseBlock = statement.slice(i+1);
        elseBlock.push({
          type: 'SEMICOLON', 
          value: ';'
        });
      }
      else {
        this.errorHandler.throw(
          `UNEXPECTED KEYWORD AFTER IF STATEMENT`,
          statement[i].line,
          statement[i].col,
        );
      };
    };
    
    let stmt = new IfStmt(
      expression,
      thenBlock,
      elseBlock,
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
    let expression = [];
    let body = [];

    let i = 1;
    while (statement[i]['type'] != "LBRACE") {
      expression.push(statement[i]);
      i++;
      if (!statement[i]) {
        this.errorHandler.throw(
          `EXPECTED '{' AT WHILE STATEMENT`,
          statement[0].line,
          statement[0].col,
        );
      };
    };

    while (statement[i]['type'] != "RBRACE") {
      body.push(statement[i]);
      i++;
    };
    body.push(statement[i]);
    body.push({
      type: 'SEMICOLON', 
      value: ';'
    });

    let stmt = new WhileStmt(
      expression,
      body,
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