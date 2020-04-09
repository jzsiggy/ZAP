const tokenList = {
  "PLUS" : (input) => input == '+',
  "MINUS" : (input) => input == '-',
  "DIVIDE" : (input) => input == '/',
  "MULTIPLY" : (input) => input == '*',
  "MODULO" : (input) => input == '%',
  "LPAREN" : (input) => input == '(',
  "RPAREN" : (input) => input == ')',
  "EQUALS" : (input) => input == '=',
  "NUMBER" : (input) => /\d/.test(input),
}

module.exports = {
  tokenList,
};