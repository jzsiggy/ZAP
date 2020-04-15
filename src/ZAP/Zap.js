const { Interpreter } = require('../interpreter/Interpreter');
const fs = require('fs');

class Zap {
  constructor() {
    this.input = this.fetchInput();
    this.interpreter = new Interpreter(this.input);
    console.log(this.interpreter.statements);
  };

  fetchInput() {
    try {
      const data = fs.readFileSync('../../tests/test1.zap', 'utf8');
      return data  
    } catch(e) {
      console.log('Error:', e.stack);
    }
  };
};

console.time('interpreting');
new Zap();
console.timeEnd('interpreting');
