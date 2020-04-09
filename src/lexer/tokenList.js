const tokenList = {
  "PLUS" : (input) => input == '+',
  "MINUS" : (input) => input == '-',
  "DIVIDE" : (input) => input == '/',
  "MULTIPLY" : (input) => input == '*',
  "MODULO" : (input) => input == '%',
  "LPAREN" : (input) => input == '(',
  "RPAREN" : (input) => input == ')',
  "SEMICOLON" : (input) => input ==';',
  "EQUALS" : (input) => input == '=',
  "NUMBER" : (input) => /\d/.test(input) || input == '.',
  "LETTER" : (input) => /\w/.test(input) && !/\d/.test(input),
  "QUOTE" : (input) => input == "'",
  "WHITESPACE" : (input) => /\s/.test(input),
  "SYMBOLSETTER" : (input) => input == '>',
  "UNRECOGNIZED" : (input) => true,
};

module.exports = {
  tokenList,
};