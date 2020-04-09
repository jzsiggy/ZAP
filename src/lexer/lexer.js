const { tokenList } = require('./tokenList');

class Lexer {
  constructor(input) {
    this.input = input;
    this.charTypes = [];
    this.tokens = [];
  };

  throwErr (msg) {
    try {
      throw new Error(msg);
    } catch (e) {
      console.error(e);
      process.exit(1);
    };
  };

  getCharTypes() {
    let line = 1;
    let col = 1;
    for (let char of this.input.split('')) {
      for (let [ token , verification ] of Object.entries(tokenList)) {
        if (verification(char)) {
          const charDescription = {};
          charDescription['type'] = token;
          charDescription['symbol'] = char;
          charDescription['line'] = line;
          charDescription['col'] = col;
          if (charDescription.type == "UNRECOGNIZED") {
            this.throwErr(`UNRECOGNIZED SYNTAX -- ln: ${charDescription['line']} col: ${charDescription['col']}`)
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
    console.log(this.input);
    console.log(this.charTypes);
  };

  tokenize() {
    let currentToken = {};

    let inVar = false;
    let inString = false;
    let inNum = false;
    
    for (let char of this.charTypes) {
      
      if (char.type == "QUOTE") {
        inString = !inString;
        if (inString) {
          currentToken = {
            "type" : "STRING",
            "line" : char.line,
            "col" : char.col,
            "value" : "",
          };
        } else {
          this.tokens.push(currentToken);
          currentToken = {};
        };
        continue;
      };

      if (inString) {
        currentToken.value = currentToken.value.concat(char.symbol);
        continue;
      };

      if (char.type == "WHITESPACE") {
        inVar = false;
        inNum = false;
        if (currentToken.type) {
          this.tokens.push(currentToken);
          currentToken = {};
        };
        continue;
      };

      if (char.type == "SYMBOLSETTER") {
        inVar = true;
        currentToken = {
          "type" : "VAR",
          "line" : char.line,
          "col" : char.col,
          "value" : "",
        };
        continue;
      };

      if (inVar && (char.type != "NUMBER" && char.type != "LETTER")) {
        this.throwErr(`INVALID VARIABLE DEFINITION -- ln: ${char['line']} col: ${char['col']}`)
      }

      if (inVar) {
        currentToken.value = currentToken.value.concat(char.symbol);
        continue;
      }

      if (char.type == "NUMBER" && !inNum) {
        inNum = true;
        currentToken = {
          "type" : "NUM",
          "line" : char.line,
          "col" : char.col,
          "value" : char.symbol,
        };    
        continue;
      };

      if (char.type == "NUMBER" && inNum) {
        currentToken.value = currentToken.value.concat(char.symbol);
        continue;
      };

      if (inNum && char.type != "NUMBER") {
        inNum = false;
        this.tokens.push(currentToken);
        currentToken = {};
      };

      if (char.type != "WHITESPACE") {
        currentToken = {
          "type" : char.type,
          "line" : char.line,
          "col" : char.col,
          "value" : char.symbol,
        };
        this.tokens.push(currentToken);
        currentToken = {};
      };
    };
    console.log(this.tokens);
  };
};


const lexer = new Lexer(">xnciw = 20; \n>exception = 'xnciw' + 23;");
lexer.getCharTypes();
lexer.tokenize();