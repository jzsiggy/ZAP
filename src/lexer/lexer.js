const { tokenList , reserved } = require('./tokenList');
const { ErrorHandler } = require('../errorHandler/ErrorHandler');

class CharSeperator {
  constructor(input) {
    this.errorHandler = new ErrorHandler();
    this.input = input;
    this.charTypes = [];
    this.getCharTypes();
  };

  getCharTypes() {
    let line = 1;
    let col = 1;
    for (let char of this.input.split('')) {
      for (let [ token , verification ] of Object.entries(tokenList)) {
        if (verification(char)) {
          const charDescription = {};
          charDescription['type'] = token;
          charDescription['line'] = line;
          charDescription['col'] = col;
          charDescription['value'] = char;
          if (charDescription.type == "UNRECOGNIZED") {
            this.errorHandler.throw(`UNRECOGNIZED SYNTAX`, charDescription['line'], charDescription['col']);
          } else {
            this.charTypes.push(charDescription);
          };
          break;
        }
      }
      if (char == '\n') {
        col = 1;
        line++;
      } else {
        col++;
      };
    };
  };
};


class Lexer {
  constructor (input) {
    this.charSeperator = new CharSeperator(input);
    this.errorHandler = new ErrorHandler();
    this.charTypes = this.charSeperator.charTypes;
    this.index = 0;
    this.char = this.charTypes[this.index];
    this.currentToken = {};
    this.tokens = [];
    this.lex();
  }

  throwErr (msg) {
    try {
      throw new Error(msg);
    } catch (e) {
      console.error(e);
      process.exit(1);
    };
  };

  resetCurrentToken() {
    this.currentToken = {};
  }

  next() {
    this.index++;
    this.char = this.charTypes[this.index];
  };

  peakNext() {
    try {
      return this.charTypes[this.index + 1];
    } catch {
      return false;
    };
  };

  handleStr() {
    this.currentToken = {
      "type" : "STRING",
      "line" : this.char.line,
      "col" : this.char.col,
      "value" : "",
    };

    if (this.peakNext()) {
      this.next();
    } else {
      this.errorHandler.throw('EOF WHILE PARSING STRING', this.currentToken.line, this.currentToken.col);
    }

    while (this.char.type != "QUOTE") {
      this.currentToken.value = this.currentToken.value.concat(this.char.value);
      this.next();
      if (!this.char) {
        this.errorHandler.throw('EOF WHILE PARSING STRING', this.currentToken.line, this.currentToken.col);
      };
    };
    this.tokens.push(this.currentToken);
    this.resetCurrentToken();
    this.next();
    this.lex();
  };

  handleNum() {
    let hasDecimal = false;

    this.currentToken = {
      "type" : "NUMBER",
      "line" : this.char.line,
      "col" : this.char.col,
      "value" : "",
    };

    // Long statements to handle decimal and int numbers
    while (this.char.type == "NUMBER" || (!hasDecimal && this.char.type == "DOT" && this.peakNext() && this.peakNext().type == "NUMBER")) {
      if (this.char.type == "DOT") {
        hasDecimal = true;
      };
      this.currentToken.value = this.currentToken.value.concat(this.char.value);
      this.next();
      if (!this.char) {
        break;
      };
    };
    this.tokens.push(this.currentToken);
    this.resetCurrentToken();
    this.lex();
  };

  handleId() {
    this.currentToken = {
      "type" : "IDENTIFIER",
      "line" : this.char.line,
      "col" : this.char.col,
      "value" : "",
    };

    while (this.char.type == "NUMBER" || this.char.type == "LETTER") {
      this.currentToken.value = this.currentToken.value.concat(this.char.value);
      this.next();
      if (!this.char) {
        break;
      };
    };

    if (Object.keys(reserved).includes(this.currentToken.value)) {
      this.currentToken.type = reserved[this.currentToken.value];
    };

    this.tokens.push(this.currentToken);
    this.resetCurrentToken();
    this.lex();
  };


  isDoubleCharOperator() {
    if (this.peakNext()) {
      let operatorToTest = this.char.value.concat(this.peakNext().value)
      for (let [ type , verification ] of Object.entries(tokenList)) {
        if (verification(operatorToTest) && (type != "UNRECOGNIZED")) {
          return {
            "type" : type,
            "line" : this.char.line,
            "col" : this.char.col,
            "value" : operatorToTest,
          };
        };
      };
      return false;
    };
  };

  handleOperator() {
    if (this.char.type != "WHITESPACE") {
      let doubleCharOperator = this.isDoubleCharOperator();
      if (doubleCharOperator) {
        this.next();
        this.currentToken = doubleCharOperator;
        this.tokens.push(this.currentToken);
        this.resetCurrentToken();
      } else {
        this.currentToken = this.char;
        this.tokens.push(this.currentToken);
        this.resetCurrentToken();
      };
    };
    this.next();
    this.lex();
  };

  lex() {
    if (this.char) {
      switch(this.char.type) {
        case "QUOTE":
          this.handleStr();
          break;
        case "NUMBER":
          this.handleNum();
          break;
        case "LETTER":
          this.handleId();
          break;
        default:
          this.handleOperator();
      };
    } else {
      // console.log(this.tokens);
    };
  };
};

module.exports = {
  Lexer,
};