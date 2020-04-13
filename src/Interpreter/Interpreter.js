const { Lexer } = require('../lexer/Lexer');
const { Parser } = require('../parser/Parser');

class PrintStmt {
  constructor(expression) {
    this.expression = expression;
    this.parser = new Parser(this.expression);
    this.value = this.parser.parse().value;
    this.interpret();
  };
  interpret() {
    console.log(this.value);
  };
}

class ExprStmt {
  constructor(expression) {
    this.expression = expression;
    this.parser = new Parser(this.expression);
  }
}

class StatementSeparator {
  constructor (tokens) {
    this.tokens = tokens;
    this.statements = [];
    this.separateStatements();
  };

  separateStatements() {
    let statement = [];
    for (let token of this.tokens) {
      if (token.value == ';') {
        this.statements.push(statement);
        statement = [];
      } else {
        statement.push(token);
      };
    }
  }
}

class Interpreter {
  constructor(statements) {
    this.statements = statements;
  };

  interpret() {
    for (let statement of this.statements) {
      this.parseStatement(statement);
    };
  };

  parseStatement(statement) {
    if (statement[0].type == 'SHOW') {
      let stmt = new PrintStmt(statement.slice(1));
      return stmt;
    };
  };
}



const lexer = new Lexer("show (9+8); show 4+5; show 4; show  -- -3;");
const statementSeparator = new StatementSeparator(lexer.tokens);
const { statements } = statementSeparator;
const interpreter = new Interpreter(statements);

interpreter.interpret()