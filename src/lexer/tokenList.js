const tokenList = {
  "PLUS" : (input) => input == '+',
  "MINUS" : (input) => input == '-',
  "DIVIDE" : (input) => input == '/',
  "MULTIPLY" : (input) => input == '*',
  "MODULO" : (input) => input == '%',

  "EQUALS" : (input) => input == '=',

  "GREATERTHAN" : (input) => input == '>',
  "LESSTHAN" : (input) => input == '<',
  "NOT" : (input) => input == '!',
  "GREATERTHANEQUAL" : (input) => input == '>=',
  "LESSTHANEQUAL" : (input) => input == '<=',
  "NOTEQUALTO" : (input) => input == '!=',
  "EQUALTO" : (input) => input == '==',

  "LPAREN" : (input) => input == '(',
  "RPAREN" : (input) => input == ')',
  "LBRACE" : (input) => input == '{',
  "RBRACE" : (input) => input == '}',

  "SEMICOLON" : (input) => input ==';',
  "QUOTE" : (input) => input == "'",
  "DOT" : (input) => input =='.',

  "DECLARATOR" : (input) => input == '@',

  "NUMBER" : (input) => /^[0-9]+$/.test(input),
  "LETTER" : (input) => /^[a-zA-Z]+$/.test(input),
  "WHITESPACE" : (input) => !/\S/.test(input),

  "UNRECOGNIZED" : (input) => true,
};

const reserved = {
  "for" : 'FOR',
  "while" : 'WHILE',
  "return" : 'RETURN',
  "show" : "SHOW",
  "if" : "IF",
  "else" : "ELSE",
};

module.exports = {
  tokenList,
  reserved,
};